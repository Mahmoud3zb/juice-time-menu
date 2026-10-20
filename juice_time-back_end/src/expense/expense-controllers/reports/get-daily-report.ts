import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { Expense } from "../../expense-model";
import { DailyRevenue } from "../../../daily-revenue/daily-revenue-model";

interface IRequestQuery {
    date?: string;
}

interface ICategoryTotal {
    categoryID: string;
    categoryName: string;
    totalAmount: number;
    expensesCount: number;
}

interface IResponse {
    message: string;
    data?: {
        date: string;
        revenue: number;
        revenueNotes?: string;
        dailyExpenses: number;
        afterClosingExpenses: number;
        totalExpenses: number;
        expensesCount: number;
        netProfit: number;
        categories: ICategoryTotal[];
        expenses: unknown[];
    };
}

const isValidDateOnly = (value: string): boolean => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;

    const parsed = new Date(`${value}T00:00:00.000Z`);
    return (
        !Number.isNaN(parsed.getTime()) &&
        parsed.toISOString().slice(0, 10) === value
    );
};

export const getDailyReport: RequestHandler<
    {},
    IResponse,
    {},
    IRequestQuery
> = async (req, res, next) => {
    try {
        const date = req.query.date ?? new Date().toISOString().slice(0, 10);

        if (!isValidDateOnly(date)) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "صيغة التاريخ غير صالحة. يرجى استخدام YYYY-MM-DD"
            });
        }

        const startDate = new Date(`${date}T00:00:00.000Z`);
        const endDate = new Date(startDate);
        endDate.setUTCDate(endDate.getUTCDate() + 1);

        const match = {
            expenseDate: {
                $gte: startDate,
                $lt: endDate
            }
        };

        const [revenueRecord, summaryByType, categories, expenses] = await Promise.all([
            // 1. Fetch Day's Revenue
            DailyRevenue.findOne({ date }).lean(),

            // 2. Aggregate expenses broken down by expenseType (daily vs after_closing)
            Expense.aggregate([
                { $match: match },
                {
                    $group: {
                        _id: { $ifNull: ["$expenseType", "daily"] },
                        totalAmount: { $sum: "$amount" },
                        count: { $sum: 1 }
                    }
                }
            ]),

            // 3. Category distribution
            Expense.aggregate([
                { $match: match },
                {
                    $lookup: {
                        from: "expensecategories",
                        localField: "expenseCategoryID",
                        foreignField: "_id",
                        as: "category"
                    }
                },
                {
                    $unwind: {
                        path: "$category",
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $group: {
                        _id: "$expenseCategoryID",
                        categoryName: {
                            $first: { $ifNull: ["$category.name", "مصروف عام"] }
                        },
                        totalAmount: { $sum: "$amount" },
                        expensesCount: { $sum: 1 }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        categoryID: { $toString: "$_id" },
                        categoryName: 1,
                        totalAmount: 1,
                        expensesCount: 1
                    }
                },
                { $sort: { totalAmount: -1 } }
            ]),

            // 4. Detailed expenses list
            Expense.find(match)
                .populate("expenseCategoryID", "name")
                .sort({ createdAt: -1 })
                .lean()
        ]);

        let dailyExpenses = 0;
        let afterClosingExpenses = 0;
        let expensesCount = 0;

        summaryByType.forEach((item) => {
            if (item._id === "after_closing") {
                afterClosingExpenses += item.totalAmount;
            } else {
                dailyExpenses += item.totalAmount;
            }
            expensesCount += item.count;
        });

        const totalExpenses = dailyExpenses + afterClosingExpenses;
        const revenue = revenueRecord?.amount ?? 0;
        const netProfit = revenue - totalExpenses;

        return res.status(StatusCodes.OK).json({
            message: "تم جلب تقرير اليوم بنجاح",
            data: {
                date,
                revenue,
                revenueNotes: revenueRecord?.notes || "",
                dailyExpenses,
                afterClosingExpenses,
                totalExpenses,
                expensesCount,
                netProfit,
                categories,
                expenses
            }
        });
    } catch (err) {
        next(err);
    }
};

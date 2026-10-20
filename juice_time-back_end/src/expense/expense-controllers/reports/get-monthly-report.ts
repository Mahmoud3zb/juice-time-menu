import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { Expense } from "../../expense-model";
import { DailyRevenue } from "../../../daily-revenue/daily-revenue-model";

interface IRequestQuery {
    month?: string;
    year?: string;
}

interface ICategoryTotal {
    categoryID: string;
    categoryName: string;
    totalAmount: number;
    expensesCount: number;
}

interface IDailyTotal {
    date: string;
    revenue: number;
    dailyExpenses: number;
    afterClosingExpenses: number;
    totalAmount: number;
    expensesCount: number;
    netProfit: number;
}

interface IResponse {
    message: string;
    data?: {
        month: number;
        year: number;
        totalRevenue: number;
        totalDailyExpenses: number;
        totalAfterClosingExpenses: number;
        totalExpenses: number;
        expensesCount: number;
        netProfit: number;
        dailyTotals: IDailyTotal[];
        categories: ICategoryTotal[];
    };
}

export const getMonthlyReport: RequestHandler<
    {},
    IResponse,
    {},
    IRequestQuery
> = async (req, res, next) => {
    try {
        const now = new Date();
        const month = req.query.month === undefined
            ? now.getUTCMonth() + 1
            : Number(req.query.month);
        const year = req.query.year === undefined
            ? now.getUTCFullYear()
            : Number(req.query.year);

        if (
            !Number.isInteger(month) ||
            month < 1 ||
            month > 12 ||
            !Number.isInteger(year) ||
            year < 1000 ||
            year > 9999
        ) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "الشهر أو السنة غير صالحة"
            });
        }

        const startDate = new Date(Date.UTC(year, month - 1, 1));
        const endDate = new Date(Date.UTC(year, month, 1));

        const match = {
            expenseDate: {
                $gte: startDate,
                $lt: endDate
            }
        };

        const formattedMonth = month < 10 ? `0${month}` : `${month}`;
        const revenueRegex = new RegExp(`^${year}-${formattedMonth}-`);

        const [monthlyRevenues, expensesByType, dailyExpensesAgg, categories] = await Promise.all([
            // 1. All Daily Revenues for this month
            DailyRevenue.find({ date: { $regex: revenueRegex } }).lean(),

            // 2. Summary by expenseType
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

            // 3. Daily breakdown of expenses by date and type
            Expense.aggregate([
                { $match: match },
                {
                    $group: {
                        _id: {
                            date: {
                                $dateToString: {
                                    format: "%Y-%m-%d",
                                    date: "$expenseDate",
                                    timezone: "UTC"
                                }
                            },
                            type: { $ifNull: ["$expenseType", "daily"] }
                        },
                        totalAmount: { $sum: "$amount" },
                        count: { $sum: 1 }
                    }
                }
            ]),

            // 4. Categories breakdown
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
            ])
        ]);

        let totalDailyExpenses = 0;
        let totalAfterClosingExpenses = 0;
        let expensesCount = 0;

        expensesByType.forEach((item) => {
            if (item._id === "after_closing") {
                totalAfterClosingExpenses += item.totalAmount;
            } else {
                totalDailyExpenses += item.totalAmount;
            }
            expensesCount += item.count;
        });

        const totalExpenses = totalDailyExpenses + totalAfterClosingExpenses;

        // Map revenue by date
        const revenueByDate: Record<string, number> = {};
        let totalRevenue = 0;
        monthlyRevenues.forEach((r) => {
            revenueByDate[r.date] = r.amount || 0;
            totalRevenue += r.amount || 0;
        });

        // Merge daily expenses & revenues into unified dailyTotals
        const dailyMap: Record<string, { dailyExpenses: number; afterClosingExpenses: number; totalAmount: number; count: number }> = {};
        dailyExpensesAgg.forEach((item) => {
            const d = item._id.date;
            const t = item._id.type;
            if (!dailyMap[d]) {
                dailyMap[d] = { dailyExpenses: 0, afterClosingExpenses: 0, totalAmount: 0, count: 0 };
            }
            if (t === "after_closing") {
                dailyMap[d].afterClosingExpenses += item.totalAmount;
            } else {
                dailyMap[d].dailyExpenses += item.totalAmount;
            }
            dailyMap[d].totalAmount += item.totalAmount;
            dailyMap[d].count += item.count;
        });

        // All active dates (dates with expenses OR revenue)
        const allDates = Array.from(new Set([...Object.keys(dailyMap), ...Object.keys(revenueByDate)])).sort();

        const dailyTotals: IDailyTotal[] = allDates.map((date) => {
            const exp = dailyMap[date] || { dailyExpenses: 0, afterClosingExpenses: 0, totalAmount: 0, count: 0 };
            const rev = revenueByDate[date] || 0;
            return {
                date,
                revenue: rev,
                dailyExpenses: exp.dailyExpenses,
                afterClosingExpenses: exp.afterClosingExpenses,
                totalAmount: exp.totalAmount,
                expensesCount: exp.count,
                netProfit: rev - exp.totalAmount
            };
        });

        const netProfit = totalRevenue - totalExpenses;

        return res.status(StatusCodes.OK).json({
            message: "تم جلب التقرير الشهري بنجاح",
            data: {
                month,
                year,
                totalRevenue,
                totalDailyExpenses,
                totalAfterClosingExpenses,
                totalExpenses,
                expensesCount,
                netProfit,
                dailyTotals,
                categories
            }
        });
    } catch (err) {
        next(err);
    }
};

import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { Expense } from "../../expense-model";

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
        totalExpenses: number;
        expensesCount: number;
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
                message: "Invalid date. Use YYYY-MM-DD"
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

        const [summary, categories, expenses] = await Promise.all([
            Expense.aggregate([
                { $match: match },
                {
                    $group: {
                        _id: null,
                        totalExpenses: { $sum: "$amount" },
                        expensesCount: { $sum: 1 }
                    }
                }
            ]),
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
                            $first: { $ifNull: ["$category.name", "Unknown category"] }
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
            Expense.find(match)
                .populate("expenseCategoryID", "name")
                .sort({ createdAt: -1 })
                .lean()
        ]);

        return res.status(StatusCodes.OK).json({
            message: "Daily report retrieved successfully",
            data: {
                date,
                totalExpenses: summary[0]?.totalExpenses ?? 0,
                expensesCount: summary[0]?.expensesCount ?? 0,
                categories,
                expenses
            }
        });
    } catch (err) {
        next(err);
    }
};

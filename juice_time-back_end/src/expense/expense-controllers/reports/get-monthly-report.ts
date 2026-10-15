import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { Expense } from "../../expense-model";

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
    totalAmount: number;
    expensesCount: number;
}

interface IResponse {
    message: string;
    data?: {
        month: number;
        year: number;
        totalExpenses: number;
        expensesCount: number;
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
                message: "Invalid month or year"
            });
        }

        // Date-only values are treated as UTC calendar months.
        // If the app should use Egypt local dates, align this boundary
        // calculation with the agreed business timezone.
        const startDate = new Date(Date.UTC(year, month - 1, 1));
        const endDate = new Date(Date.UTC(year, month, 1));

        const match = {
            expenseDate: {
                $gte: startDate,
                $lt: endDate
            }
        };

        const [summary, dailyTotals, categories] = await Promise.all([
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
                    $group: {
                        _id: {
                            $dateToString: {
                                format: "%Y-%m-%d",
                                date: "$expenseDate",
                                timezone: "UTC"
                            }
                        },
                        totalAmount: { $sum: "$amount" },
                        expensesCount: { $sum: 1 }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        date: "$_id",
                        totalAmount: 1,
                        expensesCount: 1
                    }
                },
                { $sort: { date: 1 } }
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
            ])
        ]);

        return res.status(StatusCodes.OK).json({
            message: "Monthly report retrieved successfully",
            data: {
                month,
                year,
                totalExpenses: summary[0]?.totalExpenses ?? 0,
                expensesCount: summary[0]?.expensesCount ?? 0,
                dailyTotals,
                categories
            }
        });
    } catch (err) {
        next(err);
    }
};

import { RequestHandler } from "express";
import { Expense } from "../expense-model";
import mongoose from "mongoose";
import { StatusCodes } from "http-status-codes";

interface IRequestQuery {
    page?: string;
    limit?: string;
    date?: string;
    from?: string;
    to?: string;
    categoryID?: string;
}

interface IResponse {
    message: string;
    total?: number;
    page?: number;
    limit?: number;
    totalPages?: number;
    data?: unknown;
}

export const getExpenses: RequestHandler<
    {},
    IResponse,
    {},
    IRequestQuery
> = async (req, res, next) => {
    try {
        const page = Math.max(1, Number(req.query.page) || 1);
        const limit = Math.min(
            100,
            Math.max(1, Number(req.query.limit) || 10)
        );

        const { date, from, to, categoryID } = req.query;

        const filter: mongoose.QueryFilter<typeof Expense> = {};

        if (categoryID) {
            if (!mongoose.isValidObjectId(categoryID)) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    message: "Invalid category ID"
                });
            }

            filter.expenseCategoryID = new mongoose.Types.ObjectId(categoryID);
        }

        if (date) {
            const selectedDate = new Date(date);

            if (
                !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
                Number.isNaN(selectedDate.getTime()) ||
                selectedDate.toISOString().slice(0, 10) !== date
            ) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    message: "Invalid date format. Use YYYY-MM-DD"
                });
            }

            const startDate = new Date(`${date}T00:00:00.000Z`);
            const endDate = new Date(startDate);
            endDate.setUTCDate(endDate.getUTCDate() + 1);

            filter.expenseDate = {
                $gte: startDate,
                $lt: endDate
            };
        } else if (from || to) {
            const isValidDate = (value: string) => {
                const parsedDate = new Date(value);

                return (
                    /^\d{4}-\d{2}-\d{2}$/.test(value) &&
                    !Number.isNaN(parsedDate.getTime()) &&
                    parsedDate.toISOString().slice(0, 10) === value
                );
            };

            if (
                (from && !isValidDate(from)) ||
                (to && !isValidDate(to))
            ) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    message: "Invalid date format. Use YYYY-MM-DD"
                });
            }

            const startDate = from
                ? new Date(`${from}T00:00:00.000Z`)
                : undefined;

            const endDate = to
                ? new Date(`${to}T00:00:00.000Z`)
                : undefined;

            if (startDate && endDate && startDate > endDate) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    message: "'from' must be before or equal to 'to'"
                });
            }

            filter.expenseDate = {};

            if (startDate) {
                filter.expenseDate.$gte = startDate;
            }

            if (endDate) {
                endDate.setUTCDate(endDate.getUTCDate() + 1);
                filter.expenseDate.$lt = endDate;
            }
        }

        const [expenses, total] = await Promise.all([
            Expense.find(filter)
                .populate("expenseCategoryID", "name")
                .sort({ expenseDate: -1, createdAt: -1 })
                .skip((page - 1) * limit)
                .limit(limit),

            Expense.countDocuments(filter)
        ]);

        return res.status(StatusCodes.OK).json({
            message: "Expenses retrieved successfully",
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
            data: expenses
        });
    } catch (err) {
        next(err);
    }
};
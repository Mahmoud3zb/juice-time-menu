import { RequestHandler } from "express";
import { Expense } from "../expense-model";
import { StatusCodes } from "http-status-codes";

export const getExpenses: RequestHandler = async (req, res, next) => {
    try {
        const page = Math.max(1, Number(req.query.page) || 1);
        const limit = Math.min(
            100,
            Math.max(1, Number(req.query.limit) || 10)
        );
        const [expenses, total] = await Promise.all([
            Expense.find()
                .populate("expenseCategoryID", "name")
                .sort({ createdAt: -1 })
                .skip((page - 1) * limit)
                .limit(limit),
            Expense.countDocuments()
        ])
        res.status(StatusCodes.OK).json({
            message: "Expenses fetched successfully",
            total,
            page,
            limit,
            totalPage: Math.ceil(total / limit),
            data: expenses
        })
    } catch (err) {
        next(err);
    }
}
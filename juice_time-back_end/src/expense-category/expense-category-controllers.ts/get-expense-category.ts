import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { ExpenseCategory } from "../expense-category-model";

export const getExpenseCategory: RequestHandler = async (
    req,
    res,
    next
) => {
    try {
        const expenseCategories = await ExpenseCategory.find({
            isActive: true
        });

        return res.status(StatusCodes.OK).json({
            message: "Expense categories fetched successfully",
            data: expenseCategories
        });
    } catch (err) {
        next(err);
    }
};
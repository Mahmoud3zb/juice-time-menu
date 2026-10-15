import { RequestHandler } from "express";
import { Expense } from "../expense-model";
import mongoose from "mongoose";
import { StatusCodes } from "http-status-codes";
import { body } from "express-validator";
import { ExpenseCategory } from "../../expense-category/expense-category-model";

export const addExpenseValidators = [
    body("expenseCategoryID").not().isEmpty().withMessage("Expense category ID is required")
        .isMongoId().withMessage("Invalid expense category ID"),
    body("amount").not().isEmpty().withMessage("Amount is required")
        .isFloat({ min: 0.1 }).withMessage("Amount must be a number greater than 0"),
    body("expenseDate").not().isEmpty().withMessage("Expense date is required")
    .isDate().withMessage("Invalid date format")
]

interface IRequest {
    expenseCategoryID: mongoose.Types.ObjectId;
    amount: number;
    description?: string;
    expenseDate: Date;
}

interface IResponse {
    message: string;
    data?: unknown;
}

export const addExpense: RequestHandler<{}, IResponse, IRequest> = async (
    req,
    res,
    next
) => {
    try {
        const { expenseCategoryID, amount, description ,expenseDate } = req.body;
        const category = await ExpenseCategory.findOne({
            _id: expenseCategoryID,
            isActive: true
        });

        if (!category) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "Expense category not found or inactive"
            });
        }
        const expense = await Expense.create({
            expenseCategoryID,
            amount,
            description,
            expenseDate
        });
        res.status(StatusCodes.CREATED).json({
            message: "Expense added successfully",
            data: expense
        });
    } catch (err) {
        next(err);
    }
}
import { RequestHandler } from "express";
import { Expense } from "../expense-model";
import mongoose from "mongoose";
import { StatusCodes } from "http-status-codes";
import { body } from "express-validator";

export const updateExpenseValidators = [
    body("amount").optional().isFloat({min: 0.1}).withMessage("Amount must be a number greater than 0"),
    body("description").optional().isString().withMessage("Description must be a string")
    .trim().isLength({min: 3}).withMessage("Description must be at least 3 characters long")
]

interface IRequest {
    amount?: number
    description?: string
}

interface IResponse {
    message: string
    data?: unknown
}

export const updateExpense:RequestHandler<{id: string},IResponse,IRequest> = async (req,res,next) => {
    try {
        const { id } = req.params;
        const { amount, description } = req.body;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "Invalid expense ID"
            });
        }
        const updateObj: Partial<IRequest> = {};
        if (amount !== undefined) {
            updateObj.amount = amount;
        }
        if (description !== undefined) {
            updateObj.description = description;
        }
        if (Object.keys(updateObj).length === 0) {
                    return res.status(StatusCodes.BAD_REQUEST).json({
                        message: "No valid fields provided for update"
                    });
                }
        const expense = await Expense.findByIdAndUpdate(id,
            { $set: updateObj },
            { new: true , runValidators: true });
        if (!expense) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "Expense not found"
            });
        }
        res.status(StatusCodes.OK).json({
            message: "Expense updated successfully",
            data: expense
        });
    } catch (err) {
        next(err);
    }
}
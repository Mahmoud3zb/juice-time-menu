import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import { ExpenseCategory } from "../expense-category-model";

export const getExpenseCategoryById: RequestHandler<{ id: string }> =
    async (req, res, next) => {
        try {
            const { id } = req.params;

            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    message: "Invalid expense category ID"
                });
            }

            const expenseCategory = await ExpenseCategory.findOne({
                _id: id,
                isActive: true
            });

            if (!expenseCategory) {
                return res.status(StatusCodes.NOT_FOUND).json({
                    message: "Expense category not found"
                });
            }

            return res.status(StatusCodes.OK).json({
                message: "Expense category found successfully",
                data: expenseCategory
            });
        } catch (err) {
            next(err);
        }
    };
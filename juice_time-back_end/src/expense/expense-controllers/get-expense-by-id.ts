import { RequestHandler } from "express";
import { Expense } from "../expense-model";
import mongoose from "mongoose";
import { StatusCodes } from "http-status-codes";

export const getExpenseById: RequestHandler<{ id: string }> =
    async (req, res, next) => {
        try {
            const { id } = req.params;

            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    message: "Invalid expense ID"
                });
            }

            const expense = await Expense.findById(id)
            .populate("expenseCategoryID", "name")
            .exec();

            if (!expense) {
                return res.status(StatusCodes.NOT_FOUND).json({
                    message: "Expense not found"
                });
            }

            return res.status(StatusCodes.OK).json({
                message: "Expense found successfully",
                data: expense
            });
        } catch (err) {
            next(err);
        }
    };
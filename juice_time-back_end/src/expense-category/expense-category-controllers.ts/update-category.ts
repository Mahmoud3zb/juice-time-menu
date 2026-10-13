import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import { ExpenseCategory } from "../expense-category-model";

interface IRequest {
    name?: string;
    isActive?: boolean;
}

interface IResponse {
    message: string;
    data?: unknown;
}

export const updateCategory: RequestHandler<
    { id: string },
    IResponse,
    IRequest
> = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, isActive } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "Invalid expense category ID"
            });
        }

        const updateObj: Partial<IRequest> = {};

        if (name !== undefined) {
            const trimmedName = name.trim();

            if (trimmedName.length < 3) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    message: "Name must be at least 3 characters long"
                });
            }

            updateObj.name = trimmedName;
        }

        if (isActive !== undefined) {
            updateObj.isActive = isActive;
        }

        if (Object.keys(updateObj).length === 0) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "No valid fields provided for update"
            });
        }

        const updatedCategory = await ExpenseCategory.findOneAndUpdate(
            { _id: id },
            { $set: updateObj },
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedCategory) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "Expense category not found"
            });
        }

        return res.status(StatusCodes.OK).json({
            message: "Expense category updated successfully",
            data: updatedCategory
        });
    } catch (err) {
        next(err);
    }
};
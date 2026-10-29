import { RequestHandler } from "express";
import { Expense, ExpenseType } from "../expense-model";
import mongoose from "mongoose";
import { StatusCodes } from "http-status-codes";
import { body } from "express-validator";
import { ExpenseCategory } from "../../expense-category/expense-category-model";

export const updateExpenseValidators = [
    body("expenseCategoryID").optional().isMongoId().withMessage("معرف تصنيف المصروف غير صالح"),
    body("amount").optional().isFloat({ min: 0.1 }).withMessage("المبلغ يجب أن يكون رقماً أكبر من صفر"),
    body("description").optional().isString().withMessage("التفاصيل يجب أن تكون نصية"),
    body("expenseType").optional().isIn(["daily", "after_closing"]).withMessage("نوع المصروف غير صالح"),
    body("expenseDate").optional().isISO8601().withMessage("صيغة التاريخ غير صالحة")
];

interface IRequest {
    expenseCategoryID?: mongoose.Types.ObjectId;
    amount?: number;
    description?: string;
    expenseType?: ExpenseType;
    expenseDate?: Date;
}

interface IResponse {
    message: string;
    data?: unknown;
}

export const updateExpense: RequestHandler<{ id: string }, IResponse, IRequest> = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { expenseCategoryID, amount, description, expenseType, expenseDate } = req.body;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "معرف المصروف غير صالح"
            });
        }
        const updateObj: Partial<IRequest> = {};
        if (expenseCategoryID !== undefined) {
            const category = await ExpenseCategory.findOne({
                _id: expenseCategoryID,
                isActive: true
            });
            if (!category) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    message: "تصنيف المصروف غير موجود أو معطل"
                });
            }
            updateObj.expenseCategoryID = expenseCategoryID;
        }
        if (amount !== undefined) {
            updateObj.amount = amount;
        }
        if (description !== undefined) {
            updateObj.description = description;
        }
        if (expenseType !== undefined) {
            updateObj.expenseType = expenseType;
        }
        if (expenseDate !== undefined) {
            updateObj.expenseDate = expenseDate;
        }

        if (Object.keys(updateObj).length === 0) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "لم يتم تقديم أي حقول صالحة للتعديل"
            });
        }
        const expense = await Expense.findByIdAndUpdate(
            id,
            { $set: updateObj },
            { new: true, runValidators: true }
        );
        if (!expense) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "المصروف غير موجود"
            });
        }
        res.status(StatusCodes.OK).json({
            message: "تم تعديل المصروف بنجاح",
            data: expense
        });
    } catch (err) {
        next(err);
    }
};
import { RequestHandler } from "express";
import { Expense, ExpenseType } from "../expense-model";
import mongoose from "mongoose";
import { StatusCodes } from "http-status-codes";
import { body } from "express-validator";
import { ExpenseCategory } from "../../expense-category/expense-category-model";

export const addExpenseValidators = [
    body("expenseCategoryID")
        .not().isEmpty().withMessage("يرجى اختيار تصنيف المصروف")
        .isMongoId().withMessage("معرف تصنيف المصروف غير صالح"),
    body("amount")
        .not().isEmpty().withMessage("يرجى إدخال المبلغ")
        .isFloat({ min: 0.1 }).withMessage("المبلغ يجب أن يكون رقماً أكبر من صفر"),
    body("expenseDate")
        .not().isEmpty().withMessage("تاريخ المصروف مطلوب")
        .isISO8601().withMessage("صيغة التاريخ غير صالحة"),
    body("expenseType")
        .optional()
        .isIn(["daily", "after_closing"]).withMessage("نوع المصروف يجب أن يكون يومي (daily) أو بعد التقفيل (after_closing)")
];

interface IRequest {
    expenseCategoryID: mongoose.Types.ObjectId;
    amount: number;
    description?: string;
    expenseType?: ExpenseType;
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
        const { expenseCategoryID, amount, description, expenseType, expenseDate } = req.body;
        const category = await ExpenseCategory.findOne({
            _id: expenseCategoryID,
            isActive: true
        });

        if (!category) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "تصنيف المصروف غير موجود أو معطل"
            });
        }
        const expense = await Expense.create({
            expenseCategoryID,
            amount,
            description,
            expenseType: expenseType || "daily",
            expenseDate
        });
        res.status(StatusCodes.CREATED).json({
            message: "تم تسجيل المصروف بنجاح",
            data: expense
        });
    } catch (err) {
        next(err);
    }
};
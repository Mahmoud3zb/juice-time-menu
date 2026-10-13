import { RequestHandler } from "express";
import { body } from "express-validator";
import { StatusCodes } from "http-status-codes";
import { ExpenseCategory } from "../expense-category-model";


export const addExpenseCategoryValidators = [
    body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long"),
    body("isActive").optional().isBoolean().withMessage("isActive must be a boolean"),
]

interface IRequest{
    name: string;
    isActive?: boolean;
}
interface IResponse{
    message: string;
    data?: unknown;
}

export const addExpenseCategory: RequestHandler<{},IResponse,IRequest> = async (req, res, next) => {
    try{
        const {name, isActive} = req.body ;
        const expenseCategory = await ExpenseCategory.create({
            name,
            isActive
        });
        res.status(StatusCodes.CREATED).json({message: "Expense category added successfully", data: expenseCategory});
    }catch(err){
        next(err);
    }
}
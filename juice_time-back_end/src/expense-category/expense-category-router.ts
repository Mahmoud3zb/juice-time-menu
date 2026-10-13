import { Router } from "express";
import { handleValidationErrors } from "../middlewares/handleValidationErrors";
import { addExpenseCategoryValidators, addExpenseCategory } from "./expense-category-controllers.ts/add-expense-category";

import { getExpenseCategoryById } from "./expense-category-controllers.ts/get-expense-by-id";
import { getExpenseCategory } from "./expense-category-controllers.ts/get-expense-category";



const router=Router();



router.post("/",
    addExpenseCategoryValidators,
    handleValidationErrors,
    addExpenseCategory
);

router.get("/", getExpenseCategory);

router.get("/:id", getExpenseCategoryById);

export default router;
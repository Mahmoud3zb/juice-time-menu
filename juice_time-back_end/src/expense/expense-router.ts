import { Router } from "express";
import { handleValidationErrors } from "../middlewares/handleValidationErrors";
import { addExpenseValidators, addExpense } from "./expense-controllers/add-expense";
import { getExpenses } from "./expense-controllers/get-expenses";
import { getExpenseById } from "./expense-controllers/get-expense-by-id";
import { updateExpenseValidators, updateExpense } from "./expense-controllers/update-expense";
import { deleteExpense } from "./expense-controllers/delete-expense";
import { getDailyReport } from "./expense-controllers/reports/get-daily-report";
import { getMonthlyReport } from "./expense-controllers/reports/get-monthly-report";

const router = Router();

// 1. Reports (Must precede /:id)
router.get("/reports/daily", getDailyReport);
router.get("/reports/monthly", getMonthlyReport);

// 2. Collection Operations
router.get("/", getExpenses);
router.post(
    "/",
    addExpenseValidators,
    handleValidationErrors,
    addExpense
);

// 3. Single Item Operations
router.get("/:id", getExpenseById);
router.put(
    "/:id",
    updateExpenseValidators,
    handleValidationErrors,
    updateExpense
);
router.delete("/:id", deleteExpense);

export default router;
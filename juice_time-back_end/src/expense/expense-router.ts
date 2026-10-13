import { Router } from "express";
import { handleValidationErrors } from "../middlewares/handleValidationErrors";
import { addExpenseValidators, addExpense } from "./expense-controllers/add-expense";
import { getExpenses } from "./expense-controllers/get-expenses";



const router = Router();


router.post("/",
    addExpenseValidators,
    handleValidationErrors,
    addExpense
)

router.get("/", getExpenses);


export default router;
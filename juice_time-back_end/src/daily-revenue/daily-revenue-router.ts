import { Router } from "express";
import { handleValidationErrors } from "../middlewares/handleValidationErrors";
import { isAuthenticated } from "../middlewares/isAuthenticated.middleware";
import {
    setDailyRevenueValidators,
    setDailyRevenue,
    getDailyRevenue,
    getMonthlyRevenues
} from "./daily-revenue-controller";

const router = Router();

// Protect daily revenue with authentication
router.use(isAuthenticated);

router.post("/", setDailyRevenueValidators, handleValidationErrors, setDailyRevenue);
router.put("/", setDailyRevenueValidators, handleValidationErrors, setDailyRevenue);
router.get("/", getDailyRevenue);
router.get("/monthly", getMonthlyRevenues);

export default router;

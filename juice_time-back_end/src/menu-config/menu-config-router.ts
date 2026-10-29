import { Router } from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.middleware";
import { getMenuConfig, updateMenuConfig } from "./menu-config-controller";

const router = Router();

// Public: Customer menu and visitor frontend can read current season & category order
router.get("/", getMenuConfig);

// Protected: Only authenticated admin can update season or reorder categories
router.put("/", isAuthenticated, updateMenuConfig);

export default router;

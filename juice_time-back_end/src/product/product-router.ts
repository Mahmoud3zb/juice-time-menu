import { Router } from "express";
import { handleValidationErrors } from "../middlewares/handleValidationErrors";
import { updateProductValidators, updateProduct } from "./product-controller/update-product";
import { addProductValidators, addProduct } from "./product-controller/add-product";
import { deleteProduct } from "./product-controller/delete-product";
import { isAuthenticated } from "../middlewares/isAuthenticated.middleware";
import { getProducts } from "./product-controller/get-products";
import { upload } from "../middlewares/upload";

const router = Router();

// Public route: Menu customers and visitor frontend can read products freely
router.get("/", getProducts);

// Protected routes: Only authenticated admin/owner can add, update or delete products
router.post("/",
    isAuthenticated,
    upload.single("image"),
    addProductValidators,
    handleValidationErrors,
    addProduct
);

router.put("/:id",
    isAuthenticated,
    upload.single("image"),
    updateProductValidators,
    handleValidationErrors,
    updateProduct
);

router.delete("/:id",
    isAuthenticated,
    deleteProduct
);

export default router;
import { Router } from "express";
import { handleValidationErrors } from "../middlewares/handleValidationErrors";
import { updateProductValidators, updateProduct } from "./product-controller/update-product";
import { isAuthenticated } from "../middlewares/isAuthenticated.middleware";
import { getProducts } from "./product-controller/get-products";
import { addProduct } from "./product-controller/add-product";
import { upload } from "../middlewares/upload";




const router = Router();

router.use(isAuthenticated);


router.post("/",
    upload.single("image"),
    updateProductValidators,
    handleValidationErrors,
    addProduct
);

router.get("/", getProducts);

router.put("/:id",
    updateProductValidators,
    handleValidationErrors,
    updateProduct);
export default router;
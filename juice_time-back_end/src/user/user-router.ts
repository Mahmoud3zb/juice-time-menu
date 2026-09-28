import { Router } from "express";
import { addUser, addUserValidators } from "./user-controllers/add-user";
import { handleValidationErrors } from "../middlewares/handleValidationErrors";
import { deleteUser } from "./user-controllers/delete-user";
import { getUsers } from "./user-controllers/get-users";
import { isAuthenticated } from "../middlewares/isAuthenticated.middleware";



const router = Router();


router.use(isAuthenticated);

router.post("/",
    addUserValidators,
    handleValidationErrors,
    addUser)

router.get("/", getUsers);

router.delete("/:id", deleteUser);

export default router;
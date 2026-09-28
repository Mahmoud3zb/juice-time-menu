import { Router } from "express";
import { loginHandler } from "./login";
import { logout } from "./logout";



const router = Router();

router.post("/login", loginHandler)

router.delete("/logout", logout)


export default router;
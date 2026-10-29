import jwt from "jsonwebtoken";
import { RequestHandler } from "express";
import { UserToken } from "../interfaces/user-token";

export const isAuthenticated: RequestHandler = (req, res, next) => {
    let token = req.cookies?.token;
    const authHeader = req.headers.authorization;
    if (!token && authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
    }

    if (!token) {
        res.status(401).json({ message: "Unauthorized: No token provided" });
        return;
    }

    try {
        (req as any).user = <UserToken>jwt.verify(token, process.env.secretKey!);
        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorized, please login" });
    }
};
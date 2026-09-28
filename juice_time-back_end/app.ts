import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import productRouter from "./src/product/product-router";
import userRouter from "./src/user/user-router";
import authRouter from "./src/auth/auth-router";
// import authRouter from "./src/auth/auth-router";
// Routers

dotenv.config();
const app = express();
app.set('trust proxy', 1);
const PORT = Number(process.env.PORT) || 3000;
const URI = process.env.DB_URL;
const DB_NAME = process.env.DB_NAME;

if (!URI || !DB_NAME) {
    console.error("FATAL ERROR: DB_URL or DB_NAME is not defined in .env");
    process.exit(1);
}

mongoose
    .connect(URI, {
        dbName: DB_NAME
    })
    .then(() => console.log("MongoDB connected successfully"))
    .catch((err) => {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    });

app.use(helmet());


app.use(cookieParser());
app.use(express.static("public"));
app.use(express.json());
// API Routes
// app.use("/auth",authRouter);
app.use("/api/products",productRouter);
app.use("/api/users",userRouter);
app.use("/api/auth", authRouter);
app.get('/', (req, res) => {
    res.status(200).send('juice time API is running');
})

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error("Global Error Handler:", err);

    res.status(err.status || 500).json({
        message: process.env.NODE_ENV === "production" 
            ? "Internal Server Error" 
            : err.message,
    });
});

const server = app.listen(PORT, "0.0.0.0", () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
});


process.on("SIGTERM", async () => {
    console.log("SIGTERM received. Shutting down gracefully...");
    server.close(async () => {
        console.log("HTTP server closed.");
        await mongoose.connection.close();
        console.log("MongoDB connection closed.");
        process.exit(0);
    });
});
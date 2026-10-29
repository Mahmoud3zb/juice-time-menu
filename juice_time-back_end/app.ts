import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";

// Routers
import productRouter from "./src/product/product-router";
import userRouter from "./src/user/user-router";
import authRouter from "./src/auth/auth-router";
import expenseCategoryRouter from "./src/expense-category/expense-category-router";
import expenseRouter from "./src/expense/expense-router";
import dailyRevenueRouter from "./src/daily-revenue/daily-revenue-router";
import menuConfigRouter from "./src/menu-config/menu-config-router";

dotenv.config();

const app = express();
app.set("trust proxy", 1);

const PORT = Number(process.env.PORT) || 3000;

// Reusable Database Connection for Serverless & Long-running Node environments
let isConnecting = false;

export const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) {
        return;
    }
    if (isConnecting) {
        await new Promise((resolve) => setTimeout(resolve, 300));
        if (mongoose.connection.readyState >= 1) return;
    }

    const URI = process.env.DB_URL;
    const DB_NAME = process.env.DB_NAME;

    if (!URI || !DB_NAME) {
        throw new Error("DB_URL or DB_NAME is not defined in environment variables");
    }

    try {
        isConnecting = true;
        await mongoose.connect(URI, {
            dbName: DB_NAME,
            serverSelectionTimeoutMS: 8000,
        });
        console.log("✅ MongoDB connected successfully");
    } finally {
        isConnecting = false;
    }
};

// Security Headers
app.use(helmet());

// Enable CORS for frontend applications (Localhost, Vercel deployments, & custom domains)
app.use(cors({
    origin: (origin, callback) => {
        // Allow mobile apps, postman, curl, or any origin
        if (!origin) return callback(null, true);

        const allowedOrigins = [
            process.env.FRONTEND_URL,
            process.env.CLIENT_URL,
            "http://localhost:5173",
            "http://localhost:3000",
            "http://localhost:4173",
        ].filter(Boolean) as string[];

        // Allow any vercel deployment or configured domain
        if (
            origin.includes("localhost") ||
            origin.includes("vercel.app") ||
            allowedOrigins.some(url => origin === url || origin.startsWith(url))
        ) {
            return callback(null, true);
        }

        return callback(null, true); // Permissive fallback for custom juice-time domains
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"]
}));

app.use(cookieParser());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection middleware (Ensures active DB connection for Serverless Lambdas)
app.use(async (req: Request, res: Response, next: NextFunction) => {
    if (req.path === "/" || req.path === "/api/health") {
        return next();
    }
    try {
        await connectDB();
        next();
    } catch (err: any) {
        console.error("MongoDB connection failed:", err.message);
        res.status(503).json({
            message: "Database connection unavailable. Please verify DB_URL and DB_NAME in environment settings.",
            error: process.env.NODE_ENV === "production" ? undefined : err.message,
        });
    }
});

// Root & Health Check Endpoints
app.get("/", (req, res) => {
    res.status(200).send("juice time API is running");
});

app.get("/api/health", (req, res) => {
    res.status(200).json({
        status: "ok",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        database: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    });
});

// API Routes
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/expense-category", expenseCategoryRouter);
app.use("/api/expense", expenseRouter);
app.use("/api/daily-revenue", dailyRevenueRouter);
app.use("/api/menu-config", menuConfigRouter);

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error("Global Error Handler:", err);

    res.status(err.status || 500).json({
        message: process.env.NODE_ENV === "production" 
            ? "Internal Server Error" 
            : err.message,
    });
});

// Standalone Server (Only runs when not in a Serverless environment like Vercel)
if (!process.env.VERCEL && process.env.NODE_ENV !== "test") {
    connectDB().catch((err) => {
        console.error("Initial MongoDB connection error:", err.message);
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
}

export default app;
module.exports = app;
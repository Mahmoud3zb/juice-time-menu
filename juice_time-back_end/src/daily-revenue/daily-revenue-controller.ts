import { RequestHandler } from "express";
import { DailyRevenue } from "./daily-revenue-model";
import { StatusCodes } from "http-status-codes";
import { body, query } from "express-validator";

export const setDailyRevenueValidators = [
    body("date")
        .notEmpty().withMessage("التاريخ مطلوب")
        .matches(/^\d{4}-\d{2}-\d{2}$/).withMessage("صيغة التاريخ يجب أن تكون YYYY-MM-DD"),
    body("amount")
        .notEmpty().withMessage("قيمة الإيراد مطلوبة")
        .isFloat({ min: 0 }).withMessage("قيمة الإيراد يجب أن تكون رقماً أكبر من أو يساوي صفر"),
    body("notes").optional().isString().withMessage("الملاحظات يجب أن تكون نصية")
];

export const setDailyRevenue: RequestHandler = async (req, res, next) => {
    try {
        const { date, amount, notes } = req.body;
        const parsedAmount = parseFloat(amount);

        // Upsert daily revenue for the specified date
        const record = await DailyRevenue.findOneAndUpdate(
            { date },
            { $set: { date, amount: parsedAmount, notes: notes || "" } },
            { new: true, upsert: true, runValidators: true }
        );

        res.status(StatusCodes.OK).json({
            message: "تم حفظ الإيراد اليومي بنجاح",
            data: record
        });
    } catch (err) {
        next(err);
    }
};

export const getDailyRevenue: RequestHandler = async (req, res, next) => {
    try {
        const dateStr = (req.query.date as string) || new Date().toISOString().slice(0, 10);
        const record = await DailyRevenue.findOne({ date: dateStr });

        res.status(StatusCodes.OK).json({
            message: "تم جلب الإيراد بنجاح",
            data: record || { date: dateStr, amount: 0, notes: "" }
        });
    } catch (err) {
        next(err);
    }
};

export const getMonthlyRevenues: RequestHandler = async (req, res, next) => {
    try {
        const now = new Date();
        const month = parseInt(req.query.month as string, 10) || (now.getMonth() + 1);
        const year = parseInt(req.query.year as string, 10) || now.getFullYear();

        const formattedMonth = month < 10 ? `0${month}` : `${month}`;
        const regex = new RegExp(`^${year}-${formattedMonth}-`);

        const records = await DailyRevenue.find({ date: { $regex: regex } }).sort({ date: 1 });
        const totalRevenue = records.reduce((sum, r) => sum + (r.amount || 0), 0);

        res.status(StatusCodes.OK).json({
            message: "تم جلب إيرادات الشهر بنجاح",
            data: {
                month,
                year,
                totalRevenue,
                daysCount: records.length,
                records
            }
        });
    } catch (err) {
        next(err);
    }
};

import { RequestHandler } from "express";
import { Product } from "../product-model";
import mongoose from "mongoose";
import { StatusCodes } from "http-status-codes";

export const deleteProduct: RequestHandler<{ id: string }> = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "معرف المنتج غير صالح" });
        }

        const deleted = await Product.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "المنتج غير موجود" });
        }

        res.status(StatusCodes.OK).json({
            message: "تم حذف المنتج بنجاح",
            data: deleted
        });
    } catch (err) {
        next(err);
    }
};

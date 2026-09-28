import { RequestHandler } from "express";
import { Product } from "../product-model";
import { body} from "express-validator";
import mongoose from "mongoose";
import { StatusCodes } from "http-status-codes";

export const updateProductValidators = [
    body("name").optional().not().isEmpty().withMessage("Name cannot be empty"),
    body("prices.cup").optional().isNumeric().withMessage("Cup price must be a valid number"),
    body("prices.liter").optional().isNumeric().withMessage("Liter price must be a valid number"),
    body("type").optional().not().isEmpty().withMessage("Type cannot be empty"),
];

interface IRequest {
    name?: string;
    prices?: {
        cup?: number;
        liter?: number;
    };
    description?: string;
    imageurl?: string;
    type?: string;
}

interface IResponse {
    message: string;
    data?: unknown;
}
export const updateProduct: RequestHandler <{ id: string },IResponse,IRequest> = async (req, res, next) => {
    try {
        const { id } = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Product not found" });
        }
        const updateObj:any = {};
        const { name, prices, description, imageurl, type } = req.body;
        if (name) updateObj.name = name;
        if (prices) updateObj.prices = prices;
        if (description) updateObj.description = description;
        if (imageurl) updateObj.imageurl = imageurl;
        if (type) updateObj.type = type;
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { $set: updateObj },
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Product not found",
            data: updatedProduct
            });
        }

        res.status(StatusCodes.OK).json({ 
            message: "Product updated successfully", 
            data: updatedProduct 
        });
    } catch (err) {
        next(err);
    }
};
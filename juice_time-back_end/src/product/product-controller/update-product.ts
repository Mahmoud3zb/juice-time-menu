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
    prices?: any;
    "prices.cup"?: any;
    "prices.liter"?: any;
    description?: string;
    imageurl?: string;
    type?: string;
    [key: string]: any;
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
        const updateObj: any = {};
        const unsetObj: any = {};
        const { name, prices, description, imageurl, type, priceType, order } = req.body;
        if (name) updateObj.name = name;
        if (order !== undefined) updateObj.order = Number(order);

        if (req.file?.path) {
            updateObj.imageurl = req.file.path;
        } else if (imageurl) {
            updateObj.imageurl = imageurl;
        }

        if (typeof prices === "string") {
            try {
                updateObj.prices = JSON.parse(prices);
            } catch {
                // fallback
            }
        } else if (prices) {
            updateObj.prices = { ...prices };
        }

        if (req.body["prices.cup"] !== undefined) {
            updateObj.prices = updateObj.prices || {};
            updateObj.prices.cup = Number(req.body["prices.cup"]);
        }

        const isRemovingLiter =
            priceType === "single_price" ||
            req.body["prices.liter"] === "" ||
            req.body["prices.liter"] === null ||
            (prices && typeof prices === "object" && prices.liter === undefined && priceType === "single_price");

        if (isRemovingLiter) {
            if (updateObj.prices) {
                delete updateObj.prices.liter;
            }
            unsetObj["prices.liter"] = 1;
        } else if (req.body["prices.liter"] !== undefined) {
            updateObj.prices = updateObj.prices || {};
            updateObj.prices.liter = Number(req.body["prices.liter"]);
        }

        if (priceType) {
            updateObj.priceType = priceType;
        }

        if (description !== undefined) {
            updateObj.description = description;
        }

        if (type) updateObj.type = type;

        const updateQuery: any = { $set: updateObj };
        if (Object.keys(unsetObj).length > 0) {
            updateQuery.$unset = unsetObj;
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            updateQuery,
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
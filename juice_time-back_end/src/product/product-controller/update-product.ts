import { RequestHandler } from "express";
import { Product } from "../product-model";
import { body} from "express-validator";
import mongoose from "mongoose";
import { StatusCodes } from "http-status-codes";

export const updateProductValidators = [
    body("name").optional({ checkFalsy: true }).not().isEmpty().withMessage("Name cannot be empty"),
    body("prices.cup").optional({ checkFalsy: true }).isNumeric().withMessage("Cup price must be a valid number"),
    body("prices.liter").optional({ checkFalsy: true }).isNumeric().withMessage("Liter price must be a valid number"),
    body("type").optional({ checkFalsy: true }).not().isEmpty().withMessage("Type cannot be empty"),
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
export const updateProduct: RequestHandler <{ id: string }, IResponse, IRequest> = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Product not found" });
        }

        const product = await Product.findById(id);
        if (!product) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Product not found" });
        }

        const { name, prices, description, imageurl, type, priceType, order } = req.body;

        if (name) product.name = name;
        if (type) product.type = type;
        if (order !== undefined) product.order = Number(order);
        if (description !== undefined) product.description = description;
        if (priceType) product.priceType = priceType;

        if (req.file?.path) {
            product.imageurl = req.file.path;
        } else if (imageurl) {
            product.imageurl = imageurl;
        }

        // Safely assemble updated prices object
        let newPrices: { cup: number; liter?: number } = {
            cup: product.prices?.cup || 0,
            liter: product.prices?.liter,
        };

        if (typeof prices === "string") {
            try {
                const parsed = JSON.parse(prices);
                newPrices = { ...newPrices, ...parsed };
            } catch {
                // fallback
            }
        } else if (prices && typeof prices === "object") {
            newPrices = { ...newPrices, ...prices };
        }

        if (req.body["prices.cup"] !== undefined && req.body["prices.cup"] !== "") {
            newPrices.cup = Number(req.body["prices.cup"]);
        }

        const isRemovingLiter =
            priceType === "single_price" ||
            req.body["prices.liter"] === "" ||
            req.body["prices.liter"] === null ||
            (prices && typeof prices === "object" && prices.liter === undefined && priceType === "single_price");

        if (isRemovingLiter) {
            delete newPrices.liter;
            product.prices = { cup: newPrices.cup };
            // Mark modified so mongoose replaces the subdocument completely
            product.markModified("prices");
        } else if (req.body["prices.liter"] !== undefined && req.body["prices.liter"] !== "") {
            newPrices.liter = Number(req.body["prices.liter"]);
            product.prices = newPrices;
            product.markModified("prices");
        } else {
            product.prices = newPrices;
            product.markModified("prices");
        }

        await product.save();

        res.status(StatusCodes.OK).json({ 
            message: "Product updated successfully", 
            data: product 
        });
    } catch (err) {
        next(err);
    }
};
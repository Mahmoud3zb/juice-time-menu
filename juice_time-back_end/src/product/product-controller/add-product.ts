import { RequestHandler } from "express";
import { Product } from "../product-model";
import {body} from "express-validator";


export const addProductValidators = [
    body("name").not().isEmpty().withMessage("Name is required"),
    body("prices.cup").not().isEmpty().withMessage("Cup price is required"),
    body("prices.liter").optional({ checkFalsy: true }).isNumeric().withMessage("Liter price must be a valid number"),
    body("type").not().isEmpty().withMessage("Type is required"),
];

interface IRequest {
    name: string;
    prices?: any;
    "prices.cup"?: any;
    "prices.liter"?: any;
    description?: string;
    imageurl?: string;
    type: string;
    [key: string]: any;
}

interface IResponse {
    message: string;
    data?: unknown;
}
export const addProduct: RequestHandler<{}, IResponse, IRequest> = async (req, res, next) => {
    try {
        const { name, prices, description, type, priceType } = req.body;
        const imageurl = req.file?.path || req.body.imageurl || "";
        let finalPrices: { cup: number; liter?: number } = { cup: 0 };

        if (typeof prices === "string") {
            try {
                finalPrices = JSON.parse(prices);
            } catch {
                finalPrices = { cup: 0 };
            }
        } else if (prices && typeof prices === "object") {
            finalPrices = { ...prices };
        }

        if (req.body["prices.cup"] !== undefined) {
            finalPrices.cup = Number(req.body["prices.cup"]);
        }
        if (req.body["prices.liter"] !== undefined && req.body["prices.liter"] !== "") {
            finalPrices.liter = Number(req.body["prices.liter"]);
        }

        const product = await Product.create({
            name,
            prices: finalPrices,
            priceType: priceType || (finalPrices.liter ? "cup_liter" : "single_price"),
            description,
            imageurl,
            type
        });
        if(!product){
            return res.status(400).json({message: "Product not created"});
        }
        res.status(200).json({message: "Product added successfully", data: product});
    }catch(err){
    next(err)
    }
}
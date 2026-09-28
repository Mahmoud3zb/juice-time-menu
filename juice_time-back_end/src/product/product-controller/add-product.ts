import { RequestHandler } from "express";
import { Product } from "../product-model";
import {body} from "express-validator";


export const addProductValidators = [
    body("name").not().isEmpty().withMessage("Name is required"),
    body("prices.cup").not().isEmpty().withMessage("Cup price is required"),
    body("type").not().isEmpty().withMessage("Type is required"),
]

interface IRequest {
    name: string;
    prices: {
        cup: number;
        liter?: number;
    };
    description?: string;
    type: string;
}

interface IResponse {
    message: string;
    data?:unknown
}
export const addProduct: RequestHandler<{},IResponse,IRequest> = async (req, res, next) => {
    try{
        const {name, prices, description, type} = req.body;
        const imageurl = req.file?.path;
        const product = await Product.create({
            name,
            prices,
            description,
            imageurl: imageurl||"",
            type});
        if(!product){
            return res.status(400).json({message: "Product not created"});
        }
        res.status(200).json({message: "Product added successfully", data: product});
    }catch(err){
    next(err)
    }
}
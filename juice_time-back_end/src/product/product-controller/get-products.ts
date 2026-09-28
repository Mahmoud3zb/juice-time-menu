import { RequestHandler } from "express";
import { Product } from "../product-model";




export const getProducts: RequestHandler = async (req, res, next) => {
    try{
        const page =Math.max(1,Number( req.query.page || 1)  );
        const limit = Math.max(1, Number(req.query.limit || 10) );
        const products = await Product.find()
        .sort({createdAt: -1})
        .skip((page - 1) * limit)
        .limit(limit);

        const total = await Product.countDocuments();
        res.status(200).json({message: "Products fetched successfully", 
        total,
        page,
        limit, 
        totalPage: Math.ceil(total / limit),
        data: products})
    }catch(err){
        next(err)
    }
}
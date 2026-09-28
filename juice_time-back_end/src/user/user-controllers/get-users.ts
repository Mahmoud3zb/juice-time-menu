import { RequestHandler } from "express";
import { User } from "../user-model";


export const getUsers:RequestHandler = async (req, res, next) => {
    try{
        const page=Math.max(1,Number( req.query.page || 1)  );
        const limit = Math.max(1, Number(req.query.limit || 10) );
        const [users, total] = await Promise.all([
            User.find()
            .sort({createdAt: -1})
            .skip((page - 1) * limit)
            .limit(limit),
            User.countDocuments()
        ])
        if(!users){
            return res.status(400).json({message: "Users not found"});
        }
        res.status(200).json({message: "Users found successfully",
            page,
            limit,
            total,
            totalPage: Math.ceil(total / limit),
            data: users})
    }catch(err){
        next(err)
    }
}
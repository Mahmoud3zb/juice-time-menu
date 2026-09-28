import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import { User } from "../user-model";




export const deleteUser:RequestHandler<{id:string}> = async (req, res, next) => {
    try{
        const {id} = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(StatusCodes.BAD_REQUEST).json({message: "User not found"});
        }
        const user = await User.findByIdAndDelete(id);
        if(!user){
            return res.status(400).json({message: "User not found"});
        }
        res.status(200).json({message: "User deleted successfully"});
    }catch(err){
        next(err)
    }
}
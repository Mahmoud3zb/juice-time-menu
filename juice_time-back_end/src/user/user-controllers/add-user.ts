import { RequestHandler } from "express";
import { Role, User } from "../user-model";
import bcrypt from "bcrypt";
import {body} from "express-validator";


export const addUserValidators = [
    body("name").not().isEmpty().withMessage("Name is required"),
    body("email").not().isEmpty().withMessage("Email is required"),
    body("password").not().isEmpty().withMessage("Password is required"),
]

interface IRequest{
    name: string,
    email: string,
    password: string,
    role?: Role
}

interface IResponse{
    message: string,
    data?: unknown
}

export const addUser: RequestHandler<{},IResponse,IRequest> = async (req, res, next) =>{
    try{
        const {name, email, password, role} = req.body as IRequest;
        const hashedPassword= await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password:hashedPassword,
            role: role || Role.ADMIN
        });
        if(!user){
            return res.status(400).json({message: "User not created"});
        }
        res.status(200).json({message: "User added successfully", data: user});
    }catch(err){
        next(err)
    }
}
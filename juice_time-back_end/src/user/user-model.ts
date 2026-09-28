import mongoose from "mongoose";

export enum Role{
    OWNER = "owner",
    ADMIN = "admin"
}

export interface IUser extends mongoose.Document {
    name: string,
    email: string,
    password: string,
    role:Role
}

const UserSchema = new mongoose.Schema<IUser>({
    name: { 
        type: String, 
        required: true 
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: Role.ADMIN,
        enum: Object.values(Role)
    }
});

export const User = mongoose.model<IUser>("User", UserSchema);
import mongoose from "mongoose";


interface IExpenseCategory {
    name: string;
    isActive?:boolean;
    createdAt?:Date;
    updatedAt?:Date;
}

const ExpenseCategorySchema = new mongoose.Schema<IExpenseCategory>({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, "Name must be at least 3 characters long"],
        unique: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
},
    {
        timestamps: true,
        versionKey: false
    });

export const ExpenseCategory = mongoose.model<IExpenseCategory>("ExpenseCategory", ExpenseCategorySchema);
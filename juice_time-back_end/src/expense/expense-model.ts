import mongoose from "mongoose";

export type ExpenseType = "daily" | "after_closing";

export interface IExpense {
    expenseCategoryID: mongoose.Types.ObjectId;
    amount: number;
    description?: string;
    expenseType: ExpenseType;
    expenseDate: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

const ExpenseSchema = new mongoose.Schema<IExpense>({
    expenseCategoryID: {
        type: mongoose.Types.ObjectId,
        ref: "ExpenseCategory",
        required: true
    },
    amount: {
        type: Number,
        required: true,
        min: [0.1, "Amount must be a positive number greater than 0"]
    },
    description: {
        type: String,
        required: false
    },
    expenseType: {
        type: String,
        enum: ["daily", "after_closing"],
        default: "daily",
        required: true
    },
    expenseDate: {
        type: Date,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
});

export const Expense = mongoose.model<IExpense>("Expense", ExpenseSchema);
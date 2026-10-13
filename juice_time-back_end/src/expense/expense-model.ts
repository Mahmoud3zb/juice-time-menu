import mongoose from "mongoose";


interface IExpense {
    expenseCategoryID: mongoose.Types.ObjectId;
    amount: number;
    description?: string;
    // expenseDate: Date;
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
        min: [0, "Amount must be a positive number"]
    },
    description: {
        type: String,
        required: false
    }
    // expenseDate: {
    //     type: Date,
    //     required: true,
    //     default: () => new Date()
    // }
},
    {
        timestamps: true,
        versionKey: false
    });

export const Expense = mongoose.model<IExpense>("Expense", ExpenseSchema);
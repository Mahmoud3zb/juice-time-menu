import mongoose from "mongoose";

export interface IDailyRevenue {
    date: string; // Stored in YYYY-MM-DD format for timezone-safe daily matching
    amount: number;
    notes?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const DailyRevenueSchema = new mongoose.Schema<IDailyRevenue>({
    date: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    amount: {
        type: Number,
        required: true,
        min: [0, "الإيراد لا يمكن أن يكون سالباً"]
    },
    notes: {
        type: String,
        required: false
    }
}, {
    timestamps: true,
    versionKey: false
});

export const DailyRevenue = mongoose.model<IDailyRevenue>("DailyRevenue", DailyRevenueSchema);

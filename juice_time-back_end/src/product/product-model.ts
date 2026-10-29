import mongoose from "mongoose";



export interface IProduct extends mongoose.Document {
    name: string;
    prices: {
        cup: number;
        liter?: number;
    };
    priceType?: 'cup_liter' | 'single_double' | 'single_price';
    order?: number;
    description?: string;
    imageurl?: string;
    type: string;
    createdAt: Date;
    updatedAt: Date;
}


const productSchema = new mongoose.Schema<IProduct>({
    name: {
        type: String,
        required: true
    },
    prices: {
        cup: {
            type: Number,
            required: true
        },
        liter: {
            type: Number,
            required: false 
        }
    },
    description: {
        type: String,
        required: false
    },
    imageurl: {
        type: String,
        required: false
    },
    priceType: {
        type: String,
        enum: ['cup_liter', 'single_double', 'single_price'],
        default: 'cup_liter'
    },
    type: {
        type: String,
        required: true
    },
    order: {
        type: Number,
        default: 0
    }
},
    {
        timestamps: true
    });

export const Product = mongoose.model<IProduct>("Product", productSchema);
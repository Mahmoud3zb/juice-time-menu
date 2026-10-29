import { Schema, model, Document } from "mongoose";

export interface IMenuConfig extends Document {
  activeSeason: "default" | "summer" | "winter" | "ramadan" | "custom";
  categoryOrder: string[];
  updatedAt: Date;
}

const menuConfigSchema = new Schema<IMenuConfig>(
  {
    activeSeason: {
      type: String,
      enum: ["default", "summer", "winter", "ramadan", "custom"],
      default: "default",
    },
    categoryOrder: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export const MenuConfig = model<IMenuConfig>("MenuConfig", menuConfigSchema);

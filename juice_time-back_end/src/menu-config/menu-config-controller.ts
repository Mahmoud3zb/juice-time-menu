import { RequestHandler } from "express";
import { MenuConfig } from "./menu-config-model";

export const getMenuConfig: RequestHandler = async (req, res, next) => {
  try {
    let config = await MenuConfig.findOne();
    if (!config) {
      config = await MenuConfig.create({
        activeSeason: "default",
        categoryOrder: [],
      });
    }

    res.status(200).json({
      message: "Menu configuration fetched successfully",
      data: config,
    });
  } catch (err) {
    next(err);
  }
};

export const updateMenuConfig: RequestHandler = async (req, res, next) => {
  try {
    const { activeSeason, categoryOrder } = req.body;

    const validSeasons = ["default", "summer", "winter", "ramadan", "custom"];
    if (activeSeason && !validSeasons.includes(activeSeason)) {
      return res.status(400).json({
        message: `Invalid activeSeason. Must be one of: ${validSeasons.join(", ")}`,
      });
    }

    if (categoryOrder && !Array.isArray(categoryOrder)) {
      return res.status(400).json({
        message: "categoryOrder must be an array of category IDs",
      });
    }

    const updated = await MenuConfig.findOneAndUpdate(
      {},
      {
        ...(activeSeason ? { activeSeason } : {}),
        ...(categoryOrder ? { categoryOrder } : {}),
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.status(200).json({
      message: "Menu configuration saved successfully",
      data: updated,
    });
  } catch (err) {
    next(err);
  }
};

import React from "react";
import { Card, Box, Typography, Chip, Button, IconButton, Tooltip } from "@mui/material";
import { RestaurantMenu, Edit, Delete } from "@mui/icons-material";
import type { ProductItem } from "../../types/product";

interface AdminProductCardProps {
  product: ProductItem;
  onEdit: (product: ProductItem) => void;
  onDelete: (product: ProductItem) => void;
}

export const AdminProductCard: React.FC<AdminProductCardProps> = ({
  product: p,
  onEdit,
  onDelete,
}) => {
  const isCoffee = p.priceType === "single_double" || p.type === "قهوة" || p.type === "ركن القهوة";
  const isSinglePrice =
    p.priceType === "single_price" ||
    (!p.prices?.liter && p.priceType !== "cup_liter" && p.priceType !== "single_double");
  const hasSecondPrice = p.prices?.liter !== undefined && p.prices.liter > 0 && !isSinglePrice;

  const firstLabel = isCoffee ? "سنجل" : isSinglePrice ? "السعر" : "الكوب";
  const secondLabel = isCoffee ? "دبل" : "اللتر";

  return (
    <Card
      sx={{
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        boxShadow: "0 2px 12px rgba(0,0,0,0.03)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
          borderColor: "primary.light",
        },
      }}
    >
      {/* Product Image Header */}
      <Box
        sx={{
          height: 140,
          bgcolor: "grey.100",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {p.imageurl ? (
          <Box
            component="img"
            src={p.imageurl}
            alt={p.name}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            onError={(e: any) => {
              e.target.style.display = "none";
            }}
          />
        ) : (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "grey.400",
            }}
          >
            <RestaurantMenu sx={{ fontSize: 40 }} />
          </Box>
        )}

        {/* Category Pill Over Image */}
        <Chip
          label={p.type}
          size="small"
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            fontWeight: 800,
            fontSize: 11,
            bgcolor: "rgba(255,255,255,0.92)",
            backdropFilter: "blur(4px)",
            color: "#0f172a",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          }}
        />
      </Box>

      {/* Card Content */}
      <Box sx={{ p: 2, display: "flex", flexDirection: "column", flex: 1, justifyContent: "space-between", gap: 1.5 }}>
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 900, color: "#0f172a", lineHeight: 1.3 }}>
            {p.name}
          </Typography>

          {p.description && (
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                mt: 0.5,
                lineHeight: 1.4,
              }}
            >
              {p.description}
            </Typography>
          )}
        </Box>

        {/* Prices Box */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: hasSecondPrice ? "space-between" : "center",
            p: 1.25,
            borderRadius: 1.5,
            bgcolor: isCoffee ? "#fefce8" : isSinglePrice ? "#f0fdf4" : "#f8fafc",
            border: "1px solid",
            borderColor: isCoffee ? "#fef08a" : isSinglePrice ? "#bbf7d0" : "#f1f5f9",
          }}
        >
          <Box sx={{ textAlign: hasSecondPrice ? "right" : "center" }}>
            <Typography variant="caption" sx={{ fontWeight: 700, color: "text.secondary", display: "block" }}>
              {firstLabel}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 900,
                color: "#ea580c",
              }}
            >
              {p.prices?.cup ?? 0} <Typography component="span" variant="caption" sx={{ fontWeight: 800 }}>ج.م</Typography>
            </Typography>
          </Box>

          {hasSecondPrice && (
            <Box sx={{ textAlign: "left" }}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: "text.secondary", display: "block" }}>
                {secondLabel}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 900,
                  color: "#16a34a",
                }}
              >
                {p.prices.liter} <Typography component="span" variant="caption" sx={{ fontWeight: 800 }}>ج.م</Typography>
              </Typography>
            </Box>
          )}
        </Box>

        {/* Action Buttons: Edit / Delete */}
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 1, pt: 0.5 }}>
          <Button
            size="small"
            startIcon={<Edit sx={{ fontSize: 16 }} />}
            onClick={() => onEdit(p)}
            variant="outlined"
            sx={{
              borderRadius: 1.5,
              fontWeight: 800,
              fontSize: 12,
              px: 1.5,
              py: 0.5,
            }}
          >
            تعديل
          </Button>

          <Tooltip title="حذف الصنف">
            <IconButton
              size="small"
              color="error"
              onClick={() => onDelete(p)}
              sx={{ bgcolor: "#fee2e2", "&:hover": { bgcolor: "#fecaca" } }}
            >
              <Delete fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Card>
  );
};

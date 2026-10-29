import React from "react";
import { Box, Typography, Button, TextField, InputAdornment } from "@mui/material";

export type PriceType = "cup_liter" | "single_double" | "single_price";

interface ProductPricingSectionProps {
  priceType: PriceType;
  onPriceTypeChange: (type: PriceType) => void;
  cupPrice: string;
  onCupPriceChange: (val: string) => void;
  literPrice: string;
  onLiterPriceChange: (val: string) => void;
}

export const ProductPricingSection: React.FC<ProductPricingSectionProps> = ({
  priceType,
  onPriceTypeChange,
  cupPrice,
  onCupPriceChange,
  literPrice,
  onLiterPriceChange,
}) => {
  return (
    <>
      {/* Pricing Mode Selector */}
      <Box>
        <Typography variant="caption" sx={{ fontWeight: 800, color: "text.secondary", mb: 0.8, display: "block" }}>
          نظام التسعير والأحجام *
        </Typography>
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 1 }}>
          {/* Option 1: كباية / لتر */}
          <Button
            type="button"
            onClick={() => onPriceTypeChange("cup_liter")}
            variant={priceType === "cup_liter" ? "contained" : "outlined"}
            sx={{
              py: 1,
              px: 0.5,
              borderRadius: 1.5,
              fontWeight: 800,
              fontSize: "0.78rem",
              display: "flex",
              flexDirection: "column",
              gap: 0.3,
              bgcolor: priceType === "cup_liter" ? "#009a74" : "transparent",
              borderColor: priceType === "cup_liter" ? "#009a74" : "#cbd5e1",
              color: priceType === "cup_liter" ? "#fff" : "#475569",
              boxShadow: priceType === "cup_liter" ? "0 4px 12px rgba(0,154,116,0.25)" : "none",
              "&:hover": {
                bgcolor: priceType === "cup_liter" ? "#008262" : "#f1f5f9",
              },
            }}
          >
            <span>🥤 كباية / لتر</span>
            <span style={{ fontSize: "0.65rem", opacity: 0.85, fontWeight: 600 }}>عصائر ومشروبات</span>
          </Button>

          {/* Option 2: سنجل / دبل */}
          <Button
            type="button"
            onClick={() => onPriceTypeChange("single_double")}
            variant={priceType === "single_double" ? "contained" : "outlined"}
            sx={{
              py: 1,
              px: 0.5,
              borderRadius: 1.5,
              fontWeight: 800,
              fontSize: "0.78rem",
              display: "flex",
              flexDirection: "column",
              gap: 0.3,
              bgcolor: priceType === "single_double" ? "#854d0e" : "transparent",
              borderColor: priceType === "single_double" ? "#854d0e" : "#cbd5e1",
              color: priceType === "single_double" ? "#fff" : "#475569",
              boxShadow: priceType === "single_double" ? "0 4px 12px rgba(133,77,14,0.25)" : "none",
              "&:hover": {
                bgcolor: priceType === "single_double" ? "#713f12" : "#f1f5f9",
              },
            }}
          >
            <span>☕ سنجل / دبل</span>
            <span style={{ fontSize: "0.65rem", opacity: 0.85, fontWeight: 600 }}>قهوة وإسبريسو</span>
          </Button>

          {/* Option 3: سعر موحد */}
          <Button
            type="button"
            onClick={() => onPriceTypeChange("single_price")}
            variant={priceType === "single_price" ? "contained" : "outlined"}
            sx={{
              py: 1,
              px: 0.5,
              borderRadius: 1.5,
              fontWeight: 800,
              fontSize: "0.78rem",
              display: "flex",
              flexDirection: "column",
              gap: 0.3,
              bgcolor: priceType === "single_price" ? "#059669" : "transparent",
              borderColor: priceType === "single_price" ? "#059669" : "#cbd5e1",
              color: priceType === "single_price" ? "#fff" : "#475569",
              boxShadow: priceType === "single_price" ? "0 4px 12px rgba(5,150,105,0.25)" : "none",
              "&:hover": {
                bgcolor: priceType === "single_price" ? "#047857" : "#f1f5f9",
              },
            }}
          >
            <span>🏷️ سعر موحد</span>
            <span style={{ fontSize: "0.65rem", opacity: 0.85, fontWeight: 600 }}>طبق / حلى / إضافة</span>
          </Button>
        </Box>
      </Box>

      {/* Dynamic Price Fields based on chosen priceType */}
      {priceType === "single_price" ? (
        <Box>
          <Typography variant="caption" sx={{ fontWeight: 800, color: "text.secondary", mb: 0.5, display: "block" }}>
            السعر الموحد (ج.م) *
          </Typography>
          <TextField
            fullWidth
            size="small"
            required
            placeholder="مثال: 40"
            value={cupPrice}
            onChange={(e) => onCupPriceChange(e.target.value)}
            slotProps={{
              input: {
                sx: { borderRadius: 1.5, fontWeight: 800 },
                endAdornment: <InputAdornment position="end">ج.م</InputAdornment>,
              },
            }}
          />
        </Box>
      ) : (
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
          <Box>
            <Typography variant="caption" sx={{ fontWeight: 800, color: "text.secondary", mb: 0.5, display: "block" }}>
              {priceType === "single_double" ? "سعر سنجل (Single) *" : "سعر الكوب *"}
            </Typography>
            <TextField
              fullWidth
              size="small"
              required
              placeholder={priceType === "single_double" ? "مثال: 35" : "مثال: 50"}
              value={cupPrice}
              onChange={(e) => onCupPriceChange(e.target.value)}
              slotProps={{
                input: {
                  sx: { borderRadius: 1.5, fontWeight: 800 },
                  endAdornment: <InputAdornment position="end">ج.م</InputAdornment>,
                },
              }}
            />
          </Box>

          <Box>
            <Typography variant="caption" sx={{ fontWeight: 800, color: "text.secondary", mb: 0.5, display: "block" }}>
              {priceType === "single_double" ? "سعر دبل (Double)" : "سعر اللتر (اختياري)"}
            </Typography>
            <TextField
              fullWidth
              size="small"
              placeholder={priceType === "single_double" ? "مثال: 45" : "مثال: 100"}
              value={literPrice}
              onChange={(e) => onLiterPriceChange(e.target.value)}
              slotProps={{
                input: {
                  sx: { borderRadius: 1.5, fontWeight: 800 },
                  endAdornment: <InputAdornment position="end">ج.م</InputAdornment>,
                },
              }}
            />
          </Box>
        </Box>
      )}
    </>
  );
};

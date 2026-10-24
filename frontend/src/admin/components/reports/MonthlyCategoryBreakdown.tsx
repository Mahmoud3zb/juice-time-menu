import React from "react";
import { Box, Card, Typography, LinearProgress, CircularProgress } from "@mui/material";
import type { MonthlyCategoryTotal } from "../../types/expense";

interface MonthlyCategoryBreakdownProps {
  categories: MonthlyCategoryTotal[];
  totalExpenses: number;
  loading: boolean;
}

const CATEGORY_PALETTE = [
  { color: "#8b5cf6", light: "#ede9fe" }, // Purple
  { color: "#3b82f6", light: "#dbeafe" }, // Blue
  { color: "#f59e0b", light: "#fef3c7" }, // Amber
  { color: "#10b981", light: "#d1fae5" }, // Emerald
  { color: "#06b6d4", light: "#cffafe" }, // Cyan
  { color: "#ef4444", light: "#fee2e2" }, // Red
  { color: "#6366f1", light: "#e0e7ff" }, // Indigo
  { color: "#f97316", light: "#ffedd5" }, // Orange
];

export const MonthlyCategoryBreakdown: React.FC<MonthlyCategoryBreakdownProps> = ({
  categories,
  totalExpenses,
  loading,
}) => {
  return (
    <Card
      sx={{
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
        boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
        p: { xs: 2.5, sm: 3.5 },
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: 900,
          color: "text.primary",
          mb: 3,
          pb: 2,
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        إجمالي المصروفات حسب التصنيف (الأقسام)
      </Typography>

      {loading ? (
        <Box sx={{ py: 6, display: "flex", justifyContent: "center" }}>
          <CircularProgress size={30} thickness={4} />
        </Box>
      ) : categories.length === 0 ? (
        <Typography variant="body2" sx={{ py: 4, textAlign: "center", fontWeight: 700, color: "text.secondary" }}>
          لا توجد مصروفات مسجلة لهذا الشهر.
        </Typography>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
          {categories.map((cat, idx) => {
            const total = totalExpenses || 1;
            const percent = ((cat.totalAmount / total) * 100).toFixed(1);
            const theme = CATEGORY_PALETTE[idx % CATEGORY_PALETTE.length];

            return (
              <Box key={cat.categoryID || idx} sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
                    <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: theme.color }} />
                    <Typography variant="body2" sx={{ fontWeight: 800, color: "text.primary" }}>
                      {cat.categoryName}
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: "text.secondary" }}>
                      {cat.expensesCount} عملية
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 900, color: "text.primary" }}>
                      {cat.totalAmount.toLocaleString()} ج.م
                    </Typography>
                    <Typography variant="caption" sx={{ fontWeight: 900, color: theme.color }}>
                      ({percent}%)
                    </Typography>
                  </Box>
                </Box>

                <LinearProgress
                  variant="determinate"
                  value={Math.min(100, Math.max(3, parseFloat(percent)))}
                  sx={{
                    height: 10,
                    borderRadius: 5,
                    bgcolor: "grey.100",
                    "& .MuiLinearProgress-bar": {
                      bgcolor: theme.color,
                      borderRadius: 5,
                    },
                  }}
                />
              </Box>
            );
          })}
        </Box>
      )}
    </Card>
  );
};

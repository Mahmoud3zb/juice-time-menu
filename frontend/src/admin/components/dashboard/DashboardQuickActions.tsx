import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Button } from "@mui/material";
import { AttachMoney, CalendarTodayOutlined } from "@mui/icons-material";

interface DashboardQuickActionsProps {
  hasRevenue: boolean;
  onOpenRevenue: () => void;
}

export const DashboardQuickActions: React.FC<DashboardQuickActionsProps> = ({
  hasRevenue,
  onOpenRevenue,
}) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr 1fr", sm: "auto auto auto" },
        gap: 1.5,
        p: { xs: 1.5, sm: 2 },
        borderRadius: 2,
        backgroundColor: "#ffffff",
        border: "1px solid #e2e8f0",
        boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
      }}
    >
      <Button
        variant="outlined"
        size="medium"
        onClick={onOpenRevenue}
        startIcon={<AttachMoney sx={{ fontSize: 19 }} />}
        sx={{
          fontWeight: 800,
          borderRadius: 1.5,
          py: 1,
          px: 2,
          color: "#16a34a",
          borderColor: "#bbf7d0",
          backgroundColor: "#f0fdf4",
          "&:hover": { backgroundColor: "#dcfce7", borderColor: "#86efac" },
        }}
      >
        {hasRevenue ? "تعديل الإيراد" : "تسجيل الإيراد"}
      </Button>

      <Button
        component={RouterLink}
        to="/admin/reports/daily"
        variant="outlined"
        size="medium"
        startIcon={<CalendarTodayOutlined sx={{ fontSize: 16 }} />}
        sx={{
          fontWeight: 800,
          borderRadius: 1.5,
          py: 1,
          px: 2,
          color: "#475569",
          borderColor: "#e2e8f0",
          backgroundColor: "#ffffff",
          "&:hover": { backgroundColor: "#f8fafc", borderColor: "#cbd5e1" },
        }}
      >
        تقرير اليومية
      </Button>
    </Box>
  );
};

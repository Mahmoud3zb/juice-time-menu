import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import {
  AttachMoney,
  WbSunnyOutlined,
  NightlightOutlined,
  AccountBalanceWallet,
  EditNote,
} from "@mui/icons-material";

export interface FinancialCardsProps {
  revenue: number;
  dailyExpenses: number;
  afterClosingExpenses: number;
  netProfit: number;
  loading?: boolean;
  onRevenueClick?: () => void;
  labels?: {
    revenue?: string;
    dailyExpenses?: string;
    afterClosingExpenses?: string;
    netProfit?: string;
  };
}

export const FinancialCards: React.FC<FinancialCardsProps> = ({
  revenue,
  dailyExpenses,
  afterClosingExpenses,
  netProfit,
  loading = false,
  onRevenueClick,
  labels,
}) => {
  const isNetPositive = netProfit >= 0;

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
        gap: { xs: 1.5, sm: 2.5 },
      }}
    >
      {/* 1. الإيراد */}
      <Card
        onClick={onRevenueClick}
        sx={{
          backgroundColor: "#f0fdf4",
          borderColor: "#dcfce7",
          borderRadius: { xs: 3.5, sm: 4 },
          p: 0.5,
          cursor: onRevenueClick ? "pointer" : "default",
          transition: "all 0.2s ease-in-out",
          "&:hover": onRevenueClick
            ? {
                transform: "translateY(-2px)",
                boxShadow: "0 6px 16px rgba(22,163,74,0.12)",
                borderColor: "#86efac",
              }
            : undefined,
        }}
      >
        <CardContent sx={{ p: { xs: "12px !important", sm: "16px !important" } }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 800,
                  color: "#16a34a",
                  fontSize: { xs: "0.75rem", sm: "0.85rem" },
                }}
              >
                {labels?.revenue || "إيراد اليوم"}
              </Typography>
              {onRevenueClick && <EditNote sx={{ fontSize: 15, color: "#16a34a", opacity: 0.8 }} />}
            </Box>
            <Box
              sx={{
                width: { xs: 30, sm: 40 },
                height: { xs: 30, sm: 40 },
                borderRadius: 2.5,
                bgcolor: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#16a34a",
                boxShadow: "0 2px 6px rgba(22,163,74,0.12)",
              }}
            >
              <AttachMoney sx={{ fontSize: { xs: 18, sm: 22 } }} />
            </Box>
          </Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 900,
              color: "#166534",
              fontSize: { xs: "1.15rem", sm: "1.45rem" },
            }}
          >
            {loading ? "..." : revenue.toLocaleString()}{" "}
            <Typography component="span" sx={{ fontSize: "0.72rem", fontWeight: 800 }}>
              ج.م
            </Typography>
          </Typography>
        </CardContent>
      </Card>

      {/* 2. مصاريف الشيفت */}
      <Card
        sx={{
          backgroundColor: "#fff1f2",
          borderColor: "#ffe4e6",
          borderRadius: { xs: 3.5, sm: 4 },
          p: 0.5,
        }}
      >
        <CardContent sx={{ p: { xs: "12px !important", sm: "16px !important" } }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 800,
                color: "#e11d48",
                fontSize: { xs: "0.75rem", sm: "0.85rem" },
              }}
            >
              {labels?.dailyExpenses || "مصروف الشيفت"}
            </Typography>
            <Box
              sx={{
                width: { xs: 30, sm: 40 },
                height: { xs: 30, sm: 40 },
                borderRadius: 2.5,
                bgcolor: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#e11d48",
                boxShadow: "0 2px 6px rgba(225,29,72,0.12)",
              }}
            >
              <WbSunnyOutlined sx={{ fontSize: { xs: 17, sm: 22 } }} />
            </Box>
          </Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 900,
              color: "#be123c",
              fontSize: { xs: "1.15rem", sm: "1.45rem" },
            }}
          >
            {loading ? "..." : dailyExpenses.toLocaleString()}{" "}
            <Typography component="span" sx={{ fontSize: "0.72rem", fontWeight: 800 }}>
              ج.م
            </Typography>
          </Typography>
        </CardContent>
      </Card>

      {/* 3. بعد التقفيل */}
      <Card
        sx={{
          backgroundColor: "#faf5ff",
          borderColor: "#f3e8ff",
          borderRadius: { xs: 3.5, sm: 4 },
          p: 0.5,
        }}
      >
        <CardContent sx={{ p: { xs: "12px !important", sm: "16px !important" } }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 800,
                color: "#9333ea",
                fontSize: { xs: "0.75rem", sm: "0.85rem" },
              }}
            >
              {labels?.afterClosingExpenses || "بعد التقفيل"}
            </Typography>
            <Box
              sx={{
                width: { xs: 30, sm: 40 },
                height: { xs: 30, sm: 40 },
                borderRadius: 2.5,
                bgcolor: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#9333ea",
                boxShadow: "0 2px 6px rgba(147,51,234,0.12)",
              }}
            >
              <NightlightOutlined sx={{ fontSize: { xs: 17, sm: 22 } }} />
            </Box>
          </Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 900,
              color: "#6b21a8",
              fontSize: { xs: "1.15rem", sm: "1.45rem" },
            }}
          >
            {loading ? "..." : afterClosingExpenses.toLocaleString()}{" "}
            <Typography component="span" sx={{ fontSize: "0.72rem", fontWeight: 800 }}>
              ج.م
            </Typography>
          </Typography>
        </CardContent>
      </Card>

      {/* 4. صافي النقدية / الدرج */}
      <Card
        sx={{
          backgroundColor: isNetPositive ? "#eff6ff" : "#fff7ed",
          borderColor: isNetPositive ? "#dbeafe" : "#ffedd5",
          borderRadius: { xs: 3.5, sm: 4 },
          p: 0.5,
        }}
      >
        <CardContent sx={{ p: { xs: "12px !important", sm: "16px !important" } }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 800,
                color: isNetPositive ? "#2563eb" : "#ea580c",
                fontSize: { xs: "0.75rem", sm: "0.85rem" },
              }}
            >
              {labels?.netProfit || "صافي اليومية (الدرج)"}
            </Typography>
            <Box
              sx={{
                width: { xs: 30, sm: 40 },
                height: { xs: 30, sm: 40 },
                borderRadius: 2.5,
                bgcolor: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: isNetPositive ? "#2563eb" : "#ea580c",
                boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
              }}
            >
              <AccountBalanceWallet sx={{ fontSize: { xs: 17, sm: 22 } }} />
            </Box>
          </Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 900,
              color: isNetPositive ? "#1e40af" : "#c2410c",
              fontSize: { xs: "1.15rem", sm: "1.45rem" },
            }}
          >
            {loading ? "..." : netProfit.toLocaleString()}{" "}
            <Typography component="span" sx={{ fontSize: "0.72rem", fontWeight: 800 }}>
              ج.م
            </Typography>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

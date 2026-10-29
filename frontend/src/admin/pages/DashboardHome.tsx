import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Alert,
} from "@mui/material";
import { CalendarTodayOutlined } from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";
import apiClient from "../../api/client";
import { getBusinessDate, formatArabicDate } from "../utils/dateUtils";
import type { DailyReportData } from "../types/expense";
import { FinancialCards } from "../components/shared/FinancialCards";
import { RevenueDialog } from "../components/shared/RevenueDialog";
import { DashboardQuickActions } from "../components/dashboard/DashboardQuickActions";
import { RecentExpensesCard } from "../components/dashboard/RecentExpensesCard";

export const DashboardHome: React.FC = () => {
  const { user } = useAuth();
  const [data, setData] = useState<DailyReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [revenueModalOpen, setRevenueModalOpen] = useState(false);

  const todayStr = getBusinessDate();

  useEffect(() => {
    fetchTodayData();
  }, []);

  const fetchTodayData = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await apiClient.get(`/api/expense/reports/daily?date=${todayStr}`);
      setData(res.data.data);
    } catch (err: any) {
      console.error("Failed to load daily report:", err);
      setError("تعذر جلب تقرير اليوم من السيرفر.");
    } finally {
      setLoading(false);
    }
  };

  const handleRevenueSuccess = (newAmount: number, notes: string) => {
    setData((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        revenue: newAmount,
        revenueNotes: notes,
        netProfit: newAmount - prev.totalExpenses,
      };
    });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 2.5, sm: 3.5 } }}>
      {/* Header with Greeting & Date */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          gap: 1.5,
        }}
      >
        <Box>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 900,
              color: "#0f172a",
              fontSize: { xs: "1.45rem", sm: "1.85rem", md: "2.1rem" },
            }}
          >
            مرحباً {user?.name || "admin"} 👋
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 700, color: "#64748b", mt: 0.3, fontSize: { xs: "0.85rem", sm: "0.95rem" } }}>
            ملخص مبيعات ومصروفات اليوم
          </Typography>
        </Box>

        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 1,
            px: 2,
            py: 0.8,
            borderRadius: 3,
            backgroundColor: "#ffffff",
            border: "1px solid #e2e8f0",
            boxShadow: "0 1px 4px rgba(0,0,0,0.03)",
          }}
        >
          <CalendarTodayOutlined sx={{ fontSize: 16, color: "#009a74" }} />
          <Typography variant="caption" sx={{ fontWeight: 800, color: "#334155", fontSize: "0.85rem" }}>
            {formatArabicDate(todayStr)}
          </Typography>
        </Box>
      </Box>

      {/* Quick Action Bar */}
      <DashboardQuickActions
        hasRevenue={Boolean(data?.revenue)}
        onOpenRevenue={() => setRevenueModalOpen(true)}
      />

      {error && (
        <Alert severity="warning" sx={{ borderRadius: 3.5, fontWeight: 700 }}>
          {error}
        </Alert>
      )}

      {/* 1. المصروفات أولاً (Recent Expenses Card) */}
      <RecentExpensesCard
        data={data}
        loading={loading}
      />

      {/* 2. تفاصيل وحساب اليومية (الدرج) */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ fontWeight: 900, color: "#0f172a", fontSize: { xs: "1.05rem", sm: "1.2rem" } }}>
            📊 تفاصيل وحساب اليومية (الدرج)
          </Typography>
          <Typography variant="caption" sx={{ fontWeight: 700, color: "#64748b" }}>
            محدث لحظياً
          </Typography>
        </Box>

        <FinancialCards
          revenue={data?.revenue ?? 0}
          dailyExpenses={data?.dailyExpenses ?? 0}
          afterClosingExpenses={data?.afterClosingExpenses ?? 0}
          netProfit={data?.netProfit ?? 0}
          loading={loading}
          onRevenueClick={() => setRevenueModalOpen(true)}
        />
      </Box>

      {/* Quick Revenue Entry Modal */}
      <RevenueDialog
        open={revenueModalOpen}
        date={todayStr}
        formattedDate={formatArabicDate(todayStr)}
        initialAmount={data?.revenue}
        initialNotes={data?.revenueNotes}
        onClose={() => setRevenueModalOpen(false)}
        onSuccess={handleRevenueSuccess}
      />
    </Box>
  );
};

export default DashboardHome;

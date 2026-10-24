import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  Button,
  IconButton,
  Alert,
  Tooltip,
} from "@mui/material";
import { ChevronRight, ChevronLeft } from "@mui/icons-material";
import apiClient from "../../api/client";
import type { MonthlyReportData } from "../types/expense";
import { FinancialCards } from "../components/shared/FinancialCards";
import { MonthlyCategoryBreakdown } from "../components/reports/MonthlyCategoryBreakdown";
import { MonthlyDaysTable } from "../components/reports/MonthlyDaysTable";

const MONTH_NAMES = [
  "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
  "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
];

export const MonthlyReportPage: React.FC = () => {
  const navigate = useNavigate();

  const now = new Date();
  const [selectedMonth, setSelectedMonth] = useState<number>(now.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState<number>(now.getFullYear());
  const [data, setData] = useState<MonthlyReportData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const shiftMonth = (delta: number) => {
    let newM = selectedMonth + delta;
    let newY = selectedYear;
    if (newM > 12) {
      newM = 1;
      newY += 1;
    } else if (newM < 1) {
      newM = 12;
      newY -= 1;
    }
    setSelectedMonth(newM);
    setSelectedYear(newY);
  };

  const fetchMonthlyReport = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await apiClient.get(
        `/api/expense/reports/monthly?month=${selectedMonth}&year=${selectedYear}`
      );
      setData(res.data.data);
    } catch (err: any) {
      console.error("Failed to load monthly report:", err);
      setError("تعذر جلب التقرير الشهري من السيرفر. يرجى التحقق من الاتصال.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMonthlyReport();
  }, [selectedMonth, selectedYear]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {/* Top Header */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "flex-start", md: "center" },
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 900, color: "text.primary" }}>
            التقرير المالي الشهري
          </Typography>
          <Typography variant="caption" sx={{ fontWeight: 700, color: "text.secondary" }}>
            متابعة إجمالي مبيعات الشهر، المصروفات التشغيلية، ومصاريف بعد التقفيل وصافي الربح
          </Typography>
        </Box>

        {/* Month Selector (< الشهر السنة >) */}
        <Card
          variant="outlined"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            px: 1.5,
            py: 0.75,
            borderRadius: 3,
            borderColor: "divider",
            bgcolor: "background.paper",
            boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
          }}
        >
          <Tooltip title="الشهر السابق">
            <IconButton size="small" onClick={() => shiftMonth(-1)} sx={{ color: "text.secondary" }}>
              <ChevronRight />
            </IconButton>
          </Tooltip>

          <Typography
            variant="body2"
            sx={{
              fontWeight: 900,
              color: "text.primary",
              minWidth: 120,
              textAlign: "center",
              userSelect: "none",
            }}
          >
            {MONTH_NAMES[selectedMonth - 1]} {selectedYear}
          </Typography>

          <Tooltip title="الشهر التالي">
            <IconButton size="small" onClick={() => shiftMonth(1)} sx={{ color: "text.secondary" }}>
              <ChevronLeft />
            </IconButton>
          </Tooltip>
        </Card>
      </Box>

      {error && (
        <Alert
          severity="error"
          sx={{ borderRadius: 3, fontWeight: 700 }}
          action={
            <Button color="inherit" size="small" onClick={fetchMonthlyReport} sx={{ fontWeight: 800 }}>
              إعادة المحاولة
            </Button>
          }
        >
          {error}
        </Alert>
      )}

      {/* 4 Financial Metric Cards */}
      <FinancialCards
        revenue={data?.totalRevenue ?? 0}
        dailyExpenses={data?.totalDailyExpenses ?? 0}
        afterClosingExpenses={data?.totalAfterClosingExpenses ?? 0}
        netProfit={data?.netProfit ?? 0}
        loading={loading}
        labels={{
          revenue: "إجمالي إيراد الشهر",
          dailyExpenses: "مصروفات الشيفتات",
          afterClosingExpenses: "مصروفات بعد التقفيل",
          netProfit: "صافي أرباح الشهر",
        }}
      />

      {/* Section 1: Expenses By Category */}
      <MonthlyCategoryBreakdown
        categories={data?.categories ?? []}
        totalExpenses={data?.totalExpenses ?? 0}
        loading={loading}
      />

      {/* Section 2: Days Breakdown Table */}
      <MonthlyDaysTable
        dailyTotals={data?.dailyTotals ?? []}
        loading={loading}
        onViewDay={(date) => navigate(`/admin/reports/daily?date=${date}`)}
      />
    </Box>
  );
};

export default MonthlyReportPage;

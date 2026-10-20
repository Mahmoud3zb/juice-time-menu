import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  LinearProgress,
  CircularProgress,
  Alert,
  Tooltip,
} from "@mui/material";
import {
  ChevronRight,
  ChevronLeft,
  AccountBalanceWallet,
  AttachMoney,
  WbSunnyOutlined,
  NightlightOutlined,
} from "@mui/icons-material";
import apiClient from "../../api/client";

interface CategoryTotal {
  categoryID: string;
  categoryName: string;
  totalAmount: number;
  expensesCount: number;
}

interface DailyTotal {
  date: string;
  revenue: number;
  dailyExpenses: number;
  afterClosingExpenses: number;
  totalAmount: number;
  expensesCount: number;
  netProfit: number;
}

interface MonthlyReportData {
  month: number;
  year: number;
  totalRevenue: number;
  totalDailyExpenses: number;
  totalAfterClosingExpenses: number;
  totalExpenses: number;
  expensesCount: number;
  netProfit: number;
  dailyTotals: DailyTotal[];
  categories: CategoryTotal[];
}

export const MonthlyReportPage: React.FC = () => {
  const navigate = useNavigate();

  const now = new Date();
  const [selectedMonth, setSelectedMonth] = useState<number>(now.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState<number>(now.getFullYear());
  const [data, setData] = useState<MonthlyReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const monthNames = [
    "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
    "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
  ];

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

  useEffect(() => {
    fetchMonthlyReport();
  }, [selectedMonth, selectedYear]);

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

  const formatArabicDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return new Intl.DateTimeFormat("ar-EG", {
        weekday: "short",
        day: "numeric",
        month: "short",
      }).format(d);
    } catch {
      return dateStr;
    }
  };

  // Color palette for category progress bars matching design
  const categoryPalette = [
    { color: "#8b5cf6", light: "#ede9fe" }, // Purple
    { color: "#3b82f6", light: "#dbeafe" }, // Blue
    { color: "#f59e0b", light: "#fef3c7" }, // Amber
    { color: "#10b981", light: "#d1fae5" }, // Emerald
    { color: "#06b6d4", light: "#cffafe" }, // Cyan
    { color: "#ef4444", light: "#fee2e2" }, // Red
    { color: "#6366f1", light: "#e0e7ff" }, // Indigo
    { color: "#f97316", light: "#ffedd5" }, // Orange
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {/* Top Header matching Screen 5 */}
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

        {/* Month Selector (< أكتوبر 2025 >) */}
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
            {monthNames[selectedMonth - 1]} {selectedYear}
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
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
          gap: 2,
        }}
      >
        {/* Card 1: Total Monthly Revenue */}
        <Card
          sx={{
            bgcolor: "#f0fdf4",
            border: "1px solid #dcfce7",
            borderRadius: 4,
            p: 2.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography variant="caption" sx={{ fontWeight: 800, color: "#16a34a", display: "block", mb: 0.5 }}>
              إجمالي إيراد الشهر
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 900, color: "#166534", lineHeight: 1.2 }}>
              {loading ? "..." : (data?.totalRevenue ?? 0).toLocaleString()}{" "}
              <Typography component="span" variant="caption" sx={{ fontWeight: 800, color: "#166534" }}>
                ج.م
              </Typography>
            </Typography>
          </Box>
          <Box
            sx={{
              width: 46,
              height: 46,
              borderRadius: 3,
              bgcolor: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#16a34a",
              boxShadow: "0 2px 8px rgba(22,163,74,0.12)",
            }}
          >
            <AttachMoney sx={{ fontSize: 24 }} />
          </Box>
        </Card>

        {/* Card 2: Total Daily Expenses */}
        <Card
          sx={{
            bgcolor: "#fff1f2",
            border: "1px solid #ffe4e6",
            borderRadius: 4,
            p: 2.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography variant="caption" sx={{ fontWeight: 800, color: "#e11d48", display: "block", mb: 0.5 }}>
              مصروفات الشيفتات
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 900, color: "#be123c", lineHeight: 1.2 }}>
              {loading ? "..." : (data?.totalDailyExpenses ?? 0).toLocaleString()}{" "}
              <Typography component="span" variant="caption" sx={{ fontWeight: 800, color: "#be123c" }}>
                ج.م
              </Typography>
            </Typography>
          </Box>
          <Box
            sx={{
              width: 46,
              height: 46,
              borderRadius: 3,
              bgcolor: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#e11d48",
              boxShadow: "0 2px 8px rgba(225,29,72,0.12)",
            }}
          >
            <WbSunnyOutlined sx={{ fontSize: 24 }} />
          </Box>
        </Card>

        {/* Card 3: After Closing Expenses */}
        <Card
          sx={{
            bgcolor: "#faf5ff",
            border: "1px solid #f3e8ff",
            borderRadius: 4,
            p: 2.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography variant="caption" sx={{ fontWeight: 800, color: "#9333ea", display: "block", mb: 0.5 }}>
              مصروفات بعد التقفيل
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 900, color: "#6b21a8", lineHeight: 1.2 }}>
              {loading ? "..." : (data?.totalAfterClosingExpenses ?? 0).toLocaleString()}{" "}
              <Typography component="span" variant="caption" sx={{ fontWeight: 800, color: "#6b21a8" }}>
                ج.م
              </Typography>
            </Typography>
          </Box>
          <Box
            sx={{
              width: 46,
              height: 46,
              borderRadius: 3,
              bgcolor: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#9333ea",
              boxShadow: "0 2px 8px rgba(147,51,234,0.12)",
            }}
          >
            <NightlightOutlined sx={{ fontSize: 24 }} />
          </Box>
        </Card>

        {/* Card 4: Net Monthly Profit */}
        <Card
          sx={{
            bgcolor: (data?.netProfit ?? 0) >= 0 ? "#eff6ff" : "#fff7ed",
            border: "1px solid",
            borderColor: (data?.netProfit ?? 0) >= 0 ? "#dbeafe" : "#ffedd5",
            borderRadius: 4,
            p: 2.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography
              variant="caption"
              sx={{ fontWeight: 800, color: (data?.netProfit ?? 0) >= 0 ? "#2563eb" : "#ea580c", display: "block", mb: 0.5 }}
            >
              صافي أرباح الشهر
            </Typography>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 900,
                color: (data?.netProfit ?? 0) >= 0 ? "#1e40af" : "#c2410c",
                lineHeight: 1.2,
              }}
            >
              {loading ? "..." : (data?.netProfit ?? 0).toLocaleString()}{" "}
              <Typography component="span" variant="caption" sx={{ fontWeight: 800 }}>
                ج.م
              </Typography>
            </Typography>
          </Box>
          <Box
            sx={{
              width: 46,
              height: 46,
              borderRadius: 3,
              bgcolor: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: (data?.netProfit ?? 0) >= 0 ? "#2563eb" : "#ea580c",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}
          >
            <AccountBalanceWallet sx={{ fontSize: 24 }} />
          </Box>
        </Card>
      </Box>

      {/* Section 1: Expenses By Category with Progress Bars matching Screen 5 */}
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
        ) : !data || data.categories.length === 0 ? (
          <Typography variant="body2" sx={{ py: 4, textAlign: "center", fontWeight: 700, color: "text.secondary" }}>
            لا توجد مصروفات مسجلة لهذا الشهر.
          </Typography>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
            {data.categories.map((cat, idx) => {
              const totalMonth = data.totalExpenses || 1;
              const percent = ((cat.totalAmount / totalMonth) * 100).toFixed(1);
              const theme = categoryPalette[idx % categoryPalette.length];

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

                  {/* Horizontal Progress Bar matching Screen 5 */}
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

      {/* Section 2: Days Breakdown Table with Full Accounting Details */}
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
          تفاصيل الأيام (الإيرادات والمصروفات وصافي كل يوم)
        </Typography>

        {loading ? (
          <Box sx={{ py: 6, display: "flex", justifyContent: "center" }}>
            <CircularProgress size={30} thickness={4} />
          </Box>
        ) : !data || data.dailyTotals.length === 0 ? (
          <Typography variant="body2" sx={{ py: 4, textAlign: "center", fontWeight: 700, color: "text.secondary" }}>
            لا توجد بيانات أيام لهذا الشهر.
          </Typography>
        ) : (
          <TableContainer component={Paper} elevation={0} sx={{ bgcolor: "transparent" }}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow sx={{ "& th": { fontWeight: 800, color: "text.secondary", fontSize: 13, borderColor: "divider" } }}>
                  <TableCell align="right">اليوم</TableCell>
                  <TableCell align="right">الإيراد</TableCell>
                  <TableCell align="right">مصروف الشيفت</TableCell>
                  <TableCell align="right">بعد التقفيل</TableCell>
                  <TableCell align="right">إجمالي المصاريف</TableCell>
                  <TableCell align="right">صافي اليوم</TableCell>
                  <TableCell align="center">التفاصيل</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.dailyTotals.map((day) => (
                  <TableRow
                    key={day.date}
                    hover
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      "& td": { borderColor: "rgba(0,0,0,0.04)", py: 1.75 },
                    }}
                  >
                    <TableCell align="right">
                      <Typography variant="body2" sx={{ fontWeight: 800, color: "text.primary" }}>
                        {formatArabicDate(day.date)}
                      </Typography>
                    </TableCell>

                    {/* Revenue */}
                    <TableCell align="right">
                      <Typography variant="body2" sx={{ fontWeight: 800, color: "success.main" }}>
                        {day.revenue.toLocaleString()} ج.م
                      </Typography>
                    </TableCell>

                    {/* Daily Shift Expenses */}
                    <TableCell align="right">
                      <Typography variant="body2" sx={{ fontWeight: 700, color: "#be123c" }}>
                        {day.dailyExpenses.toLocaleString()} ج.م
                      </Typography>
                    </TableCell>

                    {/* After Closing Expenses */}
                    <TableCell align="right">
                      <Typography variant="body2" sx={{ fontWeight: 700, color: "#7c3aed" }}>
                        {day.afterClosingExpenses.toLocaleString()} ج.م
                      </Typography>
                    </TableCell>

                    {/* Total Expenses */}
                    <TableCell align="right">
                      <Typography variant="body2" sx={{ fontWeight: 900, color: "text.primary" }}>
                        {day.totalAmount.toLocaleString()} ج.م
                      </Typography>
                    </TableCell>

                    {/* Net Day Profit */}
                    <TableCell align="right">
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 900,
                          color: day.netProfit >= 0 ? "primary.main" : "error.main",
                        }}
                      >
                        {day.netProfit.toLocaleString()} ج.م
                      </Typography>
                    </TableCell>

                    {/* Details Action Button */}
                    <TableCell align="center">
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => navigate(`/admin/reports/daily?date=${day.date}`)}
                        sx={{
                          borderRadius: 2.5,
                          fontWeight: 800,
                          fontSize: 12,
                          px: 2,
                          py: 0.5,
                        }}
                      >
                        عرض اليومية
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Card>
    </Box>
  );
};

export default MonthlyReportPage;

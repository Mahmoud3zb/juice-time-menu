import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
} from "@mui/material";
import {
  CalendarTodayOutlined,
  AccountBalanceWallet,
  ArrowBack,
  AddCircle,
  AttachMoney,
  NightlightOutlined,
  WbSunnyOutlined,
  EditNote,
  Close,
} from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";
import apiClient from "../../api/client";
import { getBusinessDate, formatArabicDate } from "../utils/dateUtils";

interface ExpenseItem {
  _id: string;
  amount: number;
  description?: string;
  expenseType?: "daily" | "after_closing";
  expenseDate: string;
  createdAt: string;
  expenseCategoryID: {
    _id: string;
    name: string;
  } | string;
}

interface DailyReportData {
  date: string;
  revenue: number;
  revenueNotes?: string;
  dailyExpenses: number;
  afterClosingExpenses: number;
  totalExpenses: number;
  expensesCount: number;
  netProfit: number;
  expenses: ExpenseItem[];
}

export const DashboardHome: React.FC = () => {
  const { user } = useAuth();
  const [data, setData] = useState<DailyReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Quick Revenue Modal State
  const [revenueModalOpen, setRevenueModalOpen] = useState(false);
  const [revenueInput, setRevenueInput] = useState("");
  const [revenueNotes, setRevenueNotes] = useState("");
  const [savingRevenue, setSavingRevenue] = useState(false);

  const todayStr = getBusinessDate();

  const normalizeDigits = (str: string) => {
    return str.replace(/[٠-٩]/g, (d) => "٠١٢٣٥٦٧٨٩".indexOf(d).toString());
  };

  const handleSaveRevenue = async () => {
    const parsed = parseFloat(normalizeDigits(revenueInput));
    if (isNaN(parsed) || parsed < 0) {
      alert("يرجى إدخال مبلغ إيراد صحيح (صفر أو أكثر)");
      return;
    }
    try {
      setSavingRevenue(true);
      await apiClient.post("/api/daily-revenue", {
        date: todayStr,
        amount: parsed,
        notes: revenueNotes,
      });
      setData((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          revenue: parsed,
          revenueNotes,
          netProfit: parsed - prev.totalExpenses,
        };
      });
      setRevenueModalOpen(false);
    } catch (err: any) {
      alert(err.response?.data?.message || "فشل حفظ الإيراد اليومي");
    } finally {
      setSavingRevenue(false);
    }
  };



  const formatTime = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return new Intl.DateTimeFormat("ar-EG", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }).format(d);
    } catch {
      return "";
    }
  };

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

  const getCategoryColor = (name: string) => {
    const colors = [
      "#f97316", "#10b981", "#3b82f6", 
      "#a855f7", "#f43f5e", "#d97706", "#06b6d4"
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash += name.charCodeAt(i);
    return colors[Math.abs(hash) % colors.length];
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
          <CalendarTodayOutlined sx={{ fontSize: 16, color: "#2563eb" }} />
          <Typography variant="caption" sx={{ fontWeight: 800, color: "#334155", fontSize: "0.85rem" }}>
            {formatArabicDate(todayStr)}
          </Typography>
        </Box>
      </Box>

      {/* Quick Action Bar for mobile and desktop */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr 1fr", sm: "auto auto auto" },
          gap: 1.5,
          p: { xs: 1.5, sm: 2 },
          borderRadius: 4,
          backgroundColor: "#ffffff",
          border: "1px solid #e2e8f0",
          boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
        }}
      >
        {/* <Button
          component={RouterLink}
          to="/admin/expenses/new"
          variant="contained"
          size="medium"
          startIcon={<AddCircle sx={{ fontSize: 19 }} />}
          sx={{
            gridColumn: { xs: "span 2", sm: "auto" },
            fontWeight: 900,
            borderRadius: 3,
            py: 1.1,
            px: 2.5,
            backgroundColor: "#2563eb",
            boxShadow: "0 2px 10px rgba(37,99,235,0.3)",
            "&:hover": { backgroundColor: "#1d4ed8" },
          }}
        >
          + إضافة مصروف جديد
        </Button> */}

        <Button
          variant="outlined"
          size="medium"
          onClick={() => {
            setRevenueInput(data?.revenue ? String(data.revenue) : "");
            setRevenueNotes(data?.revenueNotes || "");
            setRevenueModalOpen(true);
          }}
          startIcon={<AttachMoney sx={{ fontSize: 19 }} />}
          sx={{
            fontWeight: 800,
            borderRadius: 3,
            py: 1,
            px: 2,
            color: "#16a34a",
            borderColor: "#bbf7d0",
            backgroundColor: "#f0fdf4",
            "&:hover": { backgroundColor: "#dcfce7", borderColor: "#86efac" },
          }}
        >
          {data?.revenue ? "تعديل الإيراد" : "تسجيل الإيراد"}
        </Button>

        <Button
          component={RouterLink}
          to="/admin/reports/daily"
          variant="outlined"
          size="medium"
          startIcon={<CalendarTodayOutlined sx={{ fontSize: 16 }} />}
          sx={{
            fontWeight: 800,
            borderRadius: 3,
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

      {error && (
        <Alert severity="warning" sx={{ borderRadius: 3.5, fontWeight: 700 }}>
          {error}
        </Alert>
      )}

      {/* 1. المصروفات أولاً (Recent Expenses Card) */}
      <Card sx={{ borderRadius: { xs: 4, sm: 6 }, p: { xs: 1.5, sm: 3 } }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            pb: 2,
            mb: 1,
            borderBottom: "1px solid #f1f5f9",
            flexWrap: "wrap",
            gap: 1.2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 900, color: "#0f172a", fontSize: { xs: "1.1rem", sm: "1.25rem" } }}>
              أحدث المصروفات
            </Typography>
            {data && data.expensesCount > 0 && (
              <Box
                sx={{
                  px: 1.2,
                  py: 0.2,
                  borderRadius: 2,
                  backgroundColor: "#eff6ff",
                  color: "#2563eb",
                  fontWeight: 900,
                  fontSize: "0.78rem",
                }}
              >
                {data.expensesCount}
              </Box>
            )}
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Button
              component={RouterLink}
              to="/admin/expenses/new"
              variant="contained"
              size="small"
              startIcon={<AddCircle sx={{ fontSize: 16 }} />}
              sx={{
                fontWeight: 800,
                borderRadius: 2.5,
                px: 1.8,
                py: 0.65,
                backgroundColor: "#2563eb",
                fontSize: "0.82rem",
                boxShadow: "0 2px 8px rgba(37,99,235,0.25)",
                "&:hover": { backgroundColor: "#1d4ed8" },
              }}
            >
              إضافة مصروف
            </Button>

            <Button
              component={RouterLink}
              to="/admin/reports/daily"
              variant="outlined"
              size="small"
              endIcon={<ArrowBack sx={{ fontSize: 15 }} />}
              sx={{
                fontWeight: 800,
                color: "#475569",
                borderColor: "#cbd5e1",
                px: 1.5,
                py: 0.65,
                borderRadius: 2.5,
                fontSize: "0.82rem",
                "&:hover": { backgroundColor: "#f8fafc", borderColor: "#94a3b8" },
              }}
            >
              عرض الكل
            </Button>
          </Box>
        </Box>

        {loading ? (
          <Box sx={{ py: 6, display: "flex", flexDirection: "column", alignItems: "center", gap: 1.5 }}>
            <CircularProgress size={30} sx={{ color: "#2563eb" }} />
            <Typography variant="caption" sx={{ fontWeight: 700, color: "#94a3b8" }}>
              جارٍ جلب المصروفات...
            </Typography>
          </Box>
        ) : !data || data.expenses.length === 0 ? (
          <Box sx={{ py: 6, textAlign: "center" }}>
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                backgroundColor: "#eff6ff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mx: "auto",
                mb: 1.5,
                color: "#3b82f6",
              }}
            >
              <AddCircle sx={{ fontSize: 28 }} />
            </Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "#334155", mb: 0.5 }}>
              لا توجد أي مصروفات مسجلة اليوم حتى الآن
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600, color: "#94a3b8", mb: 2.5 }}>
              ابدأ بتسجيل أول مصروف للمحل اليوم
            </Typography>
            <Button
              component={RouterLink}
              to="/admin/expenses/new"
              variant="contained"
              startIcon={<AddCircle />}
              sx={{
                borderRadius: 3,
                fontWeight: 900,
                px: 2.5,
                py: 1,
              }}
            >
              إضافة مصروف جديد
            </Button>
          </Box>
        ) : (
          <TableContainer sx={{ overflowX: "auto" }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 800, color: "#64748b" }}>الوقت</TableCell>
                  <TableCell sx={{ fontWeight: 800, color: "#64748b" }}>التصنيف</TableCell>
                  <TableCell sx={{ fontWeight: 800, color: "#64748b" }}>المبلغ</TableCell>
                  <TableCell sx={{ fontWeight: 800, color: "#64748b" }}>تفاصيل</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.expenses.slice(0, 6).map((item) => {
                  const catName =
                    typeof item.expenseCategoryID === "object" && item.expenseCategoryID !== null
                      ? item.expenseCategoryID.name
                      : "مصروفات عامة";
                  const color = getCategoryColor(catName);

                  return (
                    <TableRow key={item._id} hover sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                      <TableCell sx={{ color: "#94a3b8", fontWeight: 700, fontSize: "0.78rem", whiteSpace: "nowrap" }}>
                        {formatTime(item.createdAt || item.expenseDate)}
                      </TableCell>

                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        <Box sx={{ display: "inline-flex", alignItems: "center", gap: 1 }}>
                          <Box sx={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: color }} />
                          <Typography variant="body2" sx={{ fontWeight: 800, color: "#1e293b", fontSize: "0.85rem" }}>
                            {catName}
                          </Typography>
                        </Box>
                      </TableCell>

                      <TableCell sx={{ fontWeight: 900, color: "#0f172a", whiteSpace: "nowrap", fontSize: "0.92rem" }}>
                        {item.amount.toLocaleString()}{" "}
                        <Typography component="span" variant="caption" sx={{ fontWeight: 700, color: "#64748b" }}>
                          ج.م
                        </Typography>
                      </TableCell>

                      <TableCell sx={{ color: "#475569", fontWeight: 600, fontSize: "0.82rem" }}>
                        {item.description || "—"}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Card>

      {/* 2. تفاصيل الإيراد اليومي والمصروف اليومي ومصروف بعد التقفيل */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ fontWeight: 900, color: "#0f172a", fontSize: { xs: "1.05rem", sm: "1.2rem" } }}>
            📊 تفاصيل وحساب اليومية (الدرج)
          </Typography>
          <Typography variant="caption" sx={{ fontWeight: 700, color: "#64748b" }}>
            محدث لحظياً
          </Typography>
        </Box>

        {/* 4 Financial Metric Cards in 2x2 grid on mobile */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
            gap: { xs: 1.5, sm: 2.5 },
          }}
        >
          {/* Card 1: Revenue (Interactive) */}
          <Card
            onClick={() => {
              setRevenueInput(data?.revenue ? String(data.revenue) : "");
              setRevenueNotes(data?.revenueNotes || "");
              setRevenueModalOpen(true);
            }}
            sx={{
              backgroundColor: "#f0fdf4",
              borderColor: "#dcfce7",
              borderRadius: { xs: 3.5, sm: 4 },
              p: 0.5,
              cursor: "pointer",
              transition: "all 0.2s",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 6px 16px rgba(22,163,74,0.12)",
                borderColor: "#86efac",
              },
            }}
          >
            <CardContent sx={{ p: { xs: "12px !important", sm: "16px !important" } }}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <Typography variant="caption" sx={{ fontWeight: 800, color: "#16a34a", fontSize: { xs: "0.75rem", sm: "0.85rem" } }}>
                    إيراد اليوم
                  </Typography>
                  <EditNote sx={{ fontSize: 15, color: "#16a34a", opacity: 0.8 }} />
                </Box>
                <Box sx={{ width: { xs: 30, sm: 40 }, height: { xs: 30, sm: 40 }, borderRadius: 2.5, bgcolor: "white", display: "flex", alignItems: "center", justifyContent: "center", color: "#16a34a", boxShadow: "0 2px 6px rgba(22,163,74,0.12)" }}>
                  <AttachMoney sx={{ fontSize: { xs: 18, sm: 22 } }} />
                </Box>
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 900, color: "#166534", fontSize: { xs: "1.15rem", sm: "1.45rem" } }}>
                {loading ? "..." : (data?.revenue ?? 0).toLocaleString()}{" "}
                <Typography component="span" sx={{ fontSize: "0.72rem", fontWeight: 800 }}>ج.م</Typography>
              </Typography>
            </CardContent>
          </Card>

          {/* Card 2: Daily Expenses */}
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
                <Typography variant="caption" sx={{ fontWeight: 800, color: "#e11d48", fontSize: { xs: "0.75rem", sm: "0.85rem" } }}>
                  مصروف الشيفت
                </Typography>
                <Box sx={{ width: { xs: 30, sm: 40 }, height: { xs: 30, sm: 40 }, borderRadius: 2.5, bgcolor: "white", display: "flex", alignItems: "center", justifyContent: "center", color: "#e11d48", boxShadow: "0 2px 6px rgba(225,29,72,0.12)" }}>
                  <WbSunnyOutlined sx={{ fontSize: { xs: 17, sm: 22 } }} />
                </Box>
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 900, color: "#be123c", fontSize: { xs: "1.15rem", sm: "1.45rem" } }}>
                {loading ? "..." : (data?.dailyExpenses ?? 0).toLocaleString()}{" "}
                <Typography component="span" sx={{ fontSize: "0.72rem", fontWeight: 800 }}>ج.م</Typography>
              </Typography>
            </CardContent>
          </Card>

          {/* Card 3: After Closing Expenses */}
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
                <Typography variant="caption" sx={{ fontWeight: 800, color: "#9333ea", fontSize: { xs: "0.75rem", sm: "0.85rem" } }}>
                  بعد التقفيل
                </Typography>
                <Box sx={{ width: { xs: 30, sm: 40 }, height: { xs: 30, sm: 40 }, borderRadius: 2.5, bgcolor: "white", display: "flex", alignItems: "center", justifyContent: "center", color: "#9333ea", boxShadow: "0 2px 6px rgba(147,51,234,0.12)" }}>
                  <NightlightOutlined sx={{ fontSize: { xs: 17, sm: 22 } }} />
                </Box>
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 900, color: "#6b21a8", fontSize: { xs: "1.15rem", sm: "1.45rem" } }}>
                {loading ? "..." : (data?.afterClosingExpenses ?? 0).toLocaleString()}{" "}
                <Typography component="span" sx={{ fontSize: "0.72rem", fontWeight: 800 }}>ج.م</Typography>
              </Typography>
            </CardContent>
          </Card>

          {/* Card 4: Net Day Balance */}
          <Card
            sx={{
              backgroundColor: (data?.netProfit ?? 0) >= 0 ? "#eff6ff" : "#fff7ed",
              borderColor: (data?.netProfit ?? 0) >= 0 ? "#dbeafe" : "#ffedd5",
              borderRadius: { xs: 3.5, sm: 4 },
              p: 0.5,
            }}
          >
            <CardContent sx={{ p: { xs: "12px !important", sm: "16px !important" } }}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
                <Typography variant="caption" sx={{ fontWeight: 800, color: (data?.netProfit ?? 0) >= 0 ? "#2563eb" : "#ea580c", fontSize: { xs: "0.75rem", sm: "0.85rem" } }}>
                  صافي اليومية (الدرج)
                </Typography>
                <Box sx={{ width: { xs: 30, sm: 40 }, height: { xs: 30, sm: 40 }, borderRadius: 2.5, bgcolor: "white", display: "flex", alignItems: "center", justifyContent: "center", color: (data?.netProfit ?? 0) >= 0 ? "#2563eb" : "#ea580c", boxShadow: "0 2px 6px rgba(0,0,0,0.06)" }}>
                  <AccountBalanceWallet sx={{ fontSize: { xs: 17, sm: 22 } }} />
                </Box>
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 900, color: (data?.netProfit ?? 0) >= 0 ? "#1e40af" : "#c2410c", fontSize: { xs: "1.15rem", sm: "1.45rem" } }}>
                {loading ? "..." : (data?.netProfit ?? 0).toLocaleString()}{" "}
                <Typography component="span" sx={{ fontSize: "0.72rem", fontWeight: 800 }}>ج.م</Typography>
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Quick Revenue Entry Modal right on Dashboard */}
      <Dialog
        open={revenueModalOpen}
        onClose={() => setRevenueModalOpen(false)}
        maxWidth="xs"
        fullWidth
        slotProps={{
          paper: { sx: { borderRadius: 5, p: 1 } },
        }}
      >
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pb: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
            <Box sx={{ width: 36, height: 36, borderRadius: 2.5, bgcolor: "#f0fdf4", display: "flex", alignItems: "center", justifyContent: "center", color: "#16a34a" }}>
              <AttachMoney sx={{ fontSize: 20 }} />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 900, color: "#0f172a" }}>
              {data?.revenue ? "تعديل إيراد اليوم" : "تسجيل إيراد اليوم"}
            </Typography>
          </Box>
          <IconButton size="small" onClick={() => setRevenueModalOpen(false)} sx={{ color: "#94a3b8" }}>
            <Close sx={{ fontSize: 20 }} />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ pt: 1.5 }}>
          <Typography variant="body2" sx={{ fontWeight: 600, color: "#64748b", mb: 2.5 }}>
            أدخل إجمالي مبيعات وإيراد اليوم ({formatArabicDate(todayStr)}) ليتم احتساب صافي نقدية الدرج تلقائياً:
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="مبلغ الإيراد الإجمالي (ج.م)"
              placeholder="مثال: 4500"
              value={revenueInput}
              onChange={(e) => setRevenueInput(e.target.value)}
              fullWidth
              autoFocus
              type="text"
              slotProps={{ htmlInput: { inputMode: "numeric" } }}
            />
            <TextField
              label="ملاحظات (اختياري)"
              placeholder="مثال: مبيعات صالة ودليفري"
              value={revenueNotes}
              onChange={(e) => setRevenueNotes(e.target.value)}
              fullWidth
              multiline
              rows={2}
            />
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 2, pt: 1 }}>
          <Button
            onClick={() => setRevenueModalOpen(false)}
            sx={{ fontWeight: 800, color: "#64748b" }}
          >
            إلغاء
          </Button>
          <Button
            onClick={handleSaveRevenue}
            variant="contained"
            disabled={savingRevenue}
            sx={{
              fontWeight: 900,
              borderRadius: 3,
              px: 3,
              backgroundColor: "#16a34a",
              "&:hover": { backgroundColor: "#15803d" },
            }}
          >
            {savingRevenue ? "جارٍ الحفظ..." : "حفظ الإيراد"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DashboardHome;


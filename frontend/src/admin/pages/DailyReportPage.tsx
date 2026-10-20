import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
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
  IconButton,
  Button,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Tooltip,
  Chip,
  InputAdornment,
} from "@mui/material";
import {
  ChevronRight,
  ChevronLeft,
  Delete,
  CalendarMonth,
  AttachMoney,
  AccountBalanceWallet,
  NightlightOutlined,
  WbSunnyOutlined,
  EditNote,
} from "@mui/icons-material";
import apiClient from "../../api/client";
import { getBusinessDate } from "../utils/dateUtils";

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

export const DailyReportPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialDate = searchParams.get("date") || getBusinessDate();

  const [selectedDate, setSelectedDate] = useState<string>(initialDate);
  const [data, setData] = useState<DailyReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Revenue Modal state
  const [revenueModalOpen, setRevenueModalOpen] = useState(false);
  const [revenueInput, setRevenueInput] = useState<string>("");
  const [revenueNotes, setRevenueNotes] = useState<string>("");
  const [savingRevenue, setSavingRevenue] = useState(false);

  // Delete modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [targetExpenseId, setTargetExpenseId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchReport();
    setSearchParams({ date: selectedDate }, { replace: true });
  }, [selectedDate]);

  const fetchReport = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await apiClient.get(`/api/expense/reports/daily?date=${selectedDate}`);
      const reportData: DailyReportData = res.data.data;
      setData(reportData);
      setRevenueInput(reportData.revenue > 0 ? reportData.revenue.toString() : "");
      setRevenueNotes(reportData.revenueNotes || "");
    } catch (err: any) {
      console.error("Failed to load daily report:", err);
      setError("تعذر جلب تقرير اليوم من السيرفر. يرجى التحقق من الاتصال.");
    } finally {
      setLoading(false);
    }
  };

  const shiftDate = (days: number) => {
    const current = new Date(selectedDate);
    current.setDate(current.getDate() + days);
    setSelectedDate(current.toISOString().slice(0, 10));
  };

  const formatArabicDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return new Intl.DateTimeFormat("ar-EG", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(d);
    } catch {
      return dateStr;
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
      return "—";
    }
  };

  const normalizeDigits = (str: string) => {
    return str.replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d).toString());
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
        date: selectedDate,
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

  const openDeleteDialog = (id: string) => {
    setTargetExpenseId(id);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!targetExpenseId) return;
    try {
      setDeleting(true);
      await apiClient.delete(`/api/expense/${targetExpenseId}`);
      setData((prev) => {
        if (!prev) return null;
        const deletedItem = prev.expenses.find((e) => e._id === targetExpenseId);
        const deletedAmount = deletedItem ? deletedItem.amount : 0;
        const isAfterClosing = deletedItem?.expenseType === "after_closing";
        const newDailyExp = isAfterClosing ? prev.dailyExpenses : Math.max(0, prev.dailyExpenses - deletedAmount);
        const newAfterExp = isAfterClosing ? Math.max(0, prev.afterClosingExpenses - deletedAmount) : prev.afterClosingExpenses;
        const newTotal = newDailyExp + newAfterExp;

        return {
          ...prev,
          dailyExpenses: newDailyExp,
          afterClosingExpenses: newAfterExp,
          totalExpenses: newTotal,
          expensesCount: Math.max(0, prev.expensesCount - 1),
          netProfit: prev.revenue - newTotal,
          expenses: prev.expenses.filter((e) => e._id !== targetExpenseId),
        };
      });
      setDeleteModalOpen(false);
      setTargetExpenseId(null);
    } catch (err: any) {
      alert(err.response?.data?.message || "فشل حذف المصروف");
    } finally {
      setDeleting(false);
    }
  };

  const categoryColors = [
    "#f97316", "#10b981", "#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b", "#06b6d4"
  ];
  const getCategoryColor = (name: string) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash += name.charCodeAt(i);
    return categoryColors[Math.abs(hash) % categoryColors.length];
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {/* Top Header & Date Switcher */}
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
            يومية المحل (الإيرادات والمصروفات)
          </Typography>
          <Typography variant="caption" sx={{ fontWeight: 700, color: "text.secondary" }}>
            تقفيل الحسابات، مبيعات اليوم، المصروفات التشغيلية ومصاريف بعد التقفيل
          </Typography>
        </Box>

        {/* Date Navigator & Revenue Action */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flexWrap: "wrap" }}>
          <Button
            variant="contained"
            color="success"
            disableElevation
            startIcon={<EditNote />}
            onClick={() => setRevenueModalOpen(true)}
            sx={{ borderRadius: 3, fontWeight: 900, px: 2, py: 0.8 }}
          >
            {data && data.revenue > 0 ? "تعديل إيراد اليوم" : "+ تسجيل إيراد اليوم"}
          </Button>

          <Card
            variant="outlined"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              p: 0.75,
              borderRadius: 3,
              borderColor: "divider",
              bgcolor: "background.paper",
              boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
            }}
          >
            <Tooltip title="اليوم السابق">
              <IconButton size="small" onClick={() => shiftDate(-1)} sx={{ color: "text.secondary" }}>
                <ChevronRight />
              </IconButton>
            </Tooltip>

            <TextField
              type="date"
              size="small"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              variant="standard"
              slotProps={{
                input: {
                  disableUnderline: true,
                  sx: {
                    fontWeight: 800,
                    fontSize: 14,
                    cursor: "pointer",
                    px: 1,
                  },
                },
              }}
            />

            <Typography
              variant="body2"
              sx={{
                fontWeight: 800,
                color: "text.secondary",
                display: { xs: "none", sm: "inline-block" },
                borderRight: "1px solid",
                borderColor: "divider",
                pr: 2,
                mr: 0.5,
              }}
            >
              {formatArabicDate(selectedDate)}
            </Typography>

            <Tooltip title="اليوم التالي">
              <IconButton size="small" onClick={() => shiftDate(1)} sx={{ color: "text.secondary" }}>
                <ChevronLeft />
              </IconButton>
            </Tooltip>
          </Card>
        </Box>
      </Box>

      {error && (
        <Alert
          severity="error"
          sx={{ borderRadius: 3, fontWeight: 700 }}
          action={
            <Button color="inherit" size="small" onClick={fetchReport} sx={{ fontWeight: 800 }}>
              إعادة المحاولة
            </Button>
          }
        >
          {error}
        </Alert>
      )}

      {/* 4 Financial Cards (Revenue, Daily Expense, After Closing Expense, Net Profit) */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
          gap: 2,
        }}
      >
        {/* Card 1: Daily Revenue */}
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
            <Typography variant="caption" sx={{ fontWeight: 800, color: "#16a34a", display: "block" }}>
              إيراد اليوم (المبيعات)
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 900, color: "#166534", mt: 0.5 }}>
              {loading ? "..." : (data?.revenue ?? 0).toLocaleString()}{" "}
              <Typography component="span" variant="caption" sx={{ fontWeight: 800, color: "#166534" }}>
                ج.م
              </Typography>
            </Typography>
          </Box>
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: 3,
              bgcolor: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#16a34a",
              boxShadow: "0 2px 6px rgba(22,163,74,0.12)",
            }}
          >
            <AttachMoney />
          </Box>
        </Card>

        {/* Card 2: Daily Expenses (Shift) */}
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
            <Typography variant="caption" sx={{ fontWeight: 800, color: "#e11d48", display: "block" }}>
              مصروف يومي (الشيفت)
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 900, color: "#be123c", mt: 0.5 }}>
              {loading ? "..." : (data?.dailyExpenses ?? 0).toLocaleString()}{" "}
              <Typography component="span" variant="caption" sx={{ fontWeight: 800, color: "#be123c" }}>
                ج.م
              </Typography>
            </Typography>
          </Box>
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: 3,
              bgcolor: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#e11d48",
              boxShadow: "0 2px 6px rgba(225,29,72,0.12)",
            }}
          >
            <WbSunnyOutlined />
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
            <Typography variant="caption" sx={{ fontWeight: 800, color: "#9333ea", display: "block" }}>
              مصروف بعد التقفيل
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 900, color: "#6b21a8", mt: 0.5 }}>
              {loading ? "..." : (data?.afterClosingExpenses ?? 0).toLocaleString()}{" "}
              <Typography component="span" variant="caption" sx={{ fontWeight: 800, color: "#6b21a8" }}>
                ج.م
              </Typography>
            </Typography>
          </Box>
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: 3,
              bgcolor: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#9333ea",
              boxShadow: "0 2px 6px rgba(147,51,234,0.12)",
            }}
          >
            <NightlightOutlined />
          </Box>
        </Card>

        {/* Card 4: Net Day Total (الصافي) */}
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
              sx={{ fontWeight: 800, color: (data?.netProfit ?? 0) >= 0 ? "#2563eb" : "#ea580c", display: "block" }}
            >
              صافي اليومية (الدرج)
            </Typography>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 900,
                color: (data?.netProfit ?? 0) >= 0 ? "#1e40af" : "#c2410c",
                mt: 0.5,
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
              width: 44,
              height: 44,
              borderRadius: 3,
              bgcolor: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: (data?.netProfit ?? 0) >= 0 ? "#2563eb" : "#ea580c",
              boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
            }}
          >
            <AccountBalanceWallet />
          </Box>
        </Card>
      </Box>

      {/* Main Table Card */}
      <Card
        sx={{
          borderRadius: 4,
          border: "1px solid",
          borderColor: "divider",
          boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
          p: { xs: 2, sm: 3 },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 900, color: "text.primary" }}>
            تفاصيل مصروفات اليوم ({data?.expensesCount ?? 0})
          </Typography>
        </Box>

        {loading ? (
          <Box sx={{ py: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <CircularProgress size={32} thickness={4} />
            <Typography variant="body2" sx={{ fontWeight: 700, color: "text.secondary" }}>
              جارٍ إعداد التقرير اليومي...
            </Typography>
          </Box>
        ) : !data || data.expenses.length === 0 ? (
          <Box sx={{ py: 8, textAlign: "center" }}>
            <CalendarMonth sx={{ fontSize: 52, color: "text.disabled", mb: 1 }} />
            <Typography variant="h6" sx={{ fontWeight: 800, color: "text.primary", mb: 0.5 }}>
              لا توجد مصروفات مسجلة لهذا اليوم
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 600 }}>
              اختر يوماً آخر أو أضف مصروفاً جديداً من القائمة الجانبية.
            </Typography>
          </Box>
        ) : (
          <Box>
            <TableContainer component={Paper} elevation={0} sx={{ bgcolor: "transparent" }}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow sx={{ "& th": { fontWeight: 800, color: "text.secondary", fontSize: 13, borderColor: "divider" } }}>
                    <TableCell align="right" sx={{ pr: 1, width: 40 }}>#</TableCell>
                    <TableCell align="right">التصنيف (القسم)</TableCell>
                    <TableCell align="center">نوع المصروف</TableCell>
                    <TableCell align="right">المبلغ</TableCell>
                    <TableCell align="right">التفاصيل</TableCell>
                    <TableCell align="right">الوقت</TableCell>
                    <TableCell align="center" sx={{ width: 80 }}>إجراءات</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.expenses.map((item, index) => {
                    const catName =
                      typeof item.expenseCategoryID === "object" && item.expenseCategoryID !== null
                        ? item.expenseCategoryID.name
                        : "عام";
                    const dotColor = getCategoryColor(catName);
                    const isAfterClosing = item.expenseType === "after_closing";

                    return (
                      <TableRow
                        key={item._id}
                        hover
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                          "& td": { borderColor: "rgba(0,0,0,0.04)", py: 1.75 },
                        }}
                      >
                        <TableCell align="right" sx={{ pr: 1, color: "text.disabled", fontWeight: 700, fontSize: 13 }}>
                          {index + 1}
                        </TableCell>

                        {/* Category */}
                        <TableCell align="right">
                          <Box sx={{ display: "inline-flex", alignItems: "center", gap: 1 }}>
                            <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: dotColor }} />
                            <Typography variant="body2" sx={{ fontWeight: 800, color: "text.primary" }}>
                              {catName}
                            </Typography>
                          </Box>
                        </TableCell>

                        {/* Type Chip */}
                        <TableCell align="center">
                          <Chip
                            icon={isAfterClosing ? <NightlightOutlined sx={{ fontSize: "14px !important" }} /> : <WbSunnyOutlined sx={{ fontSize: "14px !important" }} />}
                            label={isAfterClosing ? "بعد التقفيل" : "أثناء الشيفت"}
                            size="small"
                            sx={{
                              fontWeight: 800,
                              fontSize: 11,
                              bgcolor: isAfterClosing ? "#f3e8ff" : "#f1f5f9",
                              color: isAfterClosing ? "#7c3aed" : "#475569",
                              borderRadius: 2,
                            }}
                          />
                        </TableCell>

                        {/* Amount */}
                        <TableCell align="right">
                          <Typography variant="body2" sx={{ fontWeight: 900, color: "text.primary" }}>
                            {item.amount.toLocaleString()}{" "}
                            <Typography component="span" variant="caption" sx={{ fontWeight: 700, color: "text.secondary" }}>
                              ج.م
                            </Typography>
                          </Typography>
                        </TableCell>

                        {/* Description */}
                        <TableCell align="right">
                          <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 600 }}>
                            {item.description || "—"}
                          </Typography>
                        </TableCell>

                        {/* Time */}
                        <TableCell align="right">
                          <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700 }}>
                            {formatTime(item.createdAt || item.expenseDate)}
                          </Typography>
                        </TableCell>

                        {/* Actions */}
                        <TableCell align="center">
                          <Tooltip title="حذف هذا المصروف">
                            <IconButton
                              size="small"
                              onClick={() => openDeleteDialog(item._id)}
                              sx={{
                                color: "error.main",
                                "&:hover": { bgcolor: "error.lighter" },
                              }}
                            >
                              <Delete fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Bottom Summary Bar */}
            <Box
              sx={{
                mt: 4,
                pt: 2.5,
                borderTop: "2px solid",
                borderColor: "divider",
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { xs: "flex-start", sm: "center" },
                justifyContent: "space-between",
                gap: 2,
              }}
            >
              <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
                <Typography variant="body2" sx={{ fontWeight: 700, color: "text.secondary" }}>
                  المصروف اليومي: <strong style={{ color: "#be123c" }}>{(data?.dailyExpenses ?? 0).toLocaleString()} ج.م</strong>
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 700, color: "text.secondary" }}>
                  بعد التقفيل: <strong style={{ color: "#7c3aed" }}>{(data?.afterClosingExpenses ?? 0).toLocaleString()} ج.م</strong>
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 700, color: "text.secondary" }}>
                  إجمالي المصروفات: <strong style={{ color: "#1e293b" }}>{(data?.totalExpenses ?? 0).toLocaleString()} ج.م</strong>
                </Typography>
              </Box>

              <Box sx={{ textAlign: { xs: "right", sm: "left" } }}>
                <Typography variant="caption" sx={{ fontWeight: 800, color: "text.secondary", display: "block" }}>
                  صافي اليومية المتبقي
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 900,
                    color: (data?.netProfit ?? 0) >= 0 ? "success.main" : "error.main",
                  }}
                >
                  {(data?.netProfit ?? 0).toLocaleString()} ج.م
                </Typography>
              </Box>
            </Box>
          </Box>
        )}
      </Card>

      {/* Modal to Set / Update Daily Revenue */}
      <Dialog
        open={revenueModalOpen}
        onClose={() => !savingRevenue && setRevenueModalOpen(false)}
        slotProps={{ paper: { sx: { borderRadius: 4, p: 1, maxWidth: 420, width: "100%" } } }}
        dir="rtl"
      >
        <DialogTitle sx={{ fontWeight: 900, fontSize: 18 }}>
          تسجيل إيراد يوم ({formatArabicDate(selectedDate)})
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ fontWeight: 600, color: "text.secondary", mb: 2.5 }}>
            أدخل إجمالي مبيعات الدرج لليوم لحساب صافي الأرباح والنقدية تلقائياً.
          </DialogContentText>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              autoFocus
              fullWidth
              label="مبلغ الإيراد اليومي"
              type="text"
              value={revenueInput}
              onChange={(e) => setRevenueInput(normalizeDigits(e.target.value))}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Typography sx={{ fontWeight: 900, color: "text.secondary" }}>ج.م</Typography>
                    </InputAdornment>
                  ),
                },
              }}
            />
            <TextField
              fullWidth
              multiline
              rows={2}
              label="ملاحظات (اختياري)"
              placeholder="مثال: مبيعات شفت الصباح + المساء"
              value={revenueNotes}
              onChange={(e) => setRevenueNotes(e.target.value)}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
          <Button
            onClick={() => setRevenueModalOpen(false)}
            disabled={savingRevenue}
            variant="outlined"
            sx={{ borderRadius: 3, fontWeight: 800 }}
          >
            إلغاء
          </Button>
          <Button
            onClick={handleSaveRevenue}
            disabled={savingRevenue}
            variant="contained"
            color="success"
            disableElevation
            sx={{ borderRadius: 3, fontWeight: 900, px: 3 }}
          >
            {savingRevenue ? "جارٍ الحفظ..." : "حفظ الإيراد"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirmation Dialog for Deleting Expense */}
      <Dialog
        open={deleteModalOpen}
        onClose={() => !deleting && setDeleteModalOpen(false)}
        slotProps={{ paper: { sx: { borderRadius: 4, p: 1, minWidth: 320 } } }}
      >
        <DialogTitle sx={{ fontWeight: 900, fontSize: 18 }}>تأكيد حذف المصروف</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ fontWeight: 600, color: "text.secondary" }}>
            هل أنت متأكد من رغبتك في حذف هذا المصروف؟ سيتم خصمه فوراً وتعديل صافي اليومية.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
          <Button
            onClick={() => setDeleteModalOpen(false)}
            disabled={deleting}
            variant="outlined"
            sx={{ borderRadius: 3, fontWeight: 800 }}
          >
            إلغاء
          </Button>
          <Button
            onClick={handleConfirmDelete}
            disabled={deleting}
            variant="contained"
            color="error"
            disableElevation
            sx={{ borderRadius: 3, fontWeight: 900 }}
          >
            {deleting ? "جارٍ الحذف..." : "تأكيد الحذف"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DailyReportPage;

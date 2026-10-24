import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  Button,
  TextField,
  IconButton,
  Tooltip,
  Alert,
} from "@mui/material";
import {
  ChevronRight,
  ChevronLeft,
  EditNote,
  Download,
} from "@mui/icons-material";
import apiClient from "../../api/client";
import { getBusinessDate } from "../utils/dateUtils";
import type { DailyReportData } from "../types/expense";
import { FinancialCards } from "../components/shared/FinancialCards";
import { RevenueDialog } from "../components/shared/RevenueDialog";
import { DeleteConfirmDialog } from "../components/shared/DeleteConfirmDialog";
import { DailyExpenseTable } from "../components/reports/DailyExpenseTable";
import { DailyReportExportModal } from "../components/reports/DailyReportExportModal";

export const DailyReportPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dateFromUrl = searchParams.get("date");
  const [selectedDate, setSelectedDate] = useState<string>(dateFromUrl || getBusinessDate());

  // Sync state when URL query parameter changes
  useEffect(() => {
    if (dateFromUrl && dateFromUrl !== selectedDate) {
      setSelectedDate(dateFromUrl);
    }
  }, [dateFromUrl]);

  const handleDateChange = (newDate: string) => {
    setSelectedDate(newDate);
    setSearchParams({ date: newDate });
  };

  const [data, setData] = useState<DailyReportData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Revenue Modal
  const [revenueModalOpen, setRevenueModalOpen] = useState(false);

  // Export Sheet Modal (Image & PDF)
  const [exportModalOpen, setExportModalOpen] = useState(false);

  // Delete Expense Modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [targetExpenseId, setTargetExpenseId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const formatArabicDate = (dateStr: string) => {
    try {
      const [y, m, d] = dateStr.split("-").map(Number);
      const dateObj = new Date(y, m - 1, d);
      return new Intl.DateTimeFormat("ar-EG", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(dateObj);
    } catch {
      return dateStr;
    }
  };

  useEffect(() => {
    fetchReport();
  }, [selectedDate]);

  const fetchReport = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await apiClient.get(`/api/expense/reports/daily?date=${selectedDate}`);
      setData(res.data.data);
    } catch (err: any) {
      console.error("Failed to load daily report:", err);
      setError("تعذر جلب تقرير اليوم المحدد من السيرفر.");
    } finally {
      setLoading(false);
    }
  };

  const shiftDate = (days: number) => {
    const [y, m, d] = selectedDate.split("-").map(Number);
    const dateObj = new Date(y, m - 1, d);
    dateObj.setDate(dateObj.getDate() + days);
    const newY = dateObj.getFullYear();
    const newM = String(dateObj.getMonth() + 1).padStart(2, "0");
    const newD = String(dateObj.getDate()).padStart(2, "0");
    handleDateChange(`${newY}-${newM}-${newD}`);
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

  const handleDeleteExpense = async () => {
    if (!targetExpenseId) return;
    try {
      setDeleting(true);
      await apiClient.delete(`/api/expense/${targetExpenseId}`);
      if (data) {
        const deleted = data.expenses.find((e) => e._id === targetExpenseId);
        const deletedAmt = deleted ? deleted.amount : 0;
        const deletedType = deleted?.expenseType || "daily";

        const newExpenses = data.expenses.filter((e) => e._id !== targetExpenseId);
        const newTotalExpenses = data.totalExpenses - deletedAmt;
        const newDailyExpenses = deletedType === "daily" ? data.dailyExpenses - deletedAmt : data.dailyExpenses;
        const newAfterClosingExpenses = deletedType === "after_closing" ? data.afterClosingExpenses - deletedAmt : data.afterClosingExpenses;

        setData({
          ...data,
          expenses: newExpenses,
          expensesCount: newExpenses.length,
          totalExpenses: newTotalExpenses,
          dailyExpenses: newDailyExpenses,
          afterClosingExpenses: newAfterClosingExpenses,
          netProfit: data.revenue - newTotalExpenses,
        });
      }
      setDeleteModalOpen(false);
      setTargetExpenseId(null);
    } catch (err: any) {
      alert(err.response?.data?.message || "فشل حذف المصروف");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 2.5, sm: 3.5 } }}>
      {/* Top Header & Date Navigation */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
        }}
      >
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 900, color: "#0f172a", fontSize: { xs: "1.35rem", sm: "1.75rem" } }}>
            تقرير اليومية ونقدية الدرج 📋
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 600, color: "text.secondary", mt: 0.5 }}>
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

          <Button
            variant="outlined"
            startIcon={<Download />}
            onClick={() => setExportModalOpen(true)}
            sx={{
              borderRadius: 3,
              fontWeight: 900,
              px: 2,
              py: 0.8,
              borderColor: "divider",
              color: "#0f172a",
              bgcolor: "background.paper",
              "&:hover": {
                bgcolor: "grey.50",
                borderColor: "primary.main",
                color: "primary.main",
              },
            }}
          >
            تصدير الشيت (صورة / PDF) 📥
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
              onChange={(e) => handleDateChange(e.target.value)}
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

      {/* 4 Financial Cards */}
      <FinancialCards
        revenue={data?.revenue ?? 0}
        dailyExpenses={data?.dailyExpenses ?? 0}
        afterClosingExpenses={data?.afterClosingExpenses ?? 0}
        netProfit={data?.netProfit ?? 0}
        loading={loading}
        onRevenueClick={() => setRevenueModalOpen(true)}
      />

      {/* Detailed Expenses Table Component */}
      <DailyExpenseTable
        expenses={data?.expenses ?? []}
        totalExpenses={data?.totalExpenses ?? 0}
        loading={loading}
        onDeleteClick={(id) => {
          setTargetExpenseId(id);
          setDeleteModalOpen(true);
        }}
      />

      {/* Revenue Entry / Update Modal */}
      <RevenueDialog
        open={revenueModalOpen}
        date={selectedDate}
        formattedDate={formatArabicDate(selectedDate)}
        initialAmount={data?.revenue}
        initialNotes={data?.revenueNotes}
        onClose={() => setRevenueModalOpen(false)}
        onSuccess={handleRevenueSuccess}
      />

      {/* Confirmation Dialog for Deleting Expense */}
      <DeleteConfirmDialog
        open={deleteModalOpen}
        title="تأكيد حذف المصروف"
        content="هل أنت متأكد من رغبتك في حذف هذا المصروف؟ سيتم خصمه فوراً وتعديل صافي اليومية."
        loading={deleting}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteExpense}
      />

      {/* Export Daily Sheet Modal (Image & PDF) */}
      <DailyReportExportModal
        open={exportModalOpen}
        onClose={() => setExportModalOpen(false)}
        data={data}
        date={selectedDate}
        formattedDate={formatArabicDate(selectedDate)}
      />
    </Box>
  );
};

export default DailyReportPage;

import React from "react";
import { Link as RouterLink } from "react-router-dom";
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
  Button,
  CircularProgress,
} from "@mui/material";
import { AddCircle, ArrowBack } from "@mui/icons-material";
import type { DailyReportData } from "../../types/expense";

interface RecentExpensesCardProps {
  data: DailyReportData | null;
  loading: boolean;
}

export const RecentExpensesCard: React.FC<RecentExpensesCardProps> = ({
  data,
  loading,
}) => {
  const getCategoryColor = (name: string) => {
    const colors = [
      "#f97316", "#10b981", "#3b82f6", 
      "#a855f7", "#f43f5e", "#d97706", "#06b6d4"
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash += name.charCodeAt(i);
    return colors[Math.abs(hash) % colors.length];
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

  return (
    <Card sx={{ borderRadius: 2, p: { xs: 1.5, sm: 3 } }}>
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
                backgroundColor: "#e6f5f1",
                color: "#009a74",
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
              borderRadius: 1.5,
              px: 1.8,
              py: 0.65,
              backgroundColor: "#009a74",
              fontSize: "0.82rem",
              boxShadow: "0 2px 8px rgba(0,154,116,0.25)",
              "&:hover": { backgroundColor: "#008262" },
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
              borderRadius: 1.5,
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
          <CircularProgress size={30} sx={{ color: "#009a74" }} />
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
              backgroundColor: "#e6f5f1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 1.5,
              color: "#009a74",
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
              borderRadius: 1.5,
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
  );
};

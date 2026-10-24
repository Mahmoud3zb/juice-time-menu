import React from "react";
import {
  Card,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import type { MonthlyDailyTotal } from "../../types/expense";

interface MonthlyDaysTableProps {
  dailyTotals: MonthlyDailyTotal[];
  loading: boolean;
  onViewDay: (date: string) => void;
}

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

export const MonthlyDaysTable: React.FC<MonthlyDaysTableProps> = ({
  dailyTotals,
  loading,
  onViewDay,
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
        تفاصيل الأيام (الإيرادات والمصروفات وصافي كل يوم)
      </Typography>

      {loading ? (
        <Box sx={{ py: 6, display: "flex", justifyContent: "center" }}>
          <CircularProgress size={30} thickness={4} />
        </Box>
      ) : dailyTotals.length === 0 ? (
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
              {dailyTotals.map((day) => (
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
                      onClick={() => onViewDay(day.date)}
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
  );
};

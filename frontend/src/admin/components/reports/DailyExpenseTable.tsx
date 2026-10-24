import React from "react";
import {
  Box,
  Card,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import {
  CalendarMonth,
  Delete,
  NightlightOutlined,
  WbSunnyOutlined,
} from "@mui/icons-material";
import type { ExpenseItem } from "../../types/expense";

export interface DailyExpenseTableProps {
  expenses: ExpenseItem[];
  totalExpenses: number;
  loading?: boolean;
  onDeleteClick?: (id: string) => void;
}

export const DailyExpenseTable: React.FC<DailyExpenseTableProps> = ({
  expenses,
  totalExpenses,
  loading = false,
  onDeleteClick,
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
      return "—";
    }
  };

  return (
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
          تفاصيل مصروفات اليوم ({expenses.length})
        </Typography>
      </Box>

      {loading ? (
        <Box sx={{ py: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
          <CircularProgress size={32} thickness={4} />
          <Typography variant="body2" sx={{ fontWeight: 700, color: "text.secondary" }}>
            جارٍ إعداد التقرير اليومي...
          </Typography>
        </Box>
      ) : expenses.length === 0 ? (
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
                  {onDeleteClick && <TableCell align="center" sx={{ width: 80 }}>إجراءات</TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {expenses.map((item, index) => {
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
                          icon={
                            isAfterClosing ? (
                              <NightlightOutlined sx={{ fontSize: "14px !important" }} />
                            ) : (
                              <WbSunnyOutlined sx={{ fontSize: "14px !important" }} />
                            )
                          }
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
                      {onDeleteClick && (
                        <TableCell align="center">
                          <Tooltip title="حذف هذا المصروف">
                            <IconButton
                              size="small"
                              onClick={() => onDeleteClick(item._id)}
                              sx={{
                                color: "error.main",
                                "&:hover": { bgcolor: "error.lighter" },
                              }}
                            >
                              <Delete fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      )}
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
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 700, color: "text.secondary" }}>
              إجمالي مصاريف اليوم ({expenses.length} حركة)
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 900, color: "text.primary" }}>
              {totalExpenses.toLocaleString()}{" "}
              <Typography component="span" variant="caption" sx={{ fontWeight: 800, color: "text.secondary" }}>
                ج.م
              </Typography>
            </Typography>
          </Box>
        </Box>
      )}
    </Card>
  );
};

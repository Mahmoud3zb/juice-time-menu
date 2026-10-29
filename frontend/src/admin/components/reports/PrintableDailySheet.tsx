import { forwardRef } from "react";
import { Box, Typography } from "@mui/material";
import type { DailyReportData } from "../../types/expense";

interface PrintableDailySheetProps {
  data: DailyReportData | null;
  formattedDate: string;
  nowTime: string;
}

export const PrintableDailySheet = forwardRef<HTMLDivElement, PrintableDailySheetProps>(
  ({ data, formattedDate, nowTime }, ref) => {
    const formatExpenseTime = (dateStr: string) => {
      try {
        const d = new Date(dateStr);
        return new Intl.DateTimeFormat("ar-EG", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }).format(d);
      } catch {
        return "";
      }
    };

    return (
      <Box
        ref={ref}
        sx={{
          width: "100%",
          maxWidth: 620,
          bgcolor: "#ffffff",
          p: { xs: 3, sm: 4 },
          borderRadius: 4,
          border: "1px solid #e2e8f0",
          boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
          color: "#0f172a",
          fontFamily: "inherit",
          position: "relative",
        }}
      >
        {/* Header */}
        <Box sx={{ textAlign: "center", pb: 2.5, borderBottom: "2px solid #0f172a" }}>
          <Typography variant="h5" sx={{ fontWeight: 900, color: "#0f172a", letterSpacing: 0.5 }}>
            🥤 عصير تايم - Juice Time
          </Typography>
          <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "#475569", mt: 0.5 }}>
            شيت التقفيل المالي لنقدية الدرج
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 1.5,
              px: 1,
              bgcolor: "#f8fafc",
              py: 0.75,
              borderRadius: 2,
              border: "1px dashed #cbd5e1",
            }}
          >
            <Typography variant="caption" sx={{ fontWeight: 800, color: "#334155" }}>
              اليوم والتاريخ: <strong>{formattedDate}</strong>
            </Typography>
            <Typography variant="caption" sx={{ fontWeight: 800, color: "#64748b" }}>
              وقت الاستخراج: {nowTime}
            </Typography>
          </Box>
        </Box>

        {/* Financial Summary Box */}
        <Box
          sx={{
            my: 2.5,
            p: 2,
            bgcolor: "#f0fdf4",
            border: "2px solid #86efac",
            borderRadius: 3,
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
          }}
        >
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1.5 }}>
            <Box sx={{ bgcolor: "#ffffff", p: 1.5, borderRadius: 2, border: "1px solid #dcfce7" }}>
              <Typography variant="caption" sx={{ fontWeight: 800, color: "#16a34a", display: "block" }}>
                إجمالي إيراد اليوم
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 900, color: "#166534" }}>
                {(data?.revenue ?? 0).toLocaleString()} <Typography component="span" variant="caption" sx={{ fontWeight: 800 }}>ج.م</Typography>
              </Typography>
            </Box>

            <Box sx={{ bgcolor: "#ffffff", p: 1.5, borderRadius: 2, border: "1px solid #ffe4e6" }}>
              <Typography variant="caption" sx={{ fontWeight: 800, color: "#e11d48", display: "block" }}>
                إجمالي المصروفات
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 900, color: "#be123c" }}>
                {(data?.totalExpenses ?? 0).toLocaleString()} <Typography component="span" variant="caption" sx={{ fontWeight: 800 }}>ج.م</Typography>
              </Typography>
            </Box>
          </Box>

          {/* Net Cash Handover */}
          <Box
            sx={{
              bgcolor: (data?.netProfit ?? 0) >= 0 ? "#166534" : "#991b1b",
              color: "#ffffff",
              p: 1.5,
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 900 }}>
              💵 صافي نقدية الدرج للتسليم (العهدة):
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 900 }}>
              {(data?.netProfit ?? 0).toLocaleString()} ج.م
            </Typography>
          </Box>

          {/* Sub totals */}
          <Box sx={{ display: "flex", justifyContent: "space-between", px: 1, pt: 0.5 }}>
            <Typography variant="caption" sx={{ fontWeight: 700, color: "#475569" }}>
              * مصروف الشيفت: <strong>{(data?.dailyExpenses ?? 0).toLocaleString()} ج.م</strong>
            </Typography>
            <Typography variant="caption" sx={{ fontWeight: 700, color: "#475569" }}>
              * مصروف بعد التقفيل: <strong>{(data?.afterClosingExpenses ?? 0).toLocaleString()} ج.م</strong>
            </Typography>
          </Box>
        </Box>

        {/* Expenses Detailed Table */}
        <Typography variant="subtitle2" sx={{ fontWeight: 900, color: "#0f172a", mb: 1 }}>
          بيان تفاصيل المصروفات ({data?.expensesCount ?? 0} عملية):
        </Typography>

        {(!data || data.expenses.length === 0) ? (
          <Box sx={{ py: 3, textAlign: "center", bgcolor: "#f8fafc", borderRadius: 2, border: "1px dashed #cbd5e1" }}>
            <Typography variant="body2" sx={{ fontWeight: 700, color: "#64748b" }}>
              لم يتم تسجيل أي مصروفات في هذا اليوم.
            </Typography>
          </Box>
        ) : (
          <Box sx={{ border: "1px solid #cbd5e1", borderRadius: 2, overflow: "hidden", mb: 2 }}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "35px 120px 80px 1fr 85px 65px",
                bgcolor: "#f1f5f9",
                p: 1,
                fontWeight: 900,
                fontSize: 11,
                borderBottom: "1px solid #cbd5e1",
                color: "#334155",
              }}
            >
              <Box>م</Box>
              <Box>القسم</Box>
              <Box>التوقيت</Box>
              <Box>البيان / التفاصيل</Box>
              <Box sx={{ textAlign: "left" }}>المبلغ</Box>
              <Box sx={{ textAlign: "center" }}>الوقت</Box>
            </Box>

            {data.expenses.map((item, idx) => {
              const catName = typeof item.expenseCategoryID === "object"
                ? item.expenseCategoryID?.name
                : "عام";
              const isAfterClosing = item.expenseType === "after_closing";

              return (
                <Box
                  key={item._id}
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "35px 120px 80px 1fr 85px 65px",
                    p: 1,
                    fontSize: 11,
                    borderBottom: idx < data.expenses.length - 1 ? "1px solid #f1f5f9" : "none",
                    bgcolor: idx % 2 === 0 ? "#ffffff" : "#fafafa",
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ fontWeight: 800, color: "#64748b" }}>{idx + 1}</Box>
                  <Box sx={{ fontWeight: 800, color: "#0f172a" }}>{catName}</Box>
                  <Box>
                    <Box
                      component="span"
                      sx={{
                        px: 0.75,
                        py: 0.2,
                        borderRadius: 1,
                        fontSize: 10,
                        fontWeight: 800,
                        bgcolor: isAfterClosing ? "#f3e8ff" : "#e6f5f1",
                        color: isAfterClosing ? "#7c3aed" : "#007a5c",
                      }}
                    >
                      {isAfterClosing ? "تقفيل" : "شيفت"}
                    </Box>
                  </Box>
                  <Box sx={{ color: "#475569", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {item.description || "—"}
                  </Box>
                  <Box sx={{ fontWeight: 900, color: "#be123c", textAlign: "left" }}>
                    {item.amount.toLocaleString()} ج.م
                  </Box>
                  <Box sx={{ fontSize: 10, color: "#94a3b8", textAlign: "center" }}>
                    {formatExpenseTime(item.createdAt)}
                  </Box>
                </Box>
              );
            })}
          </Box>
        )}

        {/* Notes if any */}
        {data?.revenueNotes && (
          <Box sx={{ my: 1.5, p: 1.25, bgcolor: "#f8fafc", borderRadius: 2, border: "1px dashed #cbd5e1" }}>
            <Typography variant="caption" sx={{ fontWeight: 800, color: "#334155" }}>
              ملاحظات اليومية:
            </Typography>
            <Typography variant="caption" sx={{ display: "block", color: "#64748b", mt: 0.25 }}>
              {data.revenueNotes}
            </Typography>
          </Box>
        )}

        {/* Signatures & Handover */}
        <Box
          sx={{
            mt: 3,
            pt: 2,
            borderTop: "1px solid #e2e8f0",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 3,
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="caption" sx={{ fontWeight: 800, color: "#475569" }}>
              توقيع مسؤول الشيفت (الكاشير):
            </Typography>
            <Box sx={{ height: 35, borderBottom: "1px dotted #94a3b8", mt: 1 }} />
          </Box>

          <Box sx={{ textAlign: "center" }}>
            <Typography variant="caption" sx={{ fontWeight: 800, color: "#475569" }}>
              توقيع المستلم / إدارة المحل:
            </Typography>
            <Box sx={{ height: 35, borderBottom: "1px dotted #94a3b8", mt: 1 }} />
          </Box>
        </Box>

        {/* Footer watermark */}
        <Typography variant="caption" sx={{ display: "block", textAlign: "center", color: "#cbd5e1", mt: 2, fontSize: 9 }}>
          نظام عصير تايم لإدارة المصروفات ونقدية الدرج
        </Typography>
      </Box>
    );
  }
);

PrintableDailySheet.displayName = "PrintableDailySheet";

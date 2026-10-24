import React, { useRef, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Button,
  IconButton,
  CircularProgress,
  Alert,
} from "@mui/material";
import {
  Close,
  Image as ImageIcon,
  PictureAsPdf,
  ContentCopy,
  CheckCircle,
} from "@mui/icons-material";
import { toPng, toBlob } from "html-to-image";
import jsPDF from "jspdf";
import type { DailyReportData } from "../../types/expense";

interface DailyReportExportModalProps {
  open: boolean;
  onClose: () => void;
  data: DailyReportData | null;
  date: string;
  formattedDate: string;
}

export const DailyReportExportModal: React.FC<DailyReportExportModalProps> = ({
  open,
  onClose,
  data,
  date,
  formattedDate,
}) => {
  const sheetRef = useRef<HTMLDivElement>(null);
  const [downloadingImg, setDownloadingImg] = useState(false);
  const [downloadingPdf, setDownloadingPdf] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const nowTime = new Intl.DateTimeFormat("ar-EG", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(new Date());

  const handleDownloadImage = async () => {
    if (!sheetRef.current) return;
    try {
      setDownloadingImg(true);
      setErrorMsg(null);
      const dataUrl = await toPng(sheetRef.current, {
        pixelRatio: 2,
        cacheBust: true,
        backgroundColor: "#ffffff",
      });

      const link = document.createElement("a");
      link.download = `شيت_يومية_عصير_تايم_${date}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Error generating image:", err);
      setErrorMsg("تعذر إنشاء الصورة، يرجى المحاولة مجدداً.");
    } finally {
      setDownloadingImg(false);
    }
  };

  const handleDownloadPdf = async () => {
    if (!sheetRef.current) return;
    try {
      setDownloadingPdf(true);
      setErrorMsg(null);
      const dataUrl = await toPng(sheetRef.current, {
        pixelRatio: 2,
        cacheBust: true,
        backgroundColor: "#ffffff",
      });

      const img = new Image();
      img.src = dataUrl;
      img.onload = () => {
        const imgWidth = img.width;
        const imgHeight = img.height;

        // Create PDF sized exactly to the sheet proportions
        const pdf = new jsPDF({
          orientation: imgHeight > imgWidth ? "portrait" : "landscape",
          unit: "px",
          format: [imgWidth, imgHeight],
        });

        pdf.addImage(dataUrl, "PNG", 0, 0, imgWidth, imgHeight, undefined, "FAST");
        pdf.save(`شيت_يومية_عصير_تايم_${date}.pdf`);
        setDownloadingPdf(false);
      };
    } catch (err) {
      console.error("Error generating PDF:", err);
      setErrorMsg("تعذر إنشاء ملف الـ PDF، يرجى المحاولة مجدداً.");
      setDownloadingPdf(false);
    }
  };

  const handleCopyImage = async () => {
    if (!sheetRef.current) return;
    try {
      setErrorMsg(null);
      const blob = await toBlob(sheetRef.current, {
        pixelRatio: 2,
        cacheBust: true,
        backgroundColor: "#ffffff",
      });

      if (!blob) throw new Error("Blob conversion failed");

      if (navigator.clipboard && window.ClipboardItem) {
        await navigator.clipboard.write([
          new ClipboardItem({ "image/png": blob }),
        ]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } else {
        // Fallback: download
        handleDownloadImage();
      }
    } catch (err) {
      console.error("Clipboard copy error:", err);
      setErrorMsg("المتصفح لا يدعم النسخ المباشر، يمكنك تحميل الصورة واستخدامها.");
    }
  };

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
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: 5,
            p: 1,
            maxHeight: "92vh",
            bgcolor: "#f8fafc",
          },
        },
      }}
      dir="rtl"
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontWeight: 900,
          fontSize: "1.2rem",
          pb: 1,
        }}
      >
        <span>معاينة وتصدير شيت تقفيل اليومية 📋</span>
        <IconButton size="small" onClick={onClose} sx={{ color: "text.secondary" }}>
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: { xs: 1, sm: 2 } }}>
        {errorMsg && (
          <Alert severity="error" sx={{ mb: 2, borderRadius: 3, fontWeight: 700 }}>
            {errorMsg}
          </Alert>
        )}

        {/* Scrollable Container containing the crisp printable sheet */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            overflowX: "auto",
            py: 1,
          }}
        >
          {/* THE SHEET CANVAS TO BE EXPORTED */}
          <Box
            ref={sheetRef}
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
                            bgcolor: isAfterClosing ? "#f3e8ff" : "#dbeafe",
                            color: isAfterClosing ? "#7c3aed" : "#1d4ed8",
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
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2, pt: 1, gap: 1, flexWrap: "wrap", justifyContent: "space-between" }}>
        <Button
          onClick={onClose}
          sx={{ borderRadius: 3, fontWeight: 800, color: "#64748b" }}
        >
          إغلاق
        </Button>

        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          {/* Copy Image Button */}
          <Button
            variant="outlined"
            onClick={handleCopyImage}
            startIcon={copied ? <CheckCircle color="success" /> : <ContentCopy />}
            sx={{ borderRadius: 3, fontWeight: 800 }}
          >
            {copied ? "تم نسخ الصورة! ✅" : "نسخ الصورة لواتساب"}
          </Button>

          {/* Download Image Button */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleDownloadImage}
            disabled={downloadingImg}
            startIcon={downloadingImg ? <CircularProgress size={18} color="inherit" /> : <ImageIcon />}
            sx={{ borderRadius: 3, fontWeight: 900, px: 2 }}
          >
            {downloadingImg ? "جارٍ التحميل..." : "تحميل كصورة (PNG) 🖼️"}
          </Button>

          {/* Download PDF Button */}
          <Button
            variant="contained"
            color="secondary"
            onClick={handleDownloadPdf}
            disabled={downloadingPdf}
            startIcon={downloadingPdf ? <CircularProgress size={18} color="inherit" /> : <PictureAsPdf />}
            sx={{
              borderRadius: 3,
              fontWeight: 900,
              px: 2,
              bgcolor: "#7c3aed",
              "&:hover": { bgcolor: "#6d28d9" },
            }}
          >
            {downloadingPdf ? "جارٍ التوليد..." : "تحميل كـ PDF 📄"}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

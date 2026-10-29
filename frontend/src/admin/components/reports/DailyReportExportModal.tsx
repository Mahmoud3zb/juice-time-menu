import React, { useRef, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
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
import { PrintableDailySheet } from "./PrintableDailySheet";

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
        handleDownloadImage();
      }
    } catch (err) {
      console.error("Clipboard copy error:", err);
      setErrorMsg("المتصفح لا يدعم النسخ المباشر، يمكنك تحميل الصورة واستخدامها.");
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
          <PrintableDailySheet
            ref={sheetRef}
            data={data}
            formattedDate={formattedDate}
            nowTime={nowTime}
          />
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

export default DailyReportExportModal;

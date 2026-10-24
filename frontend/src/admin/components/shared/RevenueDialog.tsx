import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { AttachMoney, Close } from "@mui/icons-material";
import { apiClient, isAuthError, getErrorMessage } from "../../../api/client";

export interface RevenueDialogProps {
  open: boolean;
  date: string;
  formattedDate: string;
  initialAmount?: number;
  initialNotes?: string;
  onClose: () => void;
  onSuccess: (amount: number, notes: string) => void;
}

export const RevenueDialog: React.FC<RevenueDialogProps> = ({
  open,
  date,
  formattedDate,
  initialAmount,
  initialNotes = "",
  onClose,
  onSuccess,
}) => {
  const [revenueInput, setRevenueInput] = useState("");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) {
      setRevenueInput(initialAmount !== undefined && initialAmount > 0 ? String(initialAmount) : "");
      setNotes(initialNotes || "");
    }
  }, [open, initialAmount, initialNotes]);

  const normalizeDigits = (str: string) => {
    return str.replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d).toString());
  };

  const handleSave = async () => {
    const parsed = parseFloat(normalizeDigits(revenueInput));
    if (isNaN(parsed) || parsed < 0) {
      alert("يرجى إدخال مبلغ إيراد صحيح (صفر أو أكثر)");
      return;
    }

    try {
      setSaving(true);
      await apiClient.post("/api/daily-revenue", {
        date,
        amount: parsed,
        notes,
      });
      onSuccess(parsed, notes);
      onClose();
    } catch (err: unknown) {
      if (isAuthError(err)) return;
      alert(getErrorMessage(err, "فشل حفظ الإيراد اليومي"));
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      slotProps={{
        paper: { sx: { borderRadius: 4.5, p: 1 } },
      }}
    >
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pb: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: 2.5,
              bgcolor: "#f0fdf4",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#16a34a",
            }}
          >
            <AttachMoney sx={{ fontSize: 20 }} />
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 900, color: "#0f172a", fontSize: "1.1rem" }}>
            {initialAmount ? "تعديل إيراد اليوم" : "تسجيل إيراد اليوم"}
          </Typography>
        </Box>
        <IconButton size="small" onClick={onClose} sx={{ color: "#94a3b8" }}>
          <Close sx={{ fontSize: 20 }} />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 1.5 }}>
        <Typography variant="body2" sx={{ fontWeight: 600, color: "#64748b", mb: 2.5 }}>
          أدخل إجمالي مبيعات وإيراد اليوم ({formattedDate}) لاحتساب صافي نقدية الدرج تلقائياً:
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="مبلغ الإيراد الإجمالي (ج.م)"
            placeholder="مثال: 4500"
            value={revenueInput}
            onChange={(e) => setRevenueInput(e.target.value)}
            fullWidth
            autoFocus
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Typography sx={{ fontWeight: 900, color: "text.secondary", fontSize: "0.85rem" }}>
                      ج.م
                    </Typography>
                  </InputAdornment>
                ),
              },
              htmlInput: { inputMode: "numeric" },
            }}
          />

          <TextField
            label="ملاحظات (اختياري)"
            placeholder="مثال: مبيعات شفت الصباح + المساء"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            fullWidth
            multiline
            rows={2}
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2, pt: 1, gap: 1 }}>
        <Button onClick={onClose} disabled={saving} sx={{ fontWeight: 800, color: "#64748b" }}>
          إلغاء
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          disabled={saving}
          sx={{
            fontWeight: 900,
            borderRadius: 3,
            px: 3,
            backgroundColor: "#16a34a",
            "&:hover": { backgroundColor: "#15803d" },
          }}
        >
          {saving ? "جارٍ الحفظ..." : "حفظ الإيراد"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

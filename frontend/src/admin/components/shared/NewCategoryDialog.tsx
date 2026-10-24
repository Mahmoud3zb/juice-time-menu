import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { apiClient, isAuthError, getErrorMessage } from "../../../api/client";
import type { ExpenseCategory } from "../../types/expense";

interface NewCategoryDialogProps {
  open: boolean;
  onClose: () => void;
  onCategoryCreated: (category: ExpenseCategory) => void;
}

export const NewCategoryDialog: React.FC<NewCategoryDialogProps> = ({
  open,
  onClose,
  onCategoryCreated,
}) => {
  const [newCatName, setNewCatName] = useState("");
  const [addingCat, setAddingCat] = useState(false);

  const handleCreate = async () => {
    const trimmed = newCatName.trim();
    if (!trimmed || trimmed.length < 3) {
      alert("اسم التصنيف يجب أن يكون 3 أحرف على الأقل");
      return;
    }

    try {
      setAddingCat(true);
      const res = await apiClient.post("/api/expense-category", {
        name: trimmed,
        isActive: true,
      });
      const created = res.data.data;
      onCategoryCreated(created);
      setNewCatName("");
      onClose();
    } catch (err: unknown) {
      if (isAuthError(err)) return;
      alert(getErrorMessage(err, "فشل إضافة التصنيف"));
    } finally {
      setAddingCat(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      slotProps={{ paper: { sx: { borderRadius: 5, p: 1, maxWidth: 440, width: "100%" } } }}
      dir="rtl"
    >
      <DialogTitle sx={{ fontWeight: 900, fontSize: "1.2rem", pb: 1 }}>
        إضافة تصنيف مصروفات جديد
      </DialogTitle>
      <DialogContent>
        <Typography variant="body2" sx={{ color: "#64748b", fontWeight: 600, mb: 3 }}>
          مثل: شحن كهربا محل، طلبات محل، فواتير إنترنت، سلف...
        </Typography>
        <TextField
          autoFocus
          fullWidth
          placeholder="اسم التصنيف (3 أحرف على الأقل)"
          value={newCatName}
          onChange={(e) => setNewCatName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleCreate();
            }
          }}
        />
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
        <Button
          onClick={onClose}
          sx={{ borderRadius: 3, fontWeight: 800, color: "#64748b" }}
        >
          إلغاء
        </Button>
        <Button
          variant="contained"
          onClick={handleCreate}
          disabled={addingCat}
          sx={{ borderRadius: 3, fontWeight: 900, px: 3 }}
        >
          {addingCat ? "جارٍ الحفظ..." : "إضافة القسم"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

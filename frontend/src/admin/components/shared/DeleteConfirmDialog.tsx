import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

export interface DeleteConfirmDialogProps {
  open: boolean;
  title?: string;
  content?: string;
  loading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteConfirmDialog: React.FC<DeleteConfirmDialogProps> = ({
  open,
  title = "تأكيد الحذف",
  content = "هل أنت متأكد من رغبتك في حذف هذا العنصر؟ لا يمكن التراجع عن هذه العملية.",
  loading = false,
  onClose,
  onConfirm,
}) => {
  return (
    <Dialog
      open={open}
      onClose={() => !loading && onClose()}
      slotProps={{ paper: { sx: { borderRadius: 4, p: 1, minWidth: 320 } } }}
    >
      <DialogTitle sx={{ fontWeight: 900, fontSize: 18, color: "#0f172a" }}>
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ fontWeight: 600, color: "text.secondary" }}>
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
        <Button
          onClick={onClose}
          disabled={loading}
          variant="outlined"
          sx={{ borderRadius: 3, fontWeight: 800 }}
        >
          إلغاء
        </Button>
        <Button
          onClick={onConfirm}
          disabled={loading}
          variant="contained"
          color="error"
          sx={{ borderRadius: 3, fontWeight: 900, px: 3 }}
        >
          {loading ? "جارٍ الحذف..." : "نعم، حذف"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

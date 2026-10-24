import React from "react";
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Switch,
  Chip,
  Tooltip,
} from "@mui/material";
import { Check, Close, Category, Edit } from "@mui/icons-material";
import type { ExpenseCategory } from "../../types/expense";

interface CategoryListItemProps {
  cat: ExpenseCategory;
  isEditing: boolean;
  editName: string;
  onEditNameChange: (val: string) => void;
  onStartEdit: (cat: ExpenseCategory) => void;
  onSaveEdit: (id: string) => void;
  onCancelEdit: () => void;
  onToggleActive: (cat: ExpenseCategory) => void;
}

export const CategoryListItem: React.FC<CategoryListItemProps> = ({
  cat,
  isEditing,
  editName,
  onEditNameChange,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onToggleActive,
}) => {
  return (
    <Box
      sx={{
        py: 1.75,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
      }}
    >
      {isEditing ? (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, flex: 1 }}>
          <TextField
            size="small"
            autoFocus
            value={editName}
            onChange={(e) => onEditNameChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                onSaveEdit(cat._id);
              } else if (e.key === "Escape") {
                onCancelEdit();
              }
            }}
            sx={{ flex: 1, maxWidth: 300 }}
            slotProps={{
              input: {
                sx: { borderRadius: 2.5, fontWeight: 700, fontSize: 13 },
              },
            }}
          />
          <IconButton
            size="small"
            color="success"
            onClick={() => onSaveEdit(cat._id)}
            sx={{ bgcolor: "#dcfce7" }}
          >
            <Check fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            color="inherit"
            onClick={onCancelEdit}
            sx={{ bgcolor: "grey.100" }}
          >
            <Close fontSize="small" />
          </IconButton>
        </Box>
      ) : (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flex: 1 }}>
          <Category sx={{ color: "primary.main", fontSize: 20 }} />
          <Typography variant="body2" sx={{ fontWeight: 800, color: "text.primary" }}>
            {cat.name}
          </Typography>
          <Chip
            label={cat.isActive ? "نشط" : "معطل"}
            size="small"
            sx={{
              fontWeight: 800,
              fontSize: 11,
              height: 22,
              bgcolor: cat.isActive ? "#ecfdf5" : "grey.100",
              color: cat.isActive ? "#059669" : "text.secondary",
            }}
          />
        </Box>
      )}

      {/* Actions (Toggle active & edit) */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Tooltip title={cat.isActive ? "تعطيل التصنيف" : "تفعيل التصنيف"}>
          <Switch
            size="small"
            checked={cat.isActive}
            onChange={() => onToggleActive(cat)}
            color="primary"
          />
        </Tooltip>

        {!isEditing && (
          <Tooltip title="تعديل الاسم">
            <IconButton
              size="small"
              onClick={() => onStartEdit(cat)}
              sx={{ color: "text.secondary", "&:hover": { color: "primary.main" } }}
            >
              <Edit fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
      </Box>
    </Box>
  );
};

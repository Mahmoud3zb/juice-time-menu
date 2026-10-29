import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  TextField,
  Button,
  CircularProgress,
  Divider,
  Alert,
} from "@mui/material";
import { AddCircle } from "@mui/icons-material";
import apiClient from "../../api/client";
import type { ExpenseCategory } from "../types/expense";
import { CategoryListItem } from "../components/settings/CategoryListItem";

export const SettingsPage: React.FC = () => {
  const [categories, setCategories] = useState<ExpenseCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState("");
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [actionError, setActionError] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get("/api/expense-category");
      setCategories(res.data.data || []);
    } catch (err: any) {
      console.error("Error loading categories:", err);
      setActionError("فشل تحميل قائمة التصنيفات.");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || newName.trim().length < 3) {
      alert("الاسم يجب أن يكون 3 أحرف على الأقل");
      return;
    }
    try {
      setAdding(true);
      setActionError(null);
      const res = await apiClient.post("/api/expense-category", {
        name: newName.trim(),
        isActive: true,
      });
      setCategories((prev) => [...prev, res.data.data]);
      setNewName("");
    } catch (err: any) {
      setActionError(err.response?.data?.message || "فشل إضافة التصنيف");
    } finally {
      setAdding(false);
    }
  };

  const handleToggleActive = async (cat: ExpenseCategory) => {
    try {
      setActionError(null);
      const res = await apiClient.put(`/api/expense-category/${cat._id}`, {
        isActive: !cat.isActive,
      });
      setCategories((prev) =>
        prev.map((c) => (c._id === cat._id ? res.data.data : c))
      );
    } catch (err: any) {
      setActionError("فشل تحديث حالة التصنيف");
    }
  };

  const handleStartEdit = (cat: ExpenseCategory) => {
    setEditingId(cat._id);
    setEditName(cat.name);
  };

  const handleSaveEdit = async (id: string) => {
    if (!editName.trim() || editName.trim().length < 3) {
      alert("الاسم يجب أن يكون 3 أحرف على الأقل");
      return;
    }
    try {
      setActionError(null);
      const res = await apiClient.put(`/api/expense-category/${id}`, {
        name: editName.trim(),
      });
      setCategories((prev) =>
        prev.map((c) => (c._id === id ? res.data.data : c))
      );
      setEditingId(null);
    } catch (err: any) {
      setActionError("فشل حفظ التعديل");
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", display: "flex", flexDirection: "column", gap: 3 }}>
      {/* Title */}
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 900, color: "text.primary" }}>
          إعدادات النظام وأقسام المصروفات
        </Typography>
        <Typography variant="caption" sx={{ fontWeight: 700, color: "text.secondary" }}>
          إدارة تصنيفات المصروفات، تفعيلها أو تعطيلها وتعديل أسمائها
        </Typography>
      </Box>

      {actionError && (
        <Alert severity="error" sx={{ borderRadius: 1.5, fontWeight: 700 }}>
          {actionError}
        </Alert>
      )}

      {/* Add New Category Card */}
      <Card
        sx={{
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
          boxShadow: "0 2px 12px rgba(0,0,0,0.03)",
          p: 3,
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "text.primary", mb: 2 }}>
          إضافة تصنيف جديد
        </Typography>

        <Box component="form" onSubmit={handleAdd} sx={{ display: "flex", gap: 2 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="مثال: صيانة معدات، فواتير إنترنت، سلف عمال..."
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            disabled={adding}
          />
          <Button
            type="submit"
            variant="contained"
            disabled={adding || !newName.trim()}
            startIcon={!adding && <AddCircle />}
            sx={{
              borderRadius: 1.5,
              fontWeight: 900,
              px: 3,
              whiteSpace: "nowrap",
              minWidth: 130,
            }}
          >
            {adding ? "جارٍ الإضافة..." : "إضافة القسم"}
          </Button>
        </Box>
      </Card>

      {/* Categories List Card */}
      <Card
        sx={{
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
          boxShadow: "0 2px 12px rgba(0,0,0,0.03)",
          p: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2.5 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "text.primary" }}>
            التصنيفات الحالية ({categories.length})
          </Typography>
        </Box>

        {loading ? (
          <Box sx={{ py: 6, display: "flex", justifyContent: "center" }}>
            <CircularProgress size={30} thickness={4} />
          </Box>
        ) : categories.length === 0 ? (
          <Typography variant="body2" sx={{ py: 4, textAlign: "center", fontWeight: 700, color: "text.secondary" }}>
            لا توجد تصنيفات حالياً. يمكنك إضافة أول تصنيف بالأعلى.
          </Typography>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            {categories.map((cat, index) => (
              <React.Fragment key={cat._id}>
                <CategoryListItem
                  cat={cat}
                  isEditing={editingId === cat._id}
                  editName={editName}
                  onEditNameChange={setEditName}
                  onStartEdit={handleStartEdit}
                  onSaveEdit={handleSaveEdit}
                  onCancelEdit={() => setEditingId(null)}
                  onToggleActive={handleToggleActive}
                />
                {index < categories.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </Box>
        )}
      </Card>
    </Box>
  );
};

export default SettingsPage;

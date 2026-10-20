import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  TextField,
  Button,
  IconButton,
  Switch,
  Chip,
  CircularProgress,
  Divider,
  Alert,
  Tooltip,
} from "@mui/material";
import {
  AddCircle,
  Edit,
  Check,
  Close,
  Category,
} from "@mui/icons-material";
import apiClient from "../../api/client";

interface ExpenseCategory {
  _id: string;
  name: string;
  isActive: boolean;
}

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
      setActionError("فشل تعديل اسم التصنيف");
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", display: "flex", flexDirection: "column", gap: 3.5 }}>
      {/* Title */}
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 900, color: "text.primary" }}>
          إعدادات تصنيفات المصروفات
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 600, color: "text.secondary", mt: 0.5 }}>
          إدارة وتعديل أقسام الصرف اليومي والشهري للمحل
        </Typography>
      </Box>

      {actionError && (
        <Alert severity="error" sx={{ borderRadius: 3, fontWeight: 700 }} onClose={() => setActionError(null)}>
          {actionError}
        </Alert>
      )}

      {/* Add New Category Card */}
      <Card
        sx={{
          borderRadius: 4,
          border: "1px solid",
          borderColor: "divider",
          boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
          p: 3,
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "text.primary", mb: 2 }}>
          إضافة تصنيف جديد
        </Typography>

        <Box component="form" onSubmit={handleAdd} sx={{ display: "flex", gap: 1.5, flexWrap: { xs: "wrap", sm: "nowrap" } }}>
          <TextField
            fullWidth
            size="small"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="مثال: صيانة معدات، فواتير إنترنت، خامات إضافية"
            variant="outlined"
            slotProps={{
              input: {
                sx: { borderRadius: 3, bgcolor: "grey.50", fontWeight: 700, fontSize: 14 },
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            disableElevation
            disabled={adding}
            startIcon={adding ? <CircularProgress size={16} color="inherit" /> : <AddCircle />}
            sx={{
              borderRadius: 3,
              fontWeight: 900,
              px: 3,
              py: 1,
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            {adding ? "جارٍ الإضافة..." : "إضافة تصنيف"}
          </Button>
        </Box>
      </Card>

      {/* Categories List Card */}
      <Card
        sx={{
          borderRadius: 4,
          border: "1px solid",
          borderColor: "divider",
          boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
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
                <Box
                  sx={{
                    py: 1.75,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 2,
                  }}
                >
                  {editingId === cat._id ? (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, flex: 1 }}>
                      <TextField
                        size="small"
                        autoFocus
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
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
                        onClick={() => handleSaveEdit(cat._id)}
                        sx={{ bgcolor: "#dcfce7" }}
                      >
                        <Check fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="inherit"
                        onClick={() => setEditingId(null)}
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
                        onChange={() => handleToggleActive(cat)}
                        color="primary"
                      />
                    </Tooltip>

                    {editingId !== cat._id && (
                      <Tooltip title="تعديل الاسم">
                        <IconButton
                          size="small"
                          onClick={() => handleStartEdit(cat)}
                          sx={{ color: "text.secondary", "&:hover": { color: "primary.main" } }}
                        >
                          <Edit fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Box>
                </Box>
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

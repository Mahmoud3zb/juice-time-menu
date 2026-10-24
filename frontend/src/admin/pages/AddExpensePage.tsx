import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  TextField,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputAdornment,
  Alert,
  CircularProgress,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import { SaveOutlined, Add, WbSunnyOutlined, NightlightOutlined } from "@mui/icons-material";
import { apiClient, isAuthError, getErrorMessage } from "../../api/client";
import { getBusinessDate } from "../utils/dateUtils";
import type { ExpenseCategory, ExpenseType } from "../types/expense";
import { NewCategoryDialog } from "../components/shared/NewCategoryDialog";

export const AddExpensePage: React.FC = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState<ExpenseCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [expenseType, setExpenseType] = useState<ExpenseType>("daily");
  const [description, setDescription] = useState<string>("");
  const [expenseDate, setExpenseDate] = useState<string>(getBusinessDate());

  const [loadingCategories, setLoadingCategories] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showAddCatModal, setShowAddCatModal] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoadingCategories(true);
      const res = await apiClient.get("/api/expense-category");
      const catList: any[] = res.data.data || [];
      const activeList = catList.filter((c) => c.isActive !== false);
      setCategories(activeList);
      if (activeList.length > 0 && !selectedCategory) {
        setSelectedCategory(activeList[0]._id);
      }
    } catch (err: any) {
      console.error("Failed to load expense categories:", err);
      setError("تعذر تحميل تصنيفات المصروفات من السيرفر.");
    } finally {
      setLoadingCategories(false);
    }
  };

  const normalizeDigits = (str: string) => {
    return str.replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d).toString());
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value;
    const normalized = normalizeDigits(rawVal);
    setAmount(normalized);
  };

  const handleCategoryCreated = (newCat: ExpenseCategory) => {
    setCategories((prev) => [...prev, newCat]);
    setSelectedCategory(newCat._id);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const parsedAmount = parseFloat(normalizeDigits(amount));
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setError("يرجى إدخال مبلغ صحيح أكبر من صفر.");
      return;
    }

    if (!selectedCategory) {
      setError("يرجى اختيار تصنيف المصروف.");
      return;
    }

    try {
      setSubmitting(true);
      await apiClient.post("/api/expense", {
        expenseCategoryID: selectedCategory,
        amount: parsedAmount,
        expenseType,
        description: description.trim(),
        expenseDate,
      });

      setSuccess("تم تسجيل وحفظ المصروف بنجاح! ✅");
      setAmount("");
      setDescription("");

      const isToday = expenseDate === getBusinessDate();
      setTimeout(() => {
        if (isToday) {
          navigate("/admin");
        } else {
          navigate(`/admin/reports/daily?date=${expenseDate}`);
        }
      }, 800);
    } catch (err: unknown) {
      if (isAuthError(err)) return;
      console.error("Error adding expense:", err);
      setError(
        getErrorMessage(err, "تعذر حفظ المصروف. يرجى التأكد من البيانات والمحاولة مجدداً.")
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 680, mx: "auto", py: 2 }}>
      {/* Page Title */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 900, color: "#0f172a" }}>
          إضافة مصروف جديد
        </Typography>
        <Typography variant="body2" sx={{ color: "#64748b", fontWeight: 600, mt: 0.5 }}>
          قم بتحديد نوع المصروف (أثناء اليوم أو بعد التقفيل) وإدخال المبلغ والتفاصيل
        </Typography>
      </Box>

      {/* Main Form Card */}
      <Card
        sx={{
          borderRadius: 6,
          p: { xs: 3, sm: 4.5 },
          backgroundColor: "#ffffff",
          boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.05)",
          border: "1px solid #f1f5f9",
        }}
      >
        {error && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: 3.5, fontWeight: 700 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 3, borderRadius: 3.5, fontWeight: 700 }}>
            {success}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {/* Field 0: Expense Type Toggle (Daily vs After Closing) */}
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "#334155", mb: 1 }}>
              نوع وتوقيت المصروف
            </Typography>
            <ToggleButtonGroup
              value={expenseType}
              exclusive
              onChange={(_, val) => val && setExpenseType(val)}
              fullWidth
              sx={{
                borderRadius: 3.5,
                p: 0.5,
                bgcolor: "grey.100",
                "& .MuiToggleButton-root": {
                  border: "none",
                  borderRadius: 3,
                  py: 1.2,
                  fontWeight: 800,
                  fontSize: "0.9rem",
                  gap: 1,
                  "&.Mui-selected": {
                    bgcolor: expenseType === "daily" ? "#2563eb" : "#7c3aed",
                    color: "#ffffff",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    "&:hover": {
                      bgcolor: expenseType === "daily" ? "#1d4ed8" : "#6d28d9",
                    },
                  },
                },
              }}
            >
              <ToggleButton value="daily">
                <WbSunnyOutlined sx={{ fontSize: 18 }} />
                <span>مصروف يومي (أثناء الشيفت)</span>
              </ToggleButton>
              <ToggleButton value="after_closing">
                <NightlightOutlined sx={{ fontSize: 18 }} />
                <span>مصروف بعد التقفيل (ليلي)</span>
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>

          {/* Field 1: Category */}
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "#334155" }}>
                تصنيف المصروف (القسم)
              </Typography>
              <Button
                size="small"
                onClick={() => setShowAddCatModal(true)}
                startIcon={<Add sx={{ fontSize: 16 }} />}
                sx={{ fontSize: "0.75rem", fontWeight: 800, color: "#2563eb", p: 0.5 }}
              >
                قسم جديد
              </Button>
            </Box>

            <FormControl fullWidth>
              <Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                displayEmpty
                disabled={loadingCategories}
                sx={{ borderRadius: 3.5, fontWeight: 800 }}
              >
                <MenuItem value="" disabled>
                  <em>اختر نوع المصروف</em>
                </MenuItem>
                {categories.map((cat) => (
                  <MenuItem key={cat._id} value={cat._id} sx={{ fontWeight: 700 }}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Field 2: Amount */}
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "#334155", mb: 1 }}>
              المبلغ
            </Typography>
            <TextField
              fullWidth
              required
              type="text"
              placeholder="مثال: 150 أو 500"
              value={amount}
              onChange={handleAmountChange}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Typography sx={{ fontWeight: 900, color: "#64748b", fontSize: "0.9rem" }}>
                        ج.م
                      </Typography>
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Box>

          {/* Field 3: Details */}
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "#334155", mb: 1 }}>
              تفاصيل إضافية <Typography component="span" variant="caption" sx={{ color: "#94a3b8" }}>(اختياري)</Typography>
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={3}
              placeholder="مثال: شحن كارت كهرباء المحل أو حساب تاجر الفاكهة"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Box>

          {/* Field 4: Expense Date */}
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "#334155", mb: 1 }}>
              تاريخ المصروف
            </Typography>
            <TextField
              fullWidth
              required
              type="date"
              value={expenseDate}
              onChange={(e) => setExpenseDate(e.target.value)}
            />
          </Box>

          {/* Submit Button */}
          <Button
            fullWidth
            type="submit"
            variant="contained"
            disabled={submitting}
            startIcon={!submitting && <SaveOutlined />}
            sx={{
              py: 1.8,
              mt: 1,
              borderRadius: 3.5,
              fontWeight: 900,
              fontSize: "1rem",
              background: expenseType === "after_closing"
                ? "linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)"
                : "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
              boxShadow: expenseType === "after_closing"
                ? "0 10px 25px -5px rgba(124, 58, 237, 0.4)"
                : "0 10px 25px -5px rgba(37, 99, 235, 0.4)",
            }}
          >
            {submitting ? (
              <CircularProgress size={24} sx={{ color: "#ffffff" }} />
            ) : (
              expenseType === "after_closing" ? "حفظ كمصروف بعد التقفيل" : "حفظ المصروف اليومي"
            )}
          </Button>
        </Box>
      </Card>

      {/* Dialog to Add New Category */}
      <NewCategoryDialog
        open={showAddCatModal}
        onClose={() => setShowAddCatModal(false)}
        onCategoryCreated={handleCategoryCreated}
      />
    </Box>
  );
};

export default AddExpensePage;

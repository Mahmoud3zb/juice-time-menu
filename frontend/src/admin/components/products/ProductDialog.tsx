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
  MenuItem,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { apiClient, getErrorMessage, isAuthError } from "../../../api/client";
import type { ProductItem } from "../../types/product";
import { ProductImageUpload } from "./ProductImageUpload";
import { ProductPricingSection, type PriceType } from "./ProductPricingSection";

interface ProductDialogProps {
  open: boolean;
  onClose: () => void;
  product?: ProductItem | null;
  onSuccess: (saved: ProductItem, isNew: boolean) => void;
  existingCategories: string[];
}

export const ProductDialog: React.FC<ProductDialogProps> = ({
  open,
  onClose,
  product,
  onSuccess,
  existingCategories,
}) => {
  const isEditing = Boolean(product && product._id);

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [priceType, setPriceType] = useState<PriceType>("cup_liter");
  const [cupPrice, setCupPrice] = useState("");
  const [literPrice, setLiterPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (product) {
      setName(product.name || "");
      setType(product.type || "");
      setCupPrice(product.prices?.cup ? String(product.prices.cup) : "");
      setLiterPrice(product.prices?.liter ? String(product.prices.liter) : "");
      setDescription(product.description || "");
      setImagePreview(product.imageurl || "");
      setImageFile(null);

      if (product.priceType) {
        setPriceType(product.priceType);
      } else if (product.type === "قهوة" || product.type === "ركن القهوة") {
        setPriceType("single_double");
      } else if (!product.prices?.liter) {
        setPriceType("single_price");
      } else {
        setPriceType("cup_liter");
      }
    } else {
      setName("");
      setType(existingCategories[0] || "عصائر فريش");
      setPriceType("cup_liter");
      setCupPrice("");
      setLiterPrice("");
      setDescription("");
      setImagePreview("");
      setImageFile(null);
    }
    setError(null);
  }, [product, open, existingCategories]);

  const normalizeDigits = (str: string) => {
    return str.replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d).toString());
  };

  /**
   * Optimizes & converts Facebook / gallery images (JFIF, AVIF, HEIC, high-res)
   * to a clean, fast-loading, standard JPEG under 500KB.
   */
  const optimizeImageFile = async (file: File): Promise<File> => {
    return new Promise((resolve) => {
      try {
        const img = new Image();
        const objectUrl = URL.createObjectURL(file);

        img.onload = () => {
          URL.revokeObjectURL(objectUrl);
          const maxDim = 1200;
          let width = img.width;
          let height = img.height;

          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            resolve(file);
            return;
          }

          ctx.drawImage(img, 0, 0, width, height);
          canvas.toBlob(
            (blob) => {
              if (blob) {
                const cleanName = (file.name || "image").replace(/\.[^/.]+$/, "") + ".jpg";
                const optimized = new File([blob], cleanName, { type: "image/jpeg" });
                resolve(optimized);
              } else {
                resolve(file);
              }
            },
            "image/jpeg",
            0.88
          );
        };

        img.onerror = () => {
          URL.revokeObjectURL(objectUrl);
          resolve(file);
        };

        img.src = objectUrl;
      } catch {
        resolve(file);
      }
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedName = name.trim();
    if (!trimmedName) {
      setError("يرجى إدخال اسم المشروب.");
      return;
    }

    const parsedCup = parseFloat(normalizeDigits(cupPrice));
    if (isNaN(parsedCup) || parsedCup <= 0) {
      setError(
        priceType === "single_double"
          ? "يرجى إدخال سعر صحيح للسنجل."
          : priceType === "single_price"
          ? "يرجى إدخال سعر صحيح للمنتج."
          : "يرجى إدخال سعر صحيح للكوب."
      );
      return;
    }

    const trimmedType = type.trim();
    if (!trimmedType) {
      setError("يرجى تحديد قسم المنتج.");
      return;
    }

    try {
      setSaving(true);

      const formData = new FormData();
      formData.append("name", trimmedName);
      formData.append("type", trimmedType);
      formData.append("priceType", priceType);
      formData.append("prices.cup", String(parsedCup));

      if (priceType !== "single_price") {
        const parsedLiter = parseFloat(normalizeDigits(literPrice));
        if (!isNaN(parsedLiter) && parsedLiter > 0) {
          formData.append("prices.liter", String(parsedLiter));
        } else {
          formData.append("prices.liter", "");
        }
      } else {
        formData.append("prices.liter", "");
      }

      if (description.trim()) {
        formData.append("description", description.trim());
      }

      if (imageFile) {
        const preparedImage = await optimizeImageFile(imageFile);
        formData.append("image", preparedImage);
      }

      let response;
      if (isEditing && product) {
        response = await apiClient.put(`/api/products/${product._id}`, formData, {
          headers: { "Content-Type": undefined },
        });
      } else {
        response = await apiClient.post("/api/products", formData, {
          headers: { "Content-Type": undefined },
        });
      }

      const savedData = response.data?.data || response.data?.product;
      onSuccess(savedData, !isEditing);
      onClose();
    } catch (err: unknown) {
      if (isAuthError(err)) return;
      console.error("Save product error:", err);
      setError(getErrorMessage(err, "تعذر حفظ المنتج. يرجى المحاولة مجدداً."));
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      slotProps={{ paper: { sx: { borderRadius: 2.5, p: 1 } } }}
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
        <span>{isEditing ? "تعديل الصنف والأسعار ✏️" : "إضافة صنف جديد للمنيو 🥤"}</span>
        <IconButton size="small" onClick={onClose} sx={{ color: "text.secondary" }}>
          <Close />
        </IconButton>
      </DialogTitle>

      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2.5, pt: 1 }}>
          {error && (
            <Typography variant="body2" sx={{ color: "error.main", fontWeight: 700 }}>
              {error}
            </Typography>
          )}

          {/* Image Upload Row */}
          <ProductImageUpload
            imagePreview={imagePreview}
            onImageChange={handleImageChange}
          />

          {/* Name */}
          <Box>
            <Typography variant="caption" sx={{ fontWeight: 800, color: "text.secondary", mb: 0.5, display: "block" }}>
              اسم المشروب *
            </Typography>
            <TextField
              fullWidth
              size="small"
              required
              placeholder="مثال: عصير مانجو فريش"
              value={name}
              onChange={(e) => setName(e.target.value)}
              slotProps={{ input: { sx: { borderRadius: 1.5, fontWeight: 800 } } }}
            />
          </Box>

          {/* Category / Type */}
          <Box>
            <Typography variant="caption" sx={{ fontWeight: 800, color: "text.secondary", mb: 0.5, display: "block" }}>
              القسم (التصنيف) *
            </Typography>
            <TextField
              select
              fullWidth
              size="small"
              required
              value={type}
              onChange={(e) => setType(e.target.value)}
              slotProps={{ input: { sx: { borderRadius: 1.5, fontWeight: 800 } } }}
            >
              {existingCategories.map((cat) => (
                <MenuItem key={cat} value={cat} sx={{ fontWeight: 700 }}>
                  {cat}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          {/* Pricing Mode and Dynamic Fields */}
          <ProductPricingSection
            priceType={priceType}
            onPriceTypeChange={setPriceType}
            cupPrice={cupPrice}
            onCupPriceChange={(val) => setCupPrice(normalizeDigits(val))}
            literPrice={literPrice}
            onLiterPriceChange={(val) => setLiterPrice(normalizeDigits(val))}
          />

          {/* Description */}
          <Box>
            <Typography variant="caption" sx={{ fontWeight: 800, color: "text.secondary", mb: 0.5, display: "block" }}>
              وصف المشروب (اختياري)
            </Typography>
            <TextField
              fullWidth
              size="small"
              multiline
              rows={2}
              placeholder="مثال: عصير مانجو طبيعي فريش 100% بدون أي إضافات"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              slotProps={{ input: { sx: { borderRadius: 1.5, fontWeight: 700 } } }}
            />
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
          <Button onClick={onClose} sx={{ borderRadius: 1.5, fontWeight: 800, color: "#64748b" }}>
            إلغاء
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={saving}
            sx={{
              borderRadius: 1.5,
              fontWeight: 900,
              px: 3.5,
              py: 0.8,
              boxShadow: "0 4px 14px rgba(0, 154, 116, 0.25)",
            }}
          >
            {saving ? <CircularProgress size={22} color="inherit" /> : isEditing ? "حفظ التعديلات" : "إضافة الصنف"}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default ProductDialog;

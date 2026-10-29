import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  CircularProgress,
  Alert,
  Tooltip,
} from "@mui/material";
import { Add, Refresh, RestaurantMenu, SwapVert } from "@mui/icons-material";
import { apiClient, getErrorMessage, isAuthError } from "../../api/client";
import type { ProductItem } from "../types/product";
import { ProductDialog } from "../components/products/ProductDialog";
import { DeleteConfirmDialog } from "../components/shared/DeleteConfirmDialog";
import { AdminProductCard } from "../components/products/AdminProductCard";
import { ProductCategoryBar } from "../components/products/ProductCategoryBar";
import { CategoryOrderModal } from "../components/products/CategoryOrderModal";
import { categories } from "../../data";
import { type SeasonPreset, SEASON_INFO, type MenuConfigData } from "../../utils/seasonPresets";

export const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Active Menu Season & Order
  const [activeSeason, setActiveSeason] = useState<SeasonPreset>("default");
  const [categoryOrder, setCategoryOrder] = useState<string[]>([]);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("الكل");

  // Dialogs
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);

  const [categoryOrderModalOpen, setCategoryOrderModalOpen] = useState(false);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [targetProduct, setTargetProduct] = useState<ProductItem | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchMenuConfig();
  }, []);

  const fetchMenuConfig = async () => {
    try {
      const res = await apiClient.get<{ data: MenuConfigData }>("/api/menu-config");
      const config = res.data?.data;
      if (config) {
        if (config.activeSeason) setActiveSeason(config.activeSeason);
        if (config.categoryOrder) setCategoryOrder(config.categoryOrder);
      }
    } catch (err: unknown) {
      console.warn("Could not fetch menu config:", err);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await apiClient.get("/api/products?limit=500");
      setProducts(res.data?.data || []);
    } catch (err: unknown) {
      if (isAuthError(err)) return;
      console.error("Fetch products error:", err);
      setError(getErrorMessage(err, "تعذر تحميل قائمة المنتجات من السيرفر."));
    } finally {
      setLoading(false);
    }
  };

  // Distinct Categories list sorted according to active season/order
  const categoriesList = useMemo(() => {
    const cats = new Set<string>();
    products.forEach((p) => {
      if (p.type) cats.add(p.type.trim());
    });
    const list = Array.from(cats);

    if (categoryOrder && categoryOrder.length > 0) {
      const catMap = new Map<string, string>();
      categories.forEach((c) => catMap.set(c.id, c.nameAr));

      const rankMap = new Map<string, number>();
      categoryOrder.forEach((id, idx) => {
        const arName = catMap.get(id);
        if (arName) rankMap.set(arName, idx);
        rankMap.set(id, idx);
      });

      list.sort((a, b) => {
        const rankA = rankMap.has(a) ? (rankMap.get(a) as number) : 999;
        const rankB = rankMap.has(b) ? (rankMap.get(b) as number) : 999;
        return rankA - rankB;
      });
    }

    return list;
  }, [products, categoryOrder]);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCat = selectedCategory === "الكل" || p.type === selectedCategory;
      return matchesSearch && matchesCat;
    });
  }, [products, searchQuery, selectedCategory]);

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setProductModalOpen(true);
  };

  const handleOpenEdit = (p: ProductItem) => {
    setEditingProduct(p);
    setProductModalOpen(true);
  };

  const handleProductSaved = (saved: ProductItem, isNew: boolean) => {
    if (isNew) {
      setProducts((prev) => [saved, ...prev]);
    } else {
      setProducts((prev) => prev.map((p) => (p._id === saved._id ? saved : p)));
    }
  };

  const handleOpenDelete = (p: ProductItem) => {
    setTargetProduct(p);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!targetProduct) return;
    try {
      setDeleting(true);
      await apiClient.delete(`/api/products/${targetProduct._id}`);
      setProducts((prev) => prev.filter((p) => p._id !== targetProduct._id));
      setDeleteModalOpen(false);
      setTargetProduct(null);
    } catch (err: unknown) {
      if (isAuthError(err)) return;
      alert(getErrorMessage(err, "فشل حذف المنتج"));
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {/* Top Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
        }}
      >
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 900, color: "#0f172a" }}>
            إدارة منيو المنتجات والأسعار 🥤
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 600, color: "text.secondary", mt: 0.5 }}>
            تعديل أسعار المشروبات، إضافة أصناف جديدة، والتحكم الفوري في قائمة منيو الزبائن
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flexWrap: "wrap" }}>
          <Tooltip title="تحديث القائمة">
            <IconButton onClick={fetchProducts} sx={{ bgcolor: "background.paper", border: "1px solid #e2e8f0" }}>
              <Refresh />
            </IconButton>
          </Tooltip>

          <Button
            variant="text"
            startIcon={<SwapVert />}
            onClick={() => setCategoryOrderModalOpen(true)}
            sx={{
              borderRadius: 1.5,
              fontWeight: 800,
              px: 2,
              py: 0.9,
              bgcolor: "#f1f5f9",
              color: "#334155",
              "&:hover": { bgcolor: "#e2e8f0" },
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <span>ترتيب الأقسام والمواسم 🔄</span>
            {activeSeason !== "default" && (
              <Box
                component="span"
                sx={{
                  fontSize: "0.75rem",
                  px: 1,
                  py: 0.2,
                  borderRadius: 1,
                  bgcolor: SEASON_INFO[activeSeason]?.bgLight || "#fff",
                  color: SEASON_INFO[activeSeason]?.color || "#334155",
                  fontWeight: 900,
                }}
              >
                {SEASON_INFO[activeSeason]?.shortLabel}
              </Box>
            )}
          </Button>

          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={handleOpenAdd}
            sx={{
              borderRadius: 1.5,
              fontWeight: 900,
              px: 2.5,
              py: 1,
              boxShadow: "0 4px 14px rgba(0, 154, 116, 0.25)",
            }}
          >
            إضافة صنف جديد
          </Button>
        </Box>
      </Box>

      {error && (
        <Alert
          severity="error"
          sx={{ borderRadius: 3, fontWeight: 700 }}
          action={
            <Button color="inherit" size="small" onClick={fetchProducts} sx={{ fontWeight: 800 }}>
              إعادة المحاولة
            </Button>
          }
        >
          {error}
        </Alert>
      )}

      {/* Search and Category Filters Bar */}
      <ProductCategoryBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        categoriesList={categoriesList}
        totalFiltered={filteredProducts.length}
      />

      {/* Products Grid */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 12 }}>
          <CircularProgress size={44} />
        </Box>
      ) : filteredProducts.length === 0 ? (
        <Box
          sx={{
            py: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "background.paper",
            borderRadius: 2,
            border: "1px dashed #cbd5e1",
          }}
        >
          <RestaurantMenu sx={{ fontSize: 60, color: "text.secondary", mb: 2, opacity: 0.5 }} />
          <Typography variant="h6" sx={{ fontWeight: 800, color: "text.secondary" }}>
            لا توجد أصناف مطابقة للبحث أو القسم
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5 }}>
            جرب اختيار قسم آخر أو تعديل نص البحث، أو قم بإضافة صنف جديد
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
            },
            gap: 2.5,
          }}
        >
          {filteredProducts.map((p) => (
            <AdminProductCard
              key={p._id}
              product={p}
              onEdit={handleOpenEdit}
              onDelete={handleOpenDelete}
            />
          ))}
        </Box>
      )}

      {/* Add / Edit Product Modal */}
      <ProductDialog
        open={productModalOpen}
        onClose={() => setProductModalOpen(false)}
        product={editingProduct}
        onSuccess={handleProductSaved}
        existingCategories={categoriesList}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        open={deleteModalOpen}
        title="حذف صنف من المنيو"
        content={`هل أنت متأكد من رغبتك في حذف الصنف "${targetProduct ? targetProduct.name : ""}" نهائياً من المنيو؟`}
        loading={deleting}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
      />

      {/* Season and Category Order Manager Dialog */}
      <CategoryOrderModal
        open={categoryOrderModalOpen}
        onClose={() => setCategoryOrderModalOpen(false)}
        onSaved={(newCfg) => {
          if (newCfg.activeSeason) setActiveSeason(newCfg.activeSeason);
          if (newCfg.categoryOrder) setCategoryOrder(newCfg.categoryOrder);
        }}
      />
    </Box>
  );
};

export default ProductsPage;

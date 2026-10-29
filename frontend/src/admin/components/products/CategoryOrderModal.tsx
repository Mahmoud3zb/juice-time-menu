import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Button,
  IconButton,
  Chip,
  Tooltip,
  CircularProgress,
  Alert,
} from "@mui/material";
import {
  Close,
  KeyboardArrowUp,
  KeyboardArrowDown,
  VerticalAlignTop,
  VerticalAlignBottom,
  CheckCircle,
  Save,
  RestartAlt,
} from "@mui/icons-material";
import { categories, type Category } from "../../../data";
import {
  type SeasonPreset,
  type MenuConfigData,
  SEASON_INFO,
  PRESET_ORDERS,
  applyCategoryOrder,
} from "../../../utils/seasonPresets";
import { apiClient, getErrorMessage } from "../../../api/client";

interface CategoryOrderModalProps {
  open: boolean;
  onClose: () => void;
  onSaved?: (newConfig: MenuConfigData) => void;
}

const SEASON_OPTIONS: { id: Exclude<SeasonPreset, "custom">; label: string; icon: string }[] = [
  { id: "summer", label: "صيف", icon: "☀️" },
  { id: "winter", label: "شتاء", icon: "❄️" },
  { id: "ramadan", label: "رمضان", icon: "🌙" },
  { id: "default", label: "افتراضي", icon: "📋" },
];

export const CategoryOrderModal: React.FC<CategoryOrderModalProps> = ({
  open,
  onClose,
  onSaved,
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Active configuration state
  const [activeSeason, setActiveSeason] = useState<SeasonPreset>("default");
  const [orderedCats, setOrderedCats] = useState<Category[]>(categories);

  // Fetch current menu config on open
  useEffect(() => {
    if (open) {
      loadConfig();
    }
  }, [open]);

  const loadConfig = async () => {
    try {
      setLoading(true);
      setError(null);
      setSuccessMsg(null);
      const res = await apiClient.get<{ data: MenuConfigData }>("/api/menu-config");
      const config = res.data?.data;
      if (config) {
        setActiveSeason(config.activeSeason || "default");
        if (config.categoryOrder && config.categoryOrder.length > 0) {
          setOrderedCats(applyCategoryOrder(categories, config.categoryOrder));
        } else {
          setOrderedCats(categories);
        }
      }
    } catch (err: unknown) {
      console.warn("Could not load menu config from backend, using default:", err);
      setActiveSeason("default");
      setOrderedCats(categories);
    } finally {
      setLoading(false);
    }
  };

  // Quick Preset Selection
  const handleSelectSeason = (season: Exclude<SeasonPreset, "custom">) => {
    const targetOrder = PRESET_ORDERS[season];
    if (targetOrder) {
      setActiveSeason(season);
      setOrderedCats(applyCategoryOrder(categories, targetOrder));
      setSuccessMsg(`تم تطبيق ترتيب ${SEASON_INFO[season].title}. لا تنسَ حفظ التغييرات.`);
    }
  };

  // Move Category Up
  const moveUp = (index: number) => {
    if (index === 0) return;
    const newItems = [...orderedCats];
    const temp = newItems[index - 1];
    newItems[index - 1] = newItems[index];
    newItems[index] = temp;
    setOrderedCats(newItems);
    setActiveSeason("custom");
    setSuccessMsg(null);
  };

  // Move Category Down
  const moveDown = (index: number) => {
    if (index === orderedCats.length - 1) return;
    const newItems = [...orderedCats];
    const temp = newItems[index + 1];
    newItems[index + 1] = newItems[index];
    newItems[index] = temp;
    setOrderedCats(newItems);
    setActiveSeason("custom");
    setSuccessMsg(null);
  };

  // Move Category to Top
  const moveToTop = (index: number) => {
    if (index === 0) return;
    const newItems = [...orderedCats];
    const [target] = newItems.splice(index, 1);
    newItems.unshift(target);
    setOrderedCats(newItems);
    setActiveSeason("custom");
    setSuccessMsg(null);
  };

  // Move Category to Bottom
  const moveToBottom = (index: number) => {
    if (index === orderedCats.length - 1) return;
    const newItems = [...orderedCats];
    const [target] = newItems.splice(index, 1);
    newItems.push(target);
    setOrderedCats(newItems);
    setActiveSeason("custom");
    setSuccessMsg(null);
  };

  // Reset to default
  const handleResetToDefault = () => {
    handleSelectSeason("default");
  };

  // Save changes to backend
  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);
      const categoryOrder = orderedCats.map((c) => c.id);
      const res = await apiClient.put<{ data: MenuConfigData }>("/api/menu-config", {
        activeSeason,
        categoryOrder,
      });

      const updated = res.data?.data || { activeSeason, categoryOrder };
      setSuccessMsg("✅ تم حفظ الترتيب الجديد للمنيو بنجاح!");
      if (onSaved) {
        onSaved(updated);
      }
      setTimeout(() => {
        onClose();
      }, 900);
    } catch (err: unknown) {
      console.error("Save menu config error:", err);
      setError(getErrorMessage(err, "تعذر حفظ إعدادات المنيو. يرجى المحاولة مرة أخرى."));
    } finally {
      setSaving(false);
    }
  };

  const currentInfo = SEASON_INFO[activeSeason] || SEASON_INFO.default;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: 2.5,
            m: { xs: 1.5, sm: 2 },
            maxHeight: "92vh",
            boxShadow: "0 20px 40px -15px rgba(0,0,0,0.12)",
          },
        },
      }}
    >
      {/* Header */}
      <DialogTitle
        sx={{
          m: 0,
          p: { xs: 2, sm: 2.5 },
          pb: 1.5,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
            <Typography variant="h6" sx={{ fontWeight: 800, fontSize: { xs: "1.05rem", sm: "1.2rem" }, color: "#0f172a" }}>
              ترتيب الأقسام والمواسم
            </Typography>
            <Chip
              label={currentInfo.badge}
              size="small"
              sx={{
                fontWeight: 800,
                fontSize: "0.75rem",
                bgcolor: currentInfo.bgLight,
                color: currentInfo.color,
                border: "none",
                height: 24,
              }}
            />
          </Box>
          <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5, fontSize: "0.82rem", fontWeight: 500 }}>
            حدد موسم المنيو الحالي بنقرة واحدة، أو رتّب الأقسام بالأسهم لتظهر في الصدارة
          </Typography>
        </Box>
        <IconButton onClick={onClose} size="small" sx={{ color: "#94a3b8", "&:hover": { bgcolor: "#f1f5f9" } }}>
          <Close fontSize="small" />
        </IconButton>
      </DialogTitle>

      <DialogContent
        dividers
        sx={{
          p: { xs: 2, sm: 2.5 },
          borderColor: "#f1f5f9",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress size={36} />
          </Box>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {error && (
              <Alert severity="error" sx={{ borderRadius: 2.5, fontWeight: 700, fontSize: "0.85rem" }}>
                {error}
              </Alert>
            )}

            {successMsg && (
              <Alert severity="success" sx={{ borderRadius: 2.5, fontWeight: 700, fontSize: "0.85rem" }}>
                {successMsg}
              </Alert>
            )}

            {/* Modern Segmented Season Selector (No Heavy Outlines) */}
            <Box>
              <Typography variant="caption" sx={{ fontWeight: 800, color: "#64748b", mb: 1, display: "block" }}>
                الموسم السريع:
              </Typography>
              <Box
                sx={{
                  bgcolor: "#f1f5f9",
                  p: 0.5,
                  borderRadius: 2,
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: 0.5,
                }}
              >
                {SEASON_OPTIONS.map((opt) => {
                  const isActive = activeSeason === opt.id;
                  const info = SEASON_INFO[opt.id];
                  return (
                    <Box
                      key={opt.id}
                      component="button"
                      type="button"
                      onClick={() => handleSelectSeason(opt.id)}
                      sx={{
                        border: "none",
                        cursor: "pointer",
                        outline: "none",
                        borderRadius: 1.5,
                        py: { xs: 1, sm: 1.2 },
                        px: 0.5,
                        transition: "all 0.15s ease",
                        bgcolor: isActive ? "#ffffff" : "transparent",
                        boxShadow: isActive ? "0 2px 6px rgba(0,0,0,0.06)" : "none",
                        color: isActive ? info.color : "#64748b",
                        fontWeight: isActive ? 800 : 600,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 0.75,
                        fontSize: { xs: "0.82rem", sm: "0.88rem" },
                        "&:hover": {
                          bgcolor: isActive ? "#ffffff" : "rgba(255,255,255,0.6)",
                          color: info.color,
                        },
                      }}
                    >
                      <span>{opt.icon}</span>
                      <span>{opt.label}</span>
                    </Box>
                  );
                })}
              </Box>

              {/* Season info banner (Soft & Borderless) */}
              <Box
                sx={{
                  mt: 1.25,
                  p: 1.25,
                  px: 1.5,
                  borderRadius: 1.5,
                  bgcolor: currentInfo.bgLight,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 1,
                  flexWrap: "wrap",
                }}
              >
                <Typography variant="caption" sx={{ fontWeight: 700, color: currentInfo.color, fontSize: "0.8rem", lineHeight: 1.5 }}>
                  {currentInfo.icon} {currentInfo.title}: {currentInfo.description}
                </Typography>
                {activeSeason === "custom" && (
                  <Chip
                    size="small"
                    icon={<CheckCircle sx={{ fontSize: 14 }} />}
                    label="ترتيب مخصص"
                    sx={{
                      height: 22,
                      fontSize: "0.68rem",
                      fontWeight: 800,
                      bgcolor: "#dcfce7",
                      color: "#15803d",
                      border: "none",
                    }}
                  />
                )}
              </Box>
            </Box>

            {/* Categories List Section */}
            <Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                <Typography variant="caption" sx={{ fontWeight: 800, color: "#64748b" }}>
                  ترتيب الأقسام ({orderedCats.length} قسم):
                </Typography>
                <Button
                  size="small"
                  variant="text"
                  startIcon={<RestartAlt fontSize="small" />}
                  onClick={handleResetToDefault}
                  sx={{
                    fontWeight: 700,
                    fontSize: "0.78rem",
                    color: "#64748b",
                    py: 0.2,
                    "&:hover": { bgcolor: "transparent", color: "#0f172a" },
                  }}
                >
                  استعادة الافتراضي
                </Button>
              </Box>

              {/* Minimalist Categories List */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 0.5,
                  maxHeight: "360px",
                  overflowY: "auto",
                  pr: 0.5,
                }}
              >
                {orderedCats.map((cat, idx) => {
                  const isTop3 = idx < 3;
                  return (
                    <Box
                      key={cat.id}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        py: 1,
                        px: 1.5,
                        borderRadius: 2,
                        bgcolor: isTop3 ? "#fffbeb" : "#fafafa",
                        transition: "background 0.15s ease",
                        "&:hover": {
                          bgcolor: isTop3 ? "#fef3c7" : "#f1f5f9",
                        },
                      }}
                    >
                      {/* Left: Rank & Title */}
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            fontWeight: 900,
                            fontSize: "0.78rem",
                            width: 22,
                            textAlign: "center",
                            color: isTop3 ? "#d97706" : "#94a3b8",
                          }}
                        >
                          {idx + 1}
                        </Typography>

                        <Box>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
                            <Typography variant="body2" sx={{ fontWeight: 700, fontSize: "0.9rem", color: "#0f172a" }}>
                              {cat.nameAr}
                            </Typography>
                            {isTop3 && (
                              <Chip
                                label="في الصدارة"
                                size="small"
                                sx={{
                                  height: 18,
                                  fontSize: "0.62rem",
                                  fontWeight: 800,
                                  bgcolor: "#fef3c7",
                                  color: "#b45309",
                                  border: "none",
                                }}
                              />
                            )}
                          </Box>
                          {cat.nameEn && (
                            <Typography variant="caption" sx={{ color: "#94a3b8", fontSize: "0.75rem", display: "block" }}>
                              {cat.nameEn}
                            </Typography>
                          )}
                        </Box>
                      </Box>

                      {/* Right: Ghost Reorder Actions (No heavy square borders) */}
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.25 }}>
                        <Tooltip title="نقل إلى الأعلى مباشرة">
                          <span>
                            <IconButton
                              size="small"
                              onClick={() => moveToTop(idx)}
                              disabled={idx === 0}
                              sx={{
                                color: idx === 0 ? "#cbd5e1" : "#64748b",
                                p: 0.6,
                                "&:hover": { bgcolor: "#e2e8f0" },
                              }}
                            >
                              <VerticalAlignTop sx={{ fontSize: 18 }} />
                            </IconButton>
                          </span>
                        </Tooltip>

                        <Tooltip title="تقديم خطوة لأعلى">
                          <span>
                            <IconButton
                              size="small"
                              onClick={() => moveUp(idx)}
                              disabled={idx === 0}
                              sx={{
                                color: idx === 0 ? "#cbd5e1" : "#0f172a",
                                p: 0.6,
                                "&:hover": { bgcolor: "#e2e8f0" },
                              }}
                            >
                              <KeyboardArrowUp sx={{ fontSize: 20 }} />
                            </IconButton>
                          </span>
                        </Tooltip>

                        <Tooltip title="تأخير خطوة لأسفل">
                          <span>
                            <IconButton
                              size="small"
                              onClick={() => moveDown(idx)}
                              disabled={idx === orderedCats.length - 1}
                              sx={{
                                color: idx === orderedCats.length - 1 ? "#cbd5e1" : "#0f172a",
                                p: 0.6,
                                "&:hover": { bgcolor: "#e2e8f0" },
                              }}
                            >
                              <KeyboardArrowDown sx={{ fontSize: 20 }} />
                            </IconButton>
                          </span>
                        </Tooltip>

                        <Tooltip title="نقل إلى أسفل القائمة">
                          <span>
                            <IconButton
                              size="small"
                              onClick={() => moveToBottom(idx)}
                              disabled={idx === orderedCats.length - 1}
                              sx={{
                                color: idx === orderedCats.length - 1 ? "#cbd5e1" : "#64748b",
                                p: 0.6,
                                "&:hover": { bgcolor: "#e2e8f0" },
                              }}
                            >
                              <VerticalAlignBottom sx={{ fontSize: 18 }} />
                            </IconButton>
                          </span>
                        </Tooltip>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ p: { xs: 2, sm: 2.5 }, justifyContent: "space-between", bgcolor: "#fafafa" }}>
        <Button onClick={onClose} sx={{ fontWeight: 700, color: "#64748b", fontSize: "0.88rem" }}>
          إلغاء
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          disabled={saving || loading}
          startIcon={saving ? <CircularProgress size={16} color="inherit" /> : <Save />}
          sx={{
            borderRadius: 1.5,
            px: 3,
            py: 0.9,
            fontWeight: 800,
            fontSize: "0.9rem",
            boxShadow: "0 4px 12px rgba(0, 154, 116, 0.25)",
          }}
        >
          {saving ? "جارِ الحفظ..." : "حفظ الترتيب والموسم"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CategoryOrderModal;

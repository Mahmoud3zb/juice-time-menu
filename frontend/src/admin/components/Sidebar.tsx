import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import {
  HomeOutlined,
  AddCircle,
  ReceiptLongOutlined,
  CalendarMonthOutlined,
  SettingsOutlined,
  AccountBalanceWallet,
  Logout,
  RestaurantMenu,
  ExpandMore,
} from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";

interface SidebarProps {
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onCloseMobile }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);

  const navItems = [
    { to: "/admin", end: true, label: "الرئيسية", icon: <HomeOutlined /> },
    { to: "/admin/expenses/new", end: false, label: "إضافة مصروف", icon: <AddCircle /> },
    { to: "/admin/reports/daily", end: false, label: "تقارير اليوم", icon: <ReceiptLongOutlined /> },
    { to: "/admin/reports/monthly", end: false, label: "التقارير الشهرية", icon: <CalendarMonthOutlined /> },
    { to: "/admin/settings", end: false, label: "إعدادات", icon: <SettingsOutlined /> },
    { to: "/admin/products", end: false, label: "المنيو والأسعار", icon: <RestaurantMenu /> },
  ];

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        width: 260,
        height: "100vh",
        backgroundColor: "#0d1829",
        color: "#ffffff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "fixed",
        right: 0,
        top: 0,
        zIndex: 1200,
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
        userSelect: "none",
        borderLeft: "1px solid rgba(255, 255, 255, 0.05)",
      }}
      dir="rtl"
    >
      {/* Top Header & Navigation */}
      <Box>
        {/* Brand Bar */}
        <Box
          sx={{
            p: 3,
            display: "flex",
            alignItems: "center",
            gap: 2,
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: 2,
              backgroundColor: "rgba(0, 154, 116, 0.2)",
              border: "1px solid rgba(5, 179, 135, 0.35)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#34d399",
            }}
          >
            <AccountBalanceWallet sx={{ fontSize: 24 }} />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 900, color: "#ffffff", fontSize: "1.1rem", lineHeight: 1.2 }}>
              مصروفات المحل
            </Typography>
            <Typography variant="caption" sx={{ color: "rgba(167, 243, 208, 0.7)", fontWeight: 700 }}>
              عصير تايم JUICE TIME
            </Typography>
          </Box>
        </Box>

        {/* Navigation Items */}
        <List sx={{ px: 2, py: 2 }}>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => onCloseMobile?.()}
              style={{ textDecoration: "none" }}
            >
              {({ isActive }) => (
                <ListItemButton
                  sx={{
                    borderRadius: 1.5,
                    mb: 1,
                    py: 1.2,
                    px: 2,
                    backgroundColor: isActive ? "#009a74" : "transparent",
                    color: isActive ? "#ffffff" : "#94a3b8",
                    boxShadow: isActive ? "0 4px 12px -2px rgba(0, 154, 116, 0.4)" : "none",
                    "&:hover": {
                      backgroundColor: isActive ? "#008262" : "rgba(255, 255, 255, 0.05)",
                      color: "#ffffff",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: isActive ? "#ffffff" : "#64748b",
                      minWidth: 40,
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    slotProps={{
                      primary: {
                        sx: {
                          fontWeight: isActive ? 900 : 700,
                          fontSize: "0.9rem",
                        },
                      },
                    }}
                  />
                </ListItemButton>
              )}
            </NavLink>
          ))}
        </List>
      </Box>

      {/* User Profile Footer */}
      <Box sx={{ p: 2, borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
        <Box
          onClick={handleProfileClick}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: 1.2,
            borderRadius: 2,
            backgroundColor: "rgba(255, 255, 255, 0.04)",
            cursor: "pointer",
            transition: "all 0.2s",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.08)",
            },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.8 }}>
            <Avatar
              sx={{
                width: 40,
                height: 40,
                bgcolor: "#009a74",
                fontWeight: 900,
                fontSize: "1rem",
              }}
            >
              {(user?.name || "م")[0]}
            </Avatar>
            <Box sx={{ textAlign: "right" }}>
              <Typography variant="body2" sx={{ fontWeight: 800, color: "#f8fafc", lineHeight: 1.2 }}>
                {user?.name || "محمد"}
              </Typography>
              <Typography variant="caption" sx={{ color: "#94a3b8", fontWeight: 600 }}>
                {user?.role === "owner" ? "المستخدم الرئيسي" : "المشرف"}
              </Typography>
            </Box>
          </Box>
          <ExpandMore sx={{ color: "#64748b", fontSize: 20 }} />
        </Box>

        {/* Profile Dropdown Menu */}
        <Menu
          anchorEl={anchorEl}
          open={openMenu}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          transformOrigin={{ vertical: "bottom", horizontal: "right" }}
          slotProps={{
            paper: {
              sx: {
                width: 220,
                borderRadius: 2,
                backgroundColor: "#16233b",
                color: "#ffffff",
                boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                mb: 1.5,
                p: 0.5,
              },
            },
          }}
          dir="rtl"
        >
          <MenuItem
            onClick={() => {
              handleClose();
              navigate("/");
            }}
            sx={{
              py: 1.2,
              px: 2,
              borderRadius: 1.5,
              fontSize: "0.85rem",
              fontWeight: 700,
              gap: 1.5,
              "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.08)" },
            }}
          >
            <RestaurantMenu sx={{ fontSize: 18, color: "#009a74" }} />
            <span>الذهاب للمنيو</span>
          </MenuItem>

          <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.08)", my: 0.5 }} />

          <MenuItem
            onClick={() => {
              handleClose();
              logout();
            }}
            sx={{
              py: 1.2,
              px: 2,
              borderRadius: 1.5,
              fontSize: "0.85rem",
              fontWeight: 700,
              color: "#f87171",
              gap: 1.5,
              "&:hover": { backgroundColor: "rgba(239, 68, 68, 0.12)" },
            }}
          >
            <Logout sx={{ fontSize: 18, color: "#f87171" }} />
            <span>تسجيل الخروج</span>
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default Sidebar;

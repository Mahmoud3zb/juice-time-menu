import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import {
  Box,
  Drawer,
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  ThemeProvider,
  CssBaseline,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import Sidebar from "./Sidebar";
import { adminMuiTheme } from "../theme/muiTheme";

export const AdminLayout: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <ThemeProvider theme={adminMuiTheme}>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#f8fafc" }} dir="rtl">
        {/* Desktop Fixed Sidebar */}
        <Box
          component="nav"
          sx={{
            width: { md: 260 },
            flexShrink: { md: 0 },
            display: { xs: "none", md: "block" },
          }}
        >
          <Sidebar />
        </Box>

        {/* Mobile Temporary Drawer (Opens from Right) */}
        <Drawer
          anchor="right"
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: 280,
              backgroundColor: "#0d1829",
              borderLeft: "1px solid rgba(255,255,255,0.08)",
            },
          }}
        >
          <Sidebar onCloseMobile={() => setMobileOpen(false)} />
        </Drawer>

        {/* Main Content Area */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            overflowX: "hidden",
          }}
        >
          {/* Mobile Top AppBar */}
          <AppBar
            position="sticky"
            sx={{
              display: { xs: "block", md: "none" },
              backgroundColor: "#0d1829",
              color: "#ffffff",
              boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
            }}
          >
            <Toolbar sx={{ justifyContent: "space-between", px: { xs: 1.5, sm: 2 } }}>
              {/* Right Side: Hamburger Menu (3 bars) + Title */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{
                    bgcolor: "rgba(255,255,255,0.08)",
                    borderRadius: 1.5,
                    p: 0.9,
                    color: "#ffffff",
                    "&:hover": { bgcolor: "rgba(255,255,255,0.16)" },
                  }}
                >
                  <MenuIcon sx={{ fontSize: 24 }} />
                </IconButton>

                <Typography variant="subtitle1" sx={{ fontWeight: 900, fontSize: "1rem", color: "#f8fafc", pr: 0.5 }}>
                  مصروفات المحل
                </Typography>
              </Box>

              {/* Left Side: + مصروف Button */}
              {/* <Button
                component={RouterLink}
                to="/admin/expenses/new"
                variant="contained"
                size="small"
                startIcon={<AddIcon sx={{ fontSize: 16 }} />}
                sx={{
                  backgroundColor: "#009a74",
                  color: "#ffffff",
                  fontWeight: 900,
                  borderRadius: 2.5,
                  px: 1.8,
                  py: 0.65,
                  fontSize: "0.82rem",
                  boxShadow: "0 2px 8px rgba(0,154,116,0.35)",
                  "&:hover": { backgroundColor: "#008262" },
                }}
              >
                + مصروف
              </Button> */}
            </Toolbar>
          </AppBar>

          {/* Dynamic Page Views */}
          <Box
            sx={{
              flexGrow: 1,
              p: { xs: 2.5, sm: 4, md: 5 },
              maxWidth: 1200,
              width: "100%",
              mx: "auto",
            }}
          >
            <Outlet key={location.pathname} />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default AdminLayout;

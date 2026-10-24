import React, { useState } from "react";
import { useNavigate, Navigate, Link as RouterLink, useSearchParams } from "react-router-dom";
import {
  Box,
  Card,
  Typography,
  TextField,
  Button,
  Alert,
  InputAdornment,
  IconButton,
  CircularProgress,
  Link,
  ThemeProvider,
} from "@mui/material";
import {
  PersonOutlined,
  LockOutlined,
  Visibility,
  VisibilityOff,
  AccountBalanceWallet,
  ArrowForward,
} from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";
import apiClient from "../../api/client";
import { adminMuiTheme } from "../theme/muiTheme";

export const LoginPage: React.FC = () => {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const isSessionExpired = searchParams.get("expired") === "1";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await apiClient.post("/api/auth/login", {
        email: email.trim(),
        password,
      });

      const { token, user } = response.data;
      if (token && user) {
        login(token, user);
        navigate("/admin");
      } else {
        setError("تعذر الحصول على بيانات تسجيل الدخول من السيرفر.");
      }
    } catch (err: any) {
      console.error("Login error:", err);
      const serverMsg =
        err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.message ||
        "فشل تسجيل الدخول. يرجى التأكد من البريد الإلكتروني وكلمة المرور.";
      setError(serverMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={adminMuiTheme}>
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "#f1f5f9",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: { xs: 2, sm: 3 },
        }}
        dir="rtl"
      >
        <Card
          sx={{
            width: "100%",
            maxWidth: 960,
            borderRadius: { xs: 5, md: 7 },
            overflow: "hidden",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            boxShadow: "0 25px 60px -15px rgba(15, 23, 42, 0.12)",
            border: "1px solid rgba(226, 232, 240, 0.8)",
          }}
        >
          {/* Right Form Column (Inputs & Login Action) */}
          <Box
            sx={{
              width: { xs: "100%", md: "50%" },
              p: { xs: 4, sm: 6, md: 8 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              order: { xs: 2, md: 1 },
            }}
          >
            <Box sx={{ mb: 4, textAlign: { xs: "center", md: "right" } }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 900,
                  color: "#0f172a",
                  mb: 1,
                  fontSize: { xs: "1.75rem", md: "2rem" },
                }}
              >
                تسجيل الدخول
              </Typography>
              <Typography variant="body2" sx={{ color: "#64748b", fontWeight: 700 }}>
                ادخل بياناتك للدخول إلى حسابك
              </Typography>
            </Box>

            {isSessionExpired && !error && (
              <Alert
                severity="info"
                sx={{
                  mb: 3,
                  borderRadius: 3.5,
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  bgcolor: "#eff6ff",
                  color: "#1e40af",
                  border: "1px solid #bfdbfe",
                }}
              >
                انتهت صلاحية الجلسة للأمان. يرجى تسجيل الدخول مجدداً للمتابعة.
              </Alert>
            )}

            {error && (
              <Alert
                severity="error"
                sx={{
                  mb: 3,
                  borderRadius: 3.5,
                  fontWeight: 700,
                  fontSize: "0.85rem",
                }}
              >
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
              <TextField
                fullWidth
                required
                type="email"
                placeholder="البريد الإلكتروني / اسم المستخدم"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutlined sx={{ color: "#94a3b8" }} />
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <TextField
                fullWidth
                required
                type={showPassword ? "text" : "password"}
                placeholder="كلمة المرور"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlined sx={{ color: "#94a3b8" }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          sx={{ color: "#94a3b8" }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <Button
                fullWidth
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{
                  py: 1.8,
                  mt: 1.5,
                  fontSize: "1rem",
                  fontWeight: 900,
                  borderRadius: 4,
                  background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                  boxShadow: "0 10px 25px -5px rgba(37, 99, 235, 0.4)",
                  "&:hover": {
                    background: "linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)",
                  },
                }}
              >
                {loading ? (
                  <CircularProgress size={24} sx={{ color: "#ffffff" }} />
                ) : (
                  "دخول"
                )}
              </Button>
            </Box>

            <Box sx={{ mt: 5, textAlign: "center" }}>
              <Link
                component={RouterLink}
                to="/"
                sx={{
                  fontSize: "0.8rem",
                  fontWeight: 800,
                  color: "#64748b",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 0.8,
                  "&:hover": { color: "#2563eb" },
                  transition: "color 0.2s",
                }}
              >
                <span>الرجوع إلى منيو عصير تايم</span>
                <ArrowForward sx={{ fontSize: 14 }} />
              </Link>
            </Box>
          </Box>

          {/* Left Branding Column (Matching Image Screen 1) */}
          <Box
            sx={{
              width: { xs: "100%", md: "50%" },
              background: "linear-gradient(145deg, #0a1324 0%, #0d1b33 50%, #13274c 100%)",
              p: { xs: 5, md: 7 },
              color: "#ffffff",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
              order: { xs: 1, md: 2 },
            }}
          >
            <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
              <Box
                sx={{
                  fontSize: "0.75rem",
                  fontWeight: 800,
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                  px: 2,
                  py: 0.8,
                  borderRadius: 10,
                  color: "#93c5fd",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                لوحة تحكم الإدارة
              </Box>
            </Box>

            <Box sx={{ my: "auto", py: 4, zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Box
                sx={{
                  width: 96,
                  height: 96,
                  borderRadius: 6,
                  backgroundColor: "rgba(37, 99, 235, 0.25)",
                  border: "2px solid rgba(96, 165, 250, 0.35)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 3,
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
                }}
              >
                <AccountBalanceWallet sx={{ fontSize: 50, color: "#60a5fa" }} />
              </Box>

              <Typography variant="h4" sx={{ fontWeight: 900, color: "#ffffff", mb: 1.5, letterSpacing: -0.5 }}>
                إدارة مصروفات المحل
              </Typography>
              <Typography variant="body2" sx={{ color: "rgba(191, 219, 254, 0.85)", fontWeight: 600, maxWidth: 300, lineHeight: 1.7 }}>
                سجل مصروفاتك .. واطلع على تفاصيل يومك وتقاريرك المالية بكل سهولة ودقة.
              </Typography>
            </Box>

            <Typography variant="caption" sx={{ color: "rgba(147, 197, 253, 0.5)", fontWeight: 700 }}>
              عصير تايم © {new Date().getFullYear()} - جميع الحقوق محفوظة
            </Typography>
          </Box>
        </Card>
      </Box>
    </ThemeProvider>
  );
};

export default LoginPage;

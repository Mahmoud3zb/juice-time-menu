import { createTheme } from "@mui/material/styles";

export const adminMuiTheme = createTheme({
  typography: {
    fontFamily: "'Cairo', sans-serif",
    h1: { fontWeight: 900 },
    h2: { fontWeight: 900 },
    h3: { fontWeight: 800 },
    h4: { fontWeight: 800 },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 700 },
    button: { fontWeight: 800, textTransform: "none" },
  },
  palette: {
    primary: {
      main: "#2563eb",
      light: "#60a5fa",
      dark: "#1d4ed8",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#0d1829",
      light: "#1e293b",
      dark: "#0a1120",
      contrastText: "#ffffff",
    },
    error: {
      main: "#e11d48",
      light: "#ffe4e6",
      dark: "#be123c",
    },
    success: {
      main: "#059669",
      light: "#dcfce7",
      dark: "#047857",
    },
    warning: {
      main: "#d97706",
      light: "#fef3c7",
      dark: "#b45309",
    },
    background: {
      default: "#f8fafc",
      paper: "#ffffff",
    },
    text: {
      primary: "#0f172a",
      secondary: "#64748b",
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          padding: "10px 22px",
          fontSize: "0.875rem",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0 10px 15px -3px rgba(37, 99, 235, 0.2)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.04)",
          border: "1px solid #f1f5f9",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 20,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          backgroundColor: "#f8fafc",
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#cbd5e1",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#2563eb",
            borderWidth: 2,
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontFamily: "'Cairo', sans-serif",
          borderColor: "#f1f5f9",
          padding: "16px",
        },
        head: {
          fontWeight: 800,
          color: "#94a3b8",
          fontSize: "0.75rem",
        },
      },
    },
  },
});

export default adminMuiTheme;

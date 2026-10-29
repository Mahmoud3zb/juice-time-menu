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
      main: "#009a74",
      light: "#05b387",
      dark: "#007a5c",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#f37021",
      light: "#ff8533",
      dark: "#c25410",
      contrastText: "#ffffff",
    },
    error: {
      main: "#e11d48",
      light: "#ffe4e6",
      dark: "#be123c",
    },
    success: {
      main: "#009a74",
      light: "#e6f5f1",
      dark: "#007a5c",
    },
    warning: {
      main: "#f37021",
      light: "#fff7ed",
      dark: "#c25410",
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
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "8px 18px",
          fontSize: "0.875rem",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0 6px 14px -3px rgba(0, 154, 116, 0.25)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 2px 12px rgba(0, 0, 0, 0.03)",
          border: "1px solid #f1f5f9",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          backgroundColor: "#f8fafc",
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#cbd5e1",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#009a74",
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

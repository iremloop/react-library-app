import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",

    primary: {
      main: "#2563eb",
    },

    error: {
      main: "#dc2626",
    },

    background: {
      default: "#f4f6f8",
      paper: "#ffffff",
    },

    text: {
      primary: "#111827",
      secondary: "#475569",
    },
  },

  typography: {
    fontFamily: "Arial, sans-serif",
  },

  shape: {
    borderRadius: 8,
  },
});
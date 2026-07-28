import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",


    primary: {
      main: "#2563eb",
      light: "#3b82f6",
      dark: "#1d4ed8",
      contrastText: "#ffffff",
    },

    error: {
      main: "#dc2626",
      light: "#fef2f2",
      dark: "#b91c1c",
      contrastText: "#ffffff",
    },

    background: {
      default: "#f4f6f8",
      paper: "#ffffff",
    },

    text: {
      primary: "#111827",
      secondary: "#475569",
      disabled: "#94a3b8",
    },

    divider: "#e5e7eb",

    action: {
      hover: "#f3f4f6",
      selected: "#f8fafc",

  },
},

  typography: {
    fontFamily: "Arial, sans-serif",
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    fontWeightBold: 700,

    button: {
      fontWeight: 700,
      textTransform: "none",
    },

    h1: {
      fontWeight: 700,
    },

    h2: {
      fontWeight: 700,
    },

    h3: {
      fontWeight: 700,
    },

    h4: {
      fontWeight: 700,
    },

    h5: {
      fontWeight: 700,
    },

    h6: {
      fontWeight: 700,
    },
  },

  shape: {
    borderRadius: 8,
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 700,
        },
      },
    },

    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
        },
      },
    },
  },
}
);
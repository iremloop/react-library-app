import type { ReactNode } from "react";
import {
  Box,
  Typography,
} from "@mui/material";

type PageHeaderProps = {
  title: string;
  actions?: ReactNode;
};

function PageHeader({
  title,
  actions,
}: PageHeaderProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: {
          xs: "stretch",
          sm: "center",
        },
        justifyContent: "space-between",
        flexDirection: {
          xs: "column",
          sm: "row",
        },
        gap: {
          xs: 2,
          sm: 3,
        },
        mb: {
          xs: 3,
          sm: 4,
        },
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        sx={{
          color: "text.primary",
          fontWeight: 700,
          fontSize: {
            xs: "2rem",
            sm: "2.25rem",
            md: "2.5rem",
          },
          lineHeight: 1.15,
        }}
      >
        {title}
      </Typography>

      {actions && (
        <Box
          sx={{
            width: {
              xs: "100%",
              sm: "auto",
            },
            display: "flex",
            justifyContent: {
              xs: "stretch",
              sm: "flex-end",
            },
            "& .MuiButton-root": {
              width: {
                xs: "100%",
                sm: "auto",
              },
            },
          }}
        >
          {actions}
        </Box>
      )}
    </Box>
  );
}

export default PageHeader;
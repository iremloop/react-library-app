import type { ReactNode } from "react";
import { Box, Typography } from "@mui/material";

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
        gap: 2,
        mb: 3,
      }}
    >
     <Typography
  variant="h4"
  component="h1"
  sx={{
    fontWeight: 700,
    color: "text.primary",
  }}
>
  {title}
</Typography>


      {actions}
    </Box>
  );
}

export default PageHeader;
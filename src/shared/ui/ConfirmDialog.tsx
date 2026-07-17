import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  confirmColor?: "primary" | "error";
};

function ConfirmDialog({
  open,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText,
  confirmColor = "error",
}: ConfirmDialogProps) {
  const { t } = useTranslation();

  return (
    <Dialog
      open={open}
      onClose={onCancel}
      fullWidth
      maxWidth="sm"
      slotProps={{
        paper: {
          sx: {
            borderRadius: 3,
            padding: 1,
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          fontSize: 26,
          fontWeight: 750,
          paddingBottom: 1,
        }}
      >
        {title}
      </DialogTitle>

      <DialogContent>
        <Typography
          sx={{
            paddingTop: 1,
            color: "text.primary",
            fontSize: 17,
            lineHeight: 1.6,
          }}
        >
          {message}
        </Typography>
      </DialogContent>

      <DialogActions
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 1.5,
          padding: 3,
          paddingTop: 1,
        }}
      >
        <Button
          variant="outlined"
          onClick={onCancel}
          sx={{
            minWidth: 90,
            borderRadius: 2,
            fontWeight: 650,
            textTransform: "none",
          }}
        >
          {t("common.cancel")}
        </Button>

        <Button
          variant="contained"
          color={confirmColor}
          onClick={onConfirm}
          sx={{
            minWidth: 90,
            borderRadius: 2,
            fontWeight: 650,
            textTransform: "none",
          }}
        >
          {confirmText ?? t("common.delete")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDialog;
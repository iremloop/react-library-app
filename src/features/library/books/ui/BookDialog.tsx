import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import CloseIcon from "@mui/icons-material/Close";

import BookForm from "./BookForm";
import type { Book } from "../model/types";

type BookDialogProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (
    title: string,
    author: string,
    genre: string
  ) => void;
  initialBook?: Book;
};

function BookDialog({
  open,
  onClose,
  onSubmit,
  initialBook,
}: BookDialogProps) {
  const { t } = useTranslation();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      slotProps={{
        paper: {
          sx: {
            borderRadius: 3,
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          position: "relative",
          paddingRight: 7,
          fontSize: 26,
          fontWeight: 750,
        }}
      >
        {initialBook
          ? t("books.editTitle")
          : t("books.addTitle")}

        <IconButton
          aria-label={t("common.close")}
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            color: "text.secondary",
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ paddingTop: 1 }}>
          <BookForm
            initialBook={initialBook}
            onSubmit={onSubmit}
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default BookDialog;
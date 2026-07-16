import { useTranslation } from "react-i18next";

import BookForm from "./BookForm";
import FormDialog from "../../../../shared/ui/FormDialog";
import type { Book } from "../model/types";

type BookDialogProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (title: string, author: string) => void;
  initialBook?: Book;
};

function BookDialog({
  open,
  onClose,
  onSubmit,
  initialBook,
}: BookDialogProps) {
  const { t } = useTranslation();

  if (!open) {
    return null;
  }

  return (
    <FormDialog
      open={open}
      title={
        initialBook
          ? t("books.editTitle")
          : t("books.addTitle")
      }
    >
      <BookForm
        initialBook={initialBook}
        onSubmit={onSubmit}
        onClose={onClose}
      />
    </FormDialog>
  );
}

export default BookDialog;
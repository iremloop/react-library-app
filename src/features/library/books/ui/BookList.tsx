import {
  Box,
  Button,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import type { Book } from "../model/types";

import DataTable from "../../../../shared/ui/DataTable";
import TableState from "../../../../shared/ui/TableState";

type BookListProps = {
  books: Book[];
  onDeleteBook: (id: number) => void;
  onEditBook: (book: Book) => void;
};

function BookList({
  books,
  onDeleteBook,
  onEditBook,
}: BookListProps) {
  const { t } = useTranslation();

  const columns = [
    {
      key: "title",
      header: t("books.titleLabel"),
      render: (book: Book) => book.title,
    },
    {
      key: "author",
      header: t("books.authorLabel"),
      render: (book: Book) => book.author,
    },
    {
      key: "actions",
      header: t("common.actions"),
      render: (book: Book) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: 1.5,
            flexWrap: "wrap",
          }}
        >
          <Button
            size="small"
            variant="contained"
            onClick={() => onEditBook(book)}
            sx={{
              minWidth: 88,
              borderRadius: 2,
              textTransform: "none",
            }}
          >
            {t("common.edit")}
          </Button>

          <Button
            size="small"
            variant="outlined"
            color="error"
            onClick={() =>
              onDeleteBook(book.id)
            }
            sx={{
              minWidth: 72,
              borderRadius: 2,
              textTransform: "none",
            }}
          >
            {t("common.delete")}
          </Button>
        </Box>
      ),
    },
  ];

  if (books.length === 0) {
    return (
      <TableState
        empty
        emptyMessage={t("books.empty")}
      />
    );
  }

  return (
    <DataTable
      data={books}
      columns={columns}
      getRowKey={(book) => book.id}
    />
  );
}

export default BookList;
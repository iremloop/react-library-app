import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import BookCard from "./BookCard";
import type { Book } from "../model/types";

type BookListProps = {
  books: Book[];
  onEdit: (book: Book) => void;
  onDelete: (book: Book) => void;
};

function BookList({
  books,
  onEdit,
  onDelete,
}: BookListProps) {
  const { t } = useTranslation();

  if (books.length === 0) {
    return (
      <Box
        sx={{
          paddingY: 8,
          paddingX: 3,
          textAlign: "center",
          border: "1px dashed",
          borderColor: "divider",
          borderRadius: 3,
          backgroundColor: "background.paper",
        }}
      >
        <Typography color="text.secondary">
          {t("books.empty")}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, minmax(0, 1fr))",
          md: "repeat(3, minmax(0, 1fr))",
          lg: "repeat(4, minmax(0, 1fr))",
        },
        gap: {
          xs: 2,
          sm: 2.5,
          md: 3,
        },
      }}
    >
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </Box>
  );
}

export default BookList;
import type {
  Dispatch,
  SetStateAction,
} from "react";
import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import AddIcon from "@mui/icons-material/Add";

import BookList from "../ui/BookList";
import BookDialog from "../ui/BookDialog";
import BookDetailsDialog from "../ui/BookDetailsDialog";

import type { Book } from "../model/types";

type BooksPageProps = {
  books: Book[];
  setBooks: Dispatch<SetStateAction<Book[]>>;
  setLoans: unknown;
};

function BooksPage({
  books,
  setBooks,
}: BooksPageProps) {
  console.log("BOOKS:", books);
  const { t } = useTranslation();

  const [isBookDialogOpen, setIsBookDialogOpen] =
    useState(false);

  const [selectedBook, setSelectedBook] =
    useState<Book | undefined>(undefined);

  const [detailsBook, setDetailsBook] =
    useState<Book | null>(null);

  const [bookToDelete, setBookToDelete] =
    useState<Book | null>(null);

  function openAddBookDialog() {
    console.log("Yeni kitap ekleme butonuna basıldı.");
    setSelectedBook(undefined);
    setIsBookDialogOpen(true);
  }

  function openEditBookDialog(book: Book) {
    setSelectedBook(book);
    setIsBookDialogOpen(true);
  }

  function closeBookDialog() {
    setIsBookDialogOpen(false);
    setSelectedBook(undefined);
  }

  function openBookDetails(book: Book) {
    setDetailsBook(book);
  }

  function closeBookDetails() {
    setDetailsBook(null);
  }

  function handleBookSubmit(
    title: string,
    author: string,
    genre: string,
    language: string,
    publisher:string,
    coverUrl: string

  ) {
    console.log("publisher:", publisher);
    if (selectedBook) {
      setBooks((currentBooks) =>
        currentBooks.map((book) => {
          if (book.id !== selectedBook.id) {
            return book;
          }
          
          return {
            ...book,
            title,
            author,
            genre,
            language, 
            publisher,
            coverUrl,
          };
        })
      );
    } else {
      const newBook: Book = {
        id: Date.now(),
        title,
        author,
        genre,
        summary: t("books.defaultSummary"),
        pageCount: 0,
        publicationYear: new Date().getFullYear(),
        isbn: "-",
        publisher,
        language,
        coverUrl,
      };

      setBooks((currentBooks) => [
        ...currentBooks,
        newBook,
      ]);
    }

    closeBookDialog();
  }

  function openDeleteDialog(book: Book) {
    setBookToDelete(book);
  }

  function closeDeleteDialog() {
    setBookToDelete(null);
  }

  function confirmDeleteBook() {
    if (!bookToDelete) {
      return;
    }

    setBooks((currentBooks) =>
      currentBooks.filter(
        (book) => book.id !== bookToDelete.id
      )
    );

    if (detailsBook?.id === bookToDelete.id) {
      closeBookDetails();
    }

    closeDeleteDialog();
  }

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            sm: "row",
          },
          alignItems: {
            xs: "stretch",
            sm: "center",
          },
          justifyContent: "space-between",
          gap: 2,
          marginBottom: 4,
        }}
      >
        <Typography
          component="h1"
          variant="h4"
          sx={{
            fontWeight: 750,
          }}
        >
          {t("books.title")}
        </Typography>

        <Button
          type="button"
          variant="contained"
          startIcon={<AddIcon />}
          onClick={openAddBookDialog}
          sx={{
            minHeight: 44,
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 650,
          }}
        >
          {t("books.addButton")}
        </Button>
      </Box>

      <BookList
        books={books}
        onViewDetails={openBookDetails}
        onEdit={openEditBookDialog}
        onDelete={openDeleteDialog}
      />

      <BookDialog
        open={isBookDialogOpen}
        onClose={closeBookDialog}
        onSubmit={handleBookSubmit}
        initialBook={selectedBook}
      />

      <BookDetailsDialog
        book={detailsBook}
        open={detailsBook !== null}
        onClose={closeBookDetails}
      />

      <Dialog
        open={bookToDelete !== null}
        onClose={closeDeleteDialog}
        fullWidth
        maxWidth="xs"
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
            fontWeight: 750,
          }}
        >
          {t("books.deleteTitle")}
        </DialogTitle>

        <DialogContent>
          <Typography>
            {t("books.deleteMessage", {
              title: bookToDelete?.title ?? "",
            })}
          </Typography>
        </DialogContent>

        <DialogActions
          sx={{
            paddingX: 3,
            paddingBottom: 2.5,
          }}
        >
          <Button
            type="button"
            onClick={closeDeleteDialog}
            sx={{
              textTransform: "none",
            }}
          >
            {t("common.cancel")}
          </Button>

          <Button
            type="button"
            variant="contained"
            color="error"
            onClick={confirmDeleteBook}
            sx={{
              textTransform: "none",
            }}
          >
            {t("common.delete")}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default BooksPage;
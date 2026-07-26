import type {
  Dispatch,
  SetStateAction,
} from "react";
import { useState } from "react";
import {
  Box,
  Button,
  TextField,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import PageHeader from "../../../../shared/ui/PageHeader";
import ConfirmDialog from "../../../../shared/ui/ConfirmDialog";

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
  const { t } = useTranslation();

  const [isBookDialogOpen, setIsBookDialogOpen] =
    useState(false);

  const [selectedBook, setSelectedBook] =
    useState<Book | undefined>(undefined);

  const [detailsBook, setDetailsBook] =
    useState<Book | null>(null);

  const [bookToDelete, setBookToDelete] =
    useState<Book | null>(null);

  const [searchTerm, setSearchTerm] = useState("");

  function removeCurrentFocus() {
    const activeElement = document.activeElement;
  
    if (activeElement instanceof HTMLElement) {
      activeElement.blur();
    }
  }
  function openAddBookDialog() {
    removeCurrentFocus();
    setSelectedBook(undefined);
    setIsBookDialogOpen(true);
  }

  function openEditBookDialog(book: Book) {
    removeCurrentFocus();
    setSelectedBook(book);
    setIsBookDialogOpen(true);
  }

  function closeBookDialog() {
    setIsBookDialogOpen(false);
    setSelectedBook(undefined);
  }

  function openBookDetails(book: Book) {
    removeCurrentFocus();
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
    removeCurrentFocus();
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


  const filteredBooks = books.filter((book) => {
    const searchValue = searchTerm
      .toLocaleLowerCase("tr-TR")
      .trim();
  
    return (
      book.title
        .toLocaleLowerCase("tr-TR")
        .includes(searchValue) ||
      book.author
        .toLocaleLowerCase("tr-TR")
        .includes(searchValue)
    );
  });

  return (
    <Box>
    
          <PageHeader
        title={t("books.title")}
        actions={
          <Button
            type="button"
            variant="contained"
            startIcon={<AddIcon />}
            onClick={openAddBookDialog}
          >
            {t("books.addButton")}
          </Button>
        }
      />

            <TextField
        fullWidth
        type="search"
        label={t("books.searchLabel")}
        placeholder={t("books.searchPlaceholder")}
        value={searchTerm}
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
        sx={{
          marginBottom: 3,
        }}
      />
      <BookList
         books={filteredBooks}
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

      <ConfirmDialog
        open={bookToDelete !== null}
        title={t("books.deleteTitle")}
        message={t("books.deleteMessage", {
          title: bookToDelete?.title ?? "",
        })}
        onConfirm={confirmDeleteBook}
        onCancel={closeDeleteDialog}
      />
    </Box>
  );
}

export default BooksPage;
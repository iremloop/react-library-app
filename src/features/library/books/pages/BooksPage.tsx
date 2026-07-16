import { useState } from "react";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";

import type { Book } from "../model/types";
import { getBooks } from "../api/client";

import BookList from "../ui/BookList";
import BookDialog from "../ui/BookDialog";

import ConfirmDialog from "../../../../shared/ui/ConfirmDialog";
import PageHeader from "../../../../shared/ui/PageHeader";

function BooksPage() {
  const { t } = useTranslation();

  const [books, setBooks] = useState(getBooks);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [selectedBook, setSelectedBook] = useState<
    Book | undefined
  >();

  const [bookToDelete, setBookToDelete] = useState<
    Book | undefined
  >();

  function addBook(title: string, author: string) {
    const newBook: Book = {
      id: books.length + 1,
      title,
      author,
    };

    setBooks([...books, newBook]);
    closeDialog();
  }

  function updateBook(title: string, author: string) {
    if (!selectedBook) {
      return;
    }

    const updatedBooks = books.map((book) =>
      book.id === selectedBook.id
        ? {
            ...book,
            title,
            author,
          }
        : book
    );

    setBooks(updatedBooks);
    closeDialog();
  }

  function requestDeleteBook(id: number) {
    const foundBook = books.find(
      (book) => book.id === id
    );

    setBookToDelete(foundBook);
  }

  function confirmDeleteBook() {
    if (!bookToDelete) {
      return;
    }

    const updatedBooks = books.filter(
      (book) => book.id !== bookToDelete.id
    );

    setBooks(updatedBooks);
    setBookToDelete(undefined);
  }

  function cancelDeleteBook() {
    setBookToDelete(undefined);
  }

  function editBook(book: Book) {
    setSelectedBook(book);
    setIsDialogOpen(true);
  }

  function openDialog() {
    setSelectedBook(undefined);
    setIsDialogOpen(true);
  }

  function closeDialog() {
    setSelectedBook(undefined);
    setIsDialogOpen(false);
  }

  return (
    <div className="books-page">
      <PageHeader
        title={t("books.title")}
        actions={
          <Button
            variant="contained"
            onClick={openDialog}
          >
            {t("books.addButton")}
          </Button>
        }
      />

      <BookDialog
        open={isDialogOpen}
        onClose={closeDialog}
        onSubmit={
          selectedBook ? updateBook : addBook
        }
        initialBook={selectedBook}
      />

      <BookList
        books={books}
        onDeleteBook={requestDeleteBook}
        onEditBook={editBook}
      />

      <ConfirmDialog
        open={Boolean(bookToDelete)}
        title={t("books.deleteTitle")}
        message={
          bookToDelete
            ? t("books.deleteMessage", {
                title: bookToDelete.title,
              })
            : ""
        }
        onConfirm={confirmDeleteBook}
        onCancel={cancelDeleteBook}
      />
    </div>
  );
}

export default BooksPage;
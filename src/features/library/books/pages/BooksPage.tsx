import {
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";

import type { Book } from "../model/types";
import type { Loan } from "../../loans/model/types";

import BookList from "../ui/BookList";
import BookDialog from "../ui/BookDialog";

import ConfirmDialog from "../../../../shared/ui/ConfirmDialog";
import PageHeader from "../../../../shared/ui/PageHeader";

type BooksPageProps = {
  books: Book[];
  setBooks: Dispatch<
    SetStateAction<Book[]>
  >;
  setLoans: Dispatch<
    SetStateAction<Loan[]>
  >;
};

function BooksPage({
  books,
  setBooks,
  setLoans,
}: BooksPageProps) {
  const { t } = useTranslation();

  const [isDialogOpen, setIsDialogOpen] =
    useState(false);

  const [selectedBook, setSelectedBook] =
    useState<Book | undefined>();

  const [bookToDelete, setBookToDelete] =
    useState<Book | undefined>();

  function addBook(
    title: string,
    author: string,
  ) {
    const newBook: Book = {
      id: Date.now(),
      title,
      author,
    };

    setBooks((currentBooks) => [
      ...currentBooks,
      newBook,
    ]);

    closeDialog();
  }

  function updateBook(
    title: string,
    author: string,
  ) {
    if (!selectedBook) {
      return;
    }

    setBooks((currentBooks) =>
      currentBooks.map((book) =>
        book.id === selectedBook.id
          ? {
              ...book,
              title,
              author,
            }
          : book,
      ),
    );

    closeDialog();
  }

  function requestDeleteBook(id: number) {
    const foundBook = books.find(
      (book) => book.id === id,
    );

    setBookToDelete(foundBook);
  }

  function confirmDeleteBook() {
    if (!bookToDelete) {
      return;
    }

    const deletedBookId = bookToDelete.id;

    setBooks((currentBooks) =>
      currentBooks.filter(
        (book) =>
          book.id !== deletedBookId,
      ),
    );

    setLoans((currentLoans) =>
      currentLoans.filter(
        (loan) =>
          loan.bookId !== deletedBookId,
      ),
    );

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
          selectedBook
            ? updateBook
            : addBook
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
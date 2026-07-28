import {
  useEffect,
  useState,
} from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import BooksPage from "../features/library/books/pages/BooksPage";
import LoansPage from "../features/library/loans/pages/LoansPage";

import { getBooks } from "../features/library/books/api/client";
import { getLoans } from "../features/library/loans/api/client";

import type { Book } from "../features/library/books/model/types";
import type { Loan } from "../features/library/loans/model/types";

import "./styles/App.css";

import { z } from "zod";

type Page = "books" | "loans";

const bookSchema = z.object({
  id: z.number(),
  title: z.string(),
  author: z.string(),
  genre: z.string(),
  coverUrl: z.string(),
  summary: z.string(),
  pageCount: z.number(),
  publicationYear: z.number(),
  isbn: z.string(),
  publisher: z.string(),
  language: z.string(),
});

const booksSchema = z.array(bookSchema);

const loanSchema = z.object({
  id: z.number(),
  bookId: z.number(),
  bookTitle: z.string(),
  bookAuthor: z.string(),
  borrower: z.string(),
  loanDate: z.string(),
  plannedReturnDate: z.string(),
  actualReturnDate: z.string(),
});

const loansSchema = z.array(loanSchema);

function readStoredBooks(): Book[] {
  try {
    const storedBooks =
      localStorage.getItem("library-books");

    if (!storedBooks) {
      return getBooks();
    }

    const parsedBooks: unknown =
      JSON.parse(storedBooks);

    const result =
      booksSchema.safeParse(parsedBooks);

      if (!result.success) {
        return getBooks();
      }

      return result.data;
    } catch {
      return getBooks();
    }
  }

function readStoredLoans(): Loan[] {
  try {
    const storedLoans =
      localStorage.getItem("library-loans");

    if (!storedLoans) {
      return getLoans();
    }

const parsedLoans: unknown =
      JSON.parse(storedLoans);

    const result =
      loansSchema.safeParse(parsedLoans);

    if (!result.success) {
      return getLoans();
    }

    return result.data;
  } catch {
    return getLoans();
  }
}

function App() {
  const { t, i18n } = useTranslation();

  const [activePage, setActivePage] =
    useState<Page>("books");

  const [books, setBooks] =
    useState<Book[]>(readStoredBooks);

  const [loans, setLoans] =
    useState<Loan[]>(readStoredLoans);

  useEffect(() => {
    localStorage.setItem(
      "library-books",
      JSON.stringify(books),
    );
  }, [books]);

  useEffect(() => {
    localStorage.setItem(
      "library-loans",
      JSON.stringify(loans),
    );
  }, [loans]);

  function changeLanguage() {
    const newLanguage =
      i18n.language.startsWith("tr")
        ? "en"
        : "tr";

    void i18n.changeLanguage(newLanguage);
  }

  function changePage(
    _event: React.SyntheticEvent,
    newPage: Page,
  ) {
    setActivePage(newPage);
  }

  function handleDeleteBook(bookId: number) {
    setBooks((currentBooks) =>
      currentBooks.filter(
        (book) => book.id !== bookId,
      ),
    );
  
    setLoans((currentLoans) =>
      currentLoans.filter(
        (loan) => loan.bookId !== bookId,
      ),
    );
  }

  return (
    <Box className="app">
      <AppBar
        position="static"
        elevation={0}
        className="main-app-bar"
      >
        <Container maxWidth={false}>
          <Toolbar
            disableGutters
            className="main-toolbar"
          >
            <Box className="brand-area">
              <Box className="brand-icon">
                📚
              </Box>

              <Box>
                <Typography
                  variant="h5"
                  component="h1"
                  className="brand-title"
                >
                  {t("app.title")}
                </Typography>

                <Typography
                  variant="body2"
                  className="brand-subtitle"
                >
                  {t("app.subtitle")}
                </Typography>
              </Box>
            </Box>

            <Button
              variant="outlined"
              onClick={changeLanguage}
              className="language-button"
            >
              🌐{" "}
              {i18n.language.startsWith("tr")
                ? "EN"
                : "TR"}
            </Button>
          </Toolbar>

          <Box className="navigation-row">
            <Tabs
              value={activePage}
              onChange={changePage}
              aria-label={t("navigation.mainNavigation")}
              className="navigation-tabs"
            >
              <Tab
                value="books"
                label={
                  <Box className="tab-label">
                    <span>📘</span>
                    <span>
                      {t("navigation.books")}
                    </span>
                  </Box>
                }
              />

              <Tab
                value="loans"
                label={
                  <Box className="tab-label">
                    <span>📋</span>
                    <span>
                      {t("navigation.loans")}
                    </span>
                  </Box>
                }
              />
            </Tabs>
          </Box>
        </Container>
      </AppBar>

          <Container
            maxWidth={false}
            className="page-container"
          >
        {activePage === "books" ? (
          <BooksPage
            books={books}
            setBooks={setBooks}
            onDeleteBook={handleDeleteBook}
          />
        ) : (
          <LoansPage
            books={books}
            loans={loans}
            setLoans={setLoans}
          />
        )}
      </Container>
    </Box>
  );
}

export default App;
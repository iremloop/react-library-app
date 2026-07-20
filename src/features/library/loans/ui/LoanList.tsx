import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import type { Book } from "../../books/model/types";
import type { Loan } from "../model/types";

import DataTable from "../../../../shared/ui/DataTable";
import TableState from "../../../../shared/ui/TableState";

type LoanListProps = {
  books: Book[];
  loans: Loan[];
  onCreateLoan: (book: Book) => void;
  onEditLoan: (
    book: Book,
    loan: Loan,
  ) => void;
};

type ActiveLoanRow = {
  book: Book;
  loan?: Loan;
};

type ReturnedLoanRow = {
  book: Book;
  loan: Loan;
};

function normalizeText(value: string) {
  return value
    .trim()
    .toLocaleLowerCase("tr-TR");
}

function formatDate(value: string) {
  if (!value) {
    return "-";
  }

  const [year, month, day] =
    value.split("-");

  return `${day}.${month}.${year}`;
}

function dateToUtc(value: string) {
  const [year, month, day] =
    value.split("-").map(Number);

  return Date.UTC(
    year,
    month - 1,
    day,
  );
}

function getTodayAsDateString() {
  const now = new Date();

  const year = now.getFullYear();

  const month = String(
    now.getMonth() + 1,
  ).padStart(2, "0");

  const day = String(
    now.getDate(),
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getDayDifference(
  laterDate: string,
  earlierDate: string,
) {
  const millisecondsPerDay =
    1000 * 60 * 60 * 24;

  return Math.max(
    0,
    Math.floor(
      (dateToUtc(laterDate) -
        dateToUtc(earlierDate)) /
        millisecondsPerDay,
    ),
  );
}

function SectionTitle({
  title,
  count,
  tone,
}: {
  title: string;
  count: number;
  tone: "active" | "returned";
}) {
  const isActive = tone === "active";

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        marginBottom: 2,
        padding: {
          xs: "14px 16px",
          sm: "16px 18px",
        },
        borderRadius: 3,
        border: "1px solid",
        borderColor: isActive
          ? "primary.light"
          : "success.light",
        backgroundColor: isActive
          ? "rgba(37, 99, 235, 0.08)"
          : "rgba(22, 163, 74, 0.08)",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          color: isActive
            ? "primary.dark"
            : "success.dark",
          fontWeight: 750,
          fontSize: {
            xs: "1.15rem",
            sm: "1.35rem",
          },
          lineHeight: 1.25,
        }}
      >
        {title}
      </Typography>

      <Box
        sx={{
          minWidth: 34,
          height: 34,
          paddingX: 1.2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 999,
          backgroundColor: isActive
            ? "primary.main"
            : "success.main",
          color: "white",
          fontSize: 14,
          fontWeight: 750,
          flexShrink: 0,
        }}
      >
        {count}
      </Box>
    </Box>
  );
}

function LoanList({
  books,
  loans,
  onCreateLoan,
  onEditLoan,
}: LoanListProps) {
  const { t } = useTranslation();

  const [searchText, setSearchText] =
    useState("");

  const activeRows: ActiveLoanRow[] =
    books.map((book) => {
      const activeLoan = loans
        .filter(
          (loan) =>
            loan.bookId === book.id &&
            !loan.actualReturnDate,
        )
        .sort(
          (firstLoan, secondLoan) =>
            secondLoan.id - firstLoan.id,
        )[0];

      return {
        book,
        loan: activeLoan,
      };
    });

  const returnedRows: ReturnedLoanRow[] =
    loans
      .filter((loan) =>
        Boolean(loan.actualReturnDate),
      )
      .map((loan) => {
        const book = books.find(
          (currentBook) =>
            currentBook.id === loan.bookId,
        );

        if (!book) {
          return undefined;
        }

        return {
          book,
          loan,
        };
      })
      .filter(
        (
          row,
        ): row is ReturnedLoanRow =>
          row !== undefined,
      )
      .sort(
        (firstRow, secondRow) =>
          secondRow.loan.actualReturnDate
            .localeCompare(
              firstRow.loan.actualReturnDate,
            ),
      );

  const normalizedSearch =
    normalizeText(searchText);

  const filteredActiveRows =
    activeRows.filter((row) => {
      if (!normalizedSearch) {
        return true;
      }

      const bookTitle = normalizeText(
        row.book.title,
      );

      const author = normalizeText(
        row.book.author,
      );

      const borrower = normalizeText(
        row.loan?.borrower ?? "",
      );

      return (
        bookTitle.includes(
          normalizedSearch,
        ) ||
        author.includes(
          normalizedSearch,
        ) ||
        borrower.includes(
          normalizedSearch,
        )
      );
    });

  const filteredReturnedRows =
    returnedRows.filter((row) => {
      if (!normalizedSearch) {
        return true;
      }

      const bookTitle = normalizeText(
        row.book.title,
      );

      const author = normalizeText(
        row.book.author,
      );

      const borrower = normalizeText(
        row.loan.borrower,
      );

      return (
        bookTitle.includes(
          normalizedSearch,
        ) ||
        author.includes(
          normalizedSearch,
        ) ||
        borrower.includes(
          normalizedSearch,
        )
      );
    });

  const activeColumns = [
    {
      key: "book",
      header: t("loans.book"),
      render: (row: ActiveLoanRow) =>
        row.book.title,
    },
    {
      key: "author",
      header: t("books.authorLabel"),
      render: (row: ActiveLoanRow) =>
        row.book.author,
    },
    {
      key: "borrower",
      header: t("loans.borrower"),
      render: (row: ActiveLoanRow) =>
        row.loan?.borrower ?? "-",
    },
    {
      key: "loanDate",
      header: t("loans.loanDate"),
      render: (row: ActiveLoanRow) =>
        formatDate(
          row.loan?.loanDate ?? "",
        ),
    },
    {
      key: "plannedReturnDate",
      header: t(
        "loans.plannedReturnDate",
      ),
      render: (row: ActiveLoanRow) =>
        formatDate(
          row.loan?.plannedReturnDate ??
            "",
        ),
    },
    {
      key: "status",
      header: t("loans.status"),
      render: (row: ActiveLoanRow) => {
        if (!row.loan) {
          return (
            <Typography
              sx={{
                color: "success.main",
                fontWeight: 700,
              }}
            >
              {t(
                "loans.statusValues.available",
              )}
            </Typography>
          );
        }

        const today =
          getTodayAsDateString();

        if (
          today >
          row.loan.plannedReturnDate
        ) {
          const lateDays =
            getDayDifference(
              today,
              row.loan
                .plannedReturnDate,
            );

          return (
            <Typography
              sx={{
                color: "error.main",
                fontWeight: 700,
              }}
            >
              {t("loans.daysOverdue", {
                count: lateDays,
              })}
            </Typography>
          );
        }

        return (
          <Typography
            sx={{
              color: "warning.main",
              fontWeight: 700,
            }}
          >
            {t(
              "loans.statusValues.borrowed",
            )}
          </Typography>
        );
      },
    },
    {
      key: "actions",
      header: t("common.actions"),
      render: (row: ActiveLoanRow) =>
        row.loan ? (
          <Button
            size="small"
            variant="outlined"
            onClick={() =>
              onEditLoan(
                row.book,
                row.loan!,
              )
            }
            sx={{
              minWidth: 88,
              borderRadius: 2,
              textTransform: "none",
            }}
          >
            {t("common.edit")}
          </Button>
        ) : (
          <Button
            size="small"
            variant="contained"
            onClick={() =>
              onCreateLoan(row.book)
            }
            sx={{
              minWidth: 100,
              borderRadius: 2,
              textTransform: "none",
            }}
          >
            {t("loans.create")}
          </Button>
        ),
    },
  ];

  const returnedColumns = [
    {
      key: "book",
      header: t("loans.book"),
      render: (
        row: ReturnedLoanRow,
      ) => row.book.title,
    },
    {
      key: "borrower",
      header: t("loans.borrower"),
      render: (
        row: ReturnedLoanRow,
      ) => row.loan.borrower,
    },
    {
      key: "loanDate",
      header: t("loans.loanDate"),
      render: (
        row: ReturnedLoanRow,
      ) =>
        formatDate(row.loan.loanDate),
    },
    {
      key: "plannedReturnDate",
      header: t(
        "loans.plannedReturnDate",
      ),
      render: (
        row: ReturnedLoanRow,
      ) =>
        formatDate(
          row.loan.plannedReturnDate,
        ),
    },
    {
      key: "actualReturnDate",
      header: t(
        "loans.actualReturnDate",
      ),
      render: (
        row: ReturnedLoanRow,
      ) =>
        formatDate(
          row.loan.actualReturnDate,
        ),
    },
    {
      key: "result",
      header: t("loans.result"),
      render: (
        row: ReturnedLoanRow,
      ) => {
        const isLate =
          row.loan.actualReturnDate >
          row.loan.plannedReturnDate;

        if (!isLate) {
          return (
            <Typography
              sx={{
                color: "success.main",
                fontWeight: 700,
              }}
            >
              {t("loans.returnedOnTime")}
            </Typography>
          );
        }

        const lateDays =
          getDayDifference(
            row.loan.actualReturnDate,
            row.loan
              .plannedReturnDate,
          );

        return (
          <Typography
            sx={{
              color: "error.main",
              fontWeight: 700,
            }}
          >
            {t("loans.returnedLate", {
              count: lateDays,
            })}
          </Typography>
        );
      },
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: {
          xs: 5,
          sm: 6,
        },
      }}
    >
      <TextField
        label={t("loans.searchLabel")}
        placeholder={t(
          "loans.searchPlaceholder",
        )}
        value={searchText}
        onChange={(event) =>
          setSearchText(
            event.target.value,
          )
        }
        fullWidth
      />

      <Box
        component="section"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <SectionTitle
          title={t(
            "loans.activeTableTitle",
          )}
          count={filteredActiveRows.length}
          tone="active"
        />

        {filteredActiveRows.length ===
        0 ? (
          <TableState
            empty
            emptyMessage={t(
              "loans.noSearchResults",
            )}
          />
        ) : (
          <DataTable
            data={filteredActiveRows}
            columns={activeColumns}
            getRowKey={(row) =>
              row.book.id
            }
          />
        )}
      </Box>

      <Box
        component="section"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          paddingTop: {
            xs: 1,
            sm: 2,
          },
        }}
      >
        <SectionTitle
          title={t(
            "loans.returnedTableTitle",
          )}
          count={filteredReturnedRows.length}
          tone="returned"
        />

        {filteredReturnedRows.length ===
        0 ? (
          <TableState
            empty
            emptyMessage={
              normalizedSearch
                ? t(
                    "loans.noSearchResults",
                  )
                : t(
                    "loans.noReturnedLoans",
                  )
            }
          />
        ) : (
          <DataTable
            data={filteredReturnedRows}
            columns={returnedColumns}
            getRowKey={(row) =>
              row.loan.id
            }
          />
        )}
      </Box>
    </Box>
  );
}

export default LoanList;  
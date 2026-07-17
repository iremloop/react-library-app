import {
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { useTranslation } from "react-i18next";

import type { Book } from "../../books/model/types";
import type { Loan } from "../model/types";

import LoanList from "../ui/LoanList";
import LoanDialog, {
  type LoanFormValues,
} from "../ui/LoanDialog";

import ConfirmDialog from "../../../../shared/ui/ConfirmDialog";
import PageHeader from "../../../../shared/ui/PageHeader";

type LoansPageProps = {
  books: Book[];
  loans: Loan[];
  setLoans: Dispatch<
    SetStateAction<Loan[]>
  >;
};

type PendingLoan = {
  bookId: number;
  bookTitle: string;
  values: LoanFormValues;
  lateReturnCount: number;
};

const LATE_RETURN_WARNING_LIMIT = 3;

function normalizeBorrowerName(
  borrower: string,
) {
  return borrower
    .trim()
    .toLocaleLowerCase("tr-TR");
}

function getLateReturnCount(
  borrower: string,
  loans: Loan[],
) {
  const normalizedBorrower =
    normalizeBorrowerName(borrower);

  return loans.filter((loan) => {
    if (!loan.actualReturnDate) {
      return false;
    }

    const belongsToSamePerson =
      normalizeBorrowerName(
        loan.borrower,
      ) === normalizedBorrower;

    const wasReturnedLate =
      loan.actualReturnDate >
      loan.plannedReturnDate;

    return (
      belongsToSamePerson &&
      wasReturnedLate
    );
  }).length;
}

function LoansPage({
  books,
  loans,
  setLoans,
}: LoansPageProps) {
  const { t } = useTranslation();

  const [isDialogOpen, setIsDialogOpen] =
    useState(false);

  const [selectedBook, setSelectedBook] =
    useState<Book | undefined>();

  const [selectedLoan, setSelectedLoan] =
    useState<Loan | undefined>();

  const [pendingLoan, setPendingLoan] =
    useState<PendingLoan | undefined>();

  function openCreateDialog(book: Book) {
    const hasActiveLoan = loans.some(
      (loan) =>
        loan.bookId === book.id &&
        !loan.actualReturnDate,
    );

    if (hasActiveLoan) {
      return;
    }

    setSelectedBook(book);
    setSelectedLoan(undefined);
    setIsDialogOpen(true);
  }

  function openEditDialog(
    book: Book,
    loan: Loan,
  ) {
    setSelectedBook(book);
    setSelectedLoan(loan);
    setIsDialogOpen(true);
  }

  function closeDialog() {
    setSelectedBook(undefined);
    setSelectedLoan(undefined);
    setIsDialogOpen(false);
  }

  function createLoanDirectly(
    bookId: number,
    values: LoanFormValues,
  ) {
    const hasActiveLoan = loans.some(
      (loan) =>
        loan.bookId === bookId &&
        !loan.actualReturnDate,
    );

    if (hasActiveLoan) {
      return;
    }

    const newLoan: Loan = {
      id: Date.now(),
      bookId,
      borrower: values.borrower,
      loanDate: values.loanDate,
      plannedReturnDate:
        values.plannedReturnDate,
      actualReturnDate: "",
    };

    setLoans((currentLoans) => [
      ...currentLoans,
      newLoan,
    ]);

    closeDialog();
  }

  function createLoan(
    values: LoanFormValues,
  ) {
    if (!selectedBook) {
      return;
    }

    const lateReturnCount =
      getLateReturnCount(
        values.borrower,
        loans,
      );

    if (
      lateReturnCount >=
      LATE_RETURN_WARNING_LIMIT
    ) {
      setPendingLoan({
        bookId: selectedBook.id,
        bookTitle: selectedBook.title,
        values,
        lateReturnCount,
      });

      closeDialog();
      return;
    }

    createLoanDirectly(
      selectedBook.id,
      values,
    );
  }

  function confirmRiskyLoan() {
    if (!pendingLoan) {
      return;
    }

    createLoanDirectly(
      pendingLoan.bookId,
      pendingLoan.values,
    );

    setPendingLoan(undefined);
  }

  function cancelRiskyLoan() {
    setPendingLoan(undefined);
  }

  function updateLoan(
    values: LoanFormValues,
  ) {
    if (!selectedLoan) {
      return;
    }

    setLoans((currentLoans) =>
      currentLoans.map((loan) =>
        loan.id === selectedLoan.id
          ? {
              ...loan,
              borrower:
                values.borrower,
              loanDate:
                values.loanDate,
              plannedReturnDate:
                values.plannedReturnDate,
              actualReturnDate:
                values.actualReturnDate,
            }
          : loan,
      ),
    );

    closeDialog();
  }

  return (
    <div className="books-page">
      <PageHeader
        title={t("loans.title")}
      />

      <LoanList
        books={books}
        loans={loans}
        onCreateLoan={openCreateDialog}
        onEditLoan={openEditDialog}
      />

      <LoanDialog
        open={isDialogOpen}
        book={selectedBook}
        initialLoan={selectedLoan}
        onClose={closeDialog}
        onSubmit={
          selectedLoan
            ? updateLoan
            : createLoan
        }
      />

      <ConfirmDialog
        open={Boolean(pendingLoan)}
        title={t(
          "loans.riskyBorrowerTitle",
        )}
        message={
          pendingLoan
            ? t(
                "loans.riskyBorrowerMessage",
                {
                  borrower:
                    pendingLoan.values
                      .borrower,
                  count:
                    pendingLoan
                      .lateReturnCount,
                  book:
                    pendingLoan.bookTitle,
                },
              )
            : ""
        }
        onConfirm={confirmRiskyLoan}
        onCancel={cancelRiskyLoan}
      />
    </div>
  );
}

export default LoansPage;
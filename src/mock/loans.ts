import type { LoanDto } from "../features/library/loans/api/types";

export const loanDtos: LoanDto[] = [
    {
        id: "loan-1",
        bookId: "book-1",
        bookTitle: "Suç ve Ceza",
        borrower: "Ayşe Yılmaz",
        dueDate: "2026-07-20",
        returned: false,
      },
      {
        id: "loan-2",
        bookId: "book-2",
        bookTitle: "1984",
        borrower: "Mehmet Kaya",
        dueDate: "2026-07-18",
        returned: true,
      },
      {
        id: "loan-3",
        bookId: "book-3",
        bookTitle: "Simyacı",
        borrower: "Zeynep Demir",
        dueDate: "2026-07-25",
        returned: false,
      },
  ];
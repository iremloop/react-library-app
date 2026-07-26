import type { LoanDto } from "../features/library/loans/api/types";

export const mockLoans: LoanDto[] = [
  {
    id: 1,
    book_id: 1,
    book_title: "Suç ve Ceza",
    book_author: "Dostoyevski",
    borrower: "Ayşe Yılmaz",
    loan_date: "2026-07-01",
    planned_return_date: "2026-07-15",
    actual_return_date: null,
  },
  {
    id: 2,
    book_id: 2,
    book_title: "1984",
    book_author: "George Orwell",
    borrower: "Mehmet Kaya",
    loan_date: "2026-06-01",
    planned_return_date: "2026-06-15",
    actual_return_date: "2026-06-18",
  },
  {
    id: 3,
    book_id: 3,
    book_title: "Simyacı",
    book_author: "Paulo Coelho",
    borrower: "Zeynep Demir",
    loan_date: "2026-05-10",
    planned_return_date: "2026-05-24",
    actual_return_date: "2026-05-22",
  },
];
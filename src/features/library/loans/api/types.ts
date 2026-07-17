export type LoanDto = {
  id: number;
  book_id: number;
  borrower: string;
  loan_date: string;
  planned_return_date: string;
  actual_return_date: string | null;
};
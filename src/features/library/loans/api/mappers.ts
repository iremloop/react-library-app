import type { LoanDto } from "./types";
import type { Loan } from "../model/types";

export function toLoan(dto: LoanDto): Loan {
  return {
    id: dto.id,
    bookId: dto.book_id,
    borrower: dto.borrower,
    loanDate: dto.loan_date,
    plannedReturnDate:
      dto.planned_return_date,
    actualReturnDate:
      dto.actual_return_date ?? "",
  };
}
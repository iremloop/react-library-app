import type { LoanDto } from "./types";
import type { Loan } from "../model/types";

export function toLoan(dto: LoanDto): Loan {
  return {
    id: dto.id,
    bookTitle: dto.bookTitle,
    borrower: dto.borrower,
    dueDate: dto.dueDate,
    statusLabelKey: dto.returned
      ? "loans.status.returned"
      : "loans.status.notReturned",
  };
}
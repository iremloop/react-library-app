export type Loan = {
  id: number;
  bookId: number;
  bookTitle: string;
  bookAuthor: string,
  borrower: string;
  loanDate: string;
  plannedReturnDate: string;
  actualReturnDate: string;
};

export type LoanBook = {
  id: number;
  title: string;
  author: string;
};
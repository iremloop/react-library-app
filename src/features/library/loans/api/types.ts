export type LoanDto = {
    id: string;
    bookId: string;
    bookTitle: string;
    borrower: string;
    dueDate: string;
    returned: boolean;
  };
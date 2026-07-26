import { useState
  } from "react";
  import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    TextField,
  } from "@mui/material";
  import { useTranslation } from "react-i18next";
  
  import type { Loan , LoanBook } from "../model/types";
  
  export type LoanFormValues = {
    borrower: string;
    loanDate: string;
    plannedReturnDate: string;
    actualReturnDate: string;
  };
  
  type LoanDialogProps = {
    open: boolean;
    book?: LoanBook;
    initialLoan?: Loan;
    onClose: () => void;
    onSubmit: (
      values: LoanFormValues,
    ) => void;
  };
  
  function LoanDialogForm({
    book,
    initialLoan,
    onClose,
    onSubmit,
  }: Omit<LoanDialogProps, "open">) {
    const { t } = useTranslation();
  
    const [borrower, setBorrower] = useState(
      initialLoan?.borrower ?? "",
    );
    
    const [loanDate, setLoanDate] = useState(
      initialLoan?.loanDate ?? "",
    );
    
    const [
      plannedReturnDate,
      setPlannedReturnDate,
    ] = useState(
      initialLoan?.plannedReturnDate ?? "",
    );
    
    const [
      actualReturnDate,
      setActualReturnDate,
    ] = useState(
      initialLoan?.actualReturnDate ?? "",
    );
  
    const [
      borrowerError,
      setBorrowerError,
    ] = useState("");
  
    const [
      loanDateError,
      setLoanDateError,
    ] = useState("");
  
    const [
      plannedReturnDateError,
      setPlannedReturnDateError,
    ] = useState("");
  
    const [
      actualReturnDateError,
      setActualReturnDateError,
    ] = useState("");
  
  
    function handleSubmit() {
      const cleanBorrower = borrower.trim();
  
      let hasError = false;
  
      if (!cleanBorrower) {
        setBorrowerError(
          t("loans.borrowerRequired"),
        );
        hasError = true;
      } else {
        setBorrowerError("");
      }
  
      if (!loanDate) {
        setLoanDateError(
          t("loans.loanDateRequired"),
        );
        hasError = true;
      } else {
        setLoanDateError("");
      }
  
      if (!plannedReturnDate) {
        setPlannedReturnDateError(
          t(
            "loans.plannedReturnDateRequired",
          ),
        );
        hasError = true;
      } else if (
        loanDate &&
        plannedReturnDate < loanDate
      ) {
        setPlannedReturnDateError(
          t(
            "loans.plannedDateBeforeLoanDate",
          ),
        );
        hasError = true;
      } else {
        setPlannedReturnDateError("");
      }
  
      if (
        actualReturnDate &&
        loanDate &&
        actualReturnDate < loanDate
      ) {
        setActualReturnDateError(
          t(
            "loans.actualDateBeforeLoanDate",
          ),
        );
        hasError = true;
      } else {
        setActualReturnDateError("");
      }
  
      if (hasError) {
        return;
      }
  
      onSubmit({
        borrower: cleanBorrower,
        loanDate,
        plannedReturnDate,
        actualReturnDate,
      });
    }
  

return (
  <>
    <DialogTitle>
      {initialLoan
        ? t("loans.edit")
        : t("loans.create")}
    </DialogTitle>
  
        <DialogContent>
          <Stack
            spacing={2}
            sx={{ marginTop: 1 }}
          >
            <TextField
              label={t("loans.book")}
              value={book?.title ?? ""}
              disabled
              fullWidth
            />
  
            <TextField
              label={t("loans.borrower")}
              value={borrower}
              onChange={(event) =>
                setBorrower(
                  event.target.value,
                )
              }
              error={Boolean(
                borrowerError,
              )}
              helperText={borrowerError}
              fullWidth
            />
  
            <TextField
              label={t("loans.loanDate")}
              type="date"
              value={loanDate}
              onChange={(event) =>
                setLoanDate(
                  event.target.value,
                )
              }
              error={Boolean(
                loanDateError,
              )}
              helperText={loanDateError}
              fullWidth
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
  
            <TextField
              label={t(
                "loans.plannedReturnDate",
              )}
              type="date"
              value={plannedReturnDate}
              onChange={(event) =>
                setPlannedReturnDate(
                  event.target.value,
                )
              }
              error={Boolean(
                plannedReturnDateError,
              )}
              helperText={
                plannedReturnDateError
              }
              fullWidth
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
  
            {initialLoan && (
              <TextField
                label={t(
                  "loans.actualReturnDate",
                )}
                type="date"
                value={actualReturnDate}
                onChange={(event) =>
                  setActualReturnDate(
                    event.target.value,
                  )
                }
                error={Boolean(
                  actualReturnDateError,
                )}
                helperText={
                  actualReturnDateError ||
                  t(
                    "loans.actualReturnDateHint",
                  )
                }
                fullWidth
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            )}
          </Stack>
        </DialogContent>
  
        <DialogActions>
          <Button onClick={onClose}>
            {t("common.cancel")}
          </Button>
  
          <Button
            variant="contained"
            onClick={handleSubmit}
          >
            {t("common.save")}
          </Button>
        </DialogActions>
        </>
);
}

function LoanDialog({
  open,
  book,
  initialLoan,
  onClose,
  onSubmit,
}: LoanDialogProps) {
  const formKey = initialLoan
    ? `edit-${initialLoan.id}`
    : `create-${book?.id ?? "empty"}`;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      {open && (
        <LoanDialogForm
          key={formKey}
          book={book}
          initialLoan={initialLoan}
          onClose={onClose}
          onSubmit={onSubmit}
        />
      )}
    </Dialog>
  );
}
  
  export default LoanDialog;
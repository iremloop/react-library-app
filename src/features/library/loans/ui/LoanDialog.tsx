import {
    useEffect,
    useState,
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
  
  import type { Book } from "../../books/model/types";
  import type { Loan } from "../model/types";
  
  export type LoanFormValues = {
    borrower: string;
    loanDate: string;
    plannedReturnDate: string;
    actualReturnDate: string;
  };
  
  type LoanDialogProps = {
    open: boolean;
    book?: Book;
    initialLoan?: Loan;
    onClose: () => void;
    onSubmit: (
      values: LoanFormValues,
    ) => void;
  };
  
  function LoanDialog({
    open,
    book,
    initialLoan,
    onClose,
    onSubmit,
  }: LoanDialogProps) {
    const { t } = useTranslation();
  
    const [borrower, setBorrower] =
      useState("");
  
    const [loanDate, setLoanDate] =
      useState("");
  
    const [
      plannedReturnDate,
      setPlannedReturnDate,
    ] = useState("");
  
    const [
      actualReturnDate,
      setActualReturnDate,
    ] = useState("");
  
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
  
    useEffect(() => {
      if (!open) {
        return;
      }
  
      if (initialLoan) {
        setBorrower(initialLoan.borrower);
        setLoanDate(initialLoan.loanDate);
        setPlannedReturnDate(
          initialLoan.plannedReturnDate,
        );
        setActualReturnDate(
          initialLoan.actualReturnDate,
        );
      } else {
        setBorrower("");
        setLoanDate("");
        setPlannedReturnDate("");
        setActualReturnDate("");
      }
  
      setBorrowerError("");
      setLoanDateError("");
      setPlannedReturnDateError("");
      setActualReturnDateError("");
    }, [open, initialLoan]);
  
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
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="sm"
      >
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
      </Dialog>
    );
  }
  
  export default LoanDialog;
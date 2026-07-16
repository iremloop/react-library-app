import DataTable, {
    type DataTableColumn,
  } from "../../../../shared/ui/DataTable";
  
  import type { Loan } from "../model/types";
  import { formatDate } from "../../../../shared/utils/date";
  import TableState from "../../../../shared/ui/TableState";
  import { useTranslation } from "react-i18next";
  
  type LoanListProps = {
    loans: Loan[];
  };
  
  function LoanList({ loans }: LoanListProps) {
    const { t } = useTranslation();
    const columns: DataTableColumn<Loan>[] = [
      {
        key: "bookTitle",
        header: t("loans.book"),
        render: (loan) => loan.bookTitle,
      },
      {
        key: "borrower",
        header: t("loans.borrower"),
        render: (loan) => loan.borrower,
      },
      {
        key: "dueDate",
        header: t("loans.dueDate"),
        render: (loan) => formatDate(loan.dueDate),
      },
      {
        key: "status",
        header: t("loans.status"),
        render: (loan) =>
          loan.statusLabelKey === "loans.status.returned"
            ? t("loans.statusValues.returned")
            : t("loans.statusValues.notReturned"),
      },
    ];
  
    if (loans.length === 0) {
        return (
          <TableState
  empty
  emptyMessage={t("loans.empty")}
/>
        );
      }
      
    return (
      <DataTable
        data={loans}
        columns={columns}
        getRowKey={(loan) => loan.id}
      />
    );
  }
  
  export default LoanList;
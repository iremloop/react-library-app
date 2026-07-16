import { useTranslation } from "react-i18next";

import { getLoans } from "../api/client";
import LoanList from "../ui/LoanList";

import PageHeader from "../../../../shared/ui/PageHeader";

function LoansPage() {
  const { t } = useTranslation();

  const loans = getLoans();

  return (
    <div className="books-page">
      <PageHeader title={t("loans.title")} />

      <LoanList loans={loans} />
    </div>
  );
}

export default LoansPage;
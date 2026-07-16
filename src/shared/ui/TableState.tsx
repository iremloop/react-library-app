import { useTranslation } from "react-i18next";

type TableStateProps = {
  loading?: boolean;
  error?: string;
  empty?: boolean;
  emptyMessage: string;
};

function TableState({
  loading = false,
  error,
  empty = false,
  emptyMessage,
}: TableStateProps) {
  const { t } = useTranslation();

  if (loading) {
    return (
      <div className="table-state">
        {t("common.loading")}
      </div>
    );
  }

  if (error) {
    return (
      <div className="table-state table-state-error">
        {error}
      </div>
    );
  }

  if (empty) {
    return (
      <div className="table-state">
        {emptyMessage}
      </div>
    );
  }

  return null;
}

export default TableState;
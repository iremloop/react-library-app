import { useTranslation } from "react-i18next";

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

function ConfirmDialog({
  open,
  title,
  message,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const { t } = useTranslation();

  if (!open) {
    return null;
  }

  return (
    <div className="dialog-overlay">
      <div className="dialog-box">
        <h2>{title}</h2>

        <p>{message}</p>

        <div className="form-actions">
          <button
            className="secondary-button"
            onClick={onCancel}
          >
            {t("common.cancel")}
          </button>

          <button
            className="delete-button"
            onClick={onConfirm}
          >
            {t("common.delete")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
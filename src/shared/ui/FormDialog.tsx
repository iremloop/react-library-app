import type { ReactNode } from "react";

type FormDialogProps = {
  open: boolean;
  title: string;
  children: ReactNode;
};

function FormDialog({
  open,
  title,
  children,
}: FormDialogProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="dialog-overlay">
      <div className="dialog-box">
        <h2>{title}</h2>

        {children}
      </div>
    </div>
  );
}

export default FormDialog;
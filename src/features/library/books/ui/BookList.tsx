import { useTranslation } from "react-i18next";

import DataTable, {
  type DataTableColumn,
} from "../../../../shared/ui/DataTable";
import TableState from "../../../../shared/ui/TableState";

import type { Book } from "../model/types";

type BookListProps = {
  books: Book[];
  onDeleteBook: (id: number) => void;
  onEditBook: (book: Book) => void;
};

function BookList({
  books,
  onDeleteBook,
  onEditBook,
}: BookListProps) {
  const { t } = useTranslation();

  const columns: DataTableColumn<Book>[] = [
    {
      key: "title",
      header: t("books.titleLabel"),
      render: (book) => book.title,
    },
    {
      key: "author",
      header: t("books.authorLabel"),
      render: (book) => book.author,
    },
    {
      key: "actions",
      header: "",
      render: (book) => (
        <div className="book-actions">
          <button
            className="primary-button"
            onClick={() => onEditBook(book)}
          >
            {t("common.edit")}
          </button>

          <button
            className="delete-button"
            onClick={() => onDeleteBook(book.id)}
          >
            {t("common.delete")}
          </button>
        </div>
      ),
    },
  ];

  if (books.length === 0) {
    return (
      <TableState
        empty
        emptyMessage={t("books.empty")}
      />
    );
  }

  return (
    <DataTable
      data={books}
      columns={columns}
      getRowKey={(book) => book.id}
    />
  );
}

export default BookList;
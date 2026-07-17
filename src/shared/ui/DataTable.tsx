import type { ReactNode } from "react";

export type DataTableColumn<T> = {
  key: string;
  header: string;
  render: (item: T) => ReactNode;
};

type DataTableProps<T> = {
  data: T[];
  columns: DataTableColumn<T>[];
  getRowKey: (item: T) => string | number;
};

function DataTable<T>({
  data,
  columns,
  getRowKey,
}: DataTableProps<T>) {
  return (
    <div
      className="data-table-wrapper"
      role="region"
      aria-label="Veri tablosu"
      tabIndex={0}
    >
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>
                {column.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={getRowKey(item)}>
              {columns.map((column) => (
                <td
                  key={column.key}
                  data-label={column.header}
                >
                  {column.render(item)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
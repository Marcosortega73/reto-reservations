import React from "react";

type TableComponentProps = {
  rows: Array<any>;
  columns: Array<any>;
};
const TableComponent = ({ rows, columns }: TableComponentProps) => {
  return (
    
    <div className="overflow-x-auto">
      <table className="table-auto border-collapse w-full">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className="px-4 py-2 text-gray-600 bg-gray-100 border border-gray-300"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {row.map((cell, index) => (
                <td
                  key={index}
                  className="px-4 py-2 text-gray-600 border border-gray-300"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;

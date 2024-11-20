import { Reservation } from "@/interfaces";
import { ColumnsTable } from "@/interfaces/componentsTypes";
import React from "react";
import { CustomButton } from "./buttons";



type TableComponentProps = {
  rows: Reservation[];
  columns: ColumnsTable[];
  config?: {
    title?: string;
  };
  loading?: boolean;
  handleAction: (action: string, id?: number) => void;
};
export const TableComponent = ({
  rows,
  columns,
  config,
  loading,
  handleAction,
}: TableComponentProps) => {
  return (
    <div className="overflow-hidden rounded-lg bg-gray-900 shadow-lg p-5 flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-white">
          {config?.title || "Table"}
        </h2>
        <CustomButton label="Nuevo" onClick={() => handleAction("create")} />
      </div>
      <table className="table-auto w-full text-left text-sm text-gray-400">
        <thead className="bg-gray-800 text-xs uppercase text-gray-500">
          <tr>
            {columns.map((column, index) => (
              <th key={index} className={`px-6 py-3 text-${column?.align ?? "start"}`}>
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {loading ? (
            <tr>
              <td colSpan={columns.length} className="text-center py-4">
                <div className="w-full h-[110px] flex flex-col items-center justify-center gap-4">
                    <div className="w-16 h-16 border-4 border-t-secondary border-gray-300 rounded-full animate-spin"></div>
                    <div className="text-gray-400">Estamos buscando tus reservas...</div>
                </div>
              </td>
            </tr>
          ):
         (rows.length === 0) ? (
            <tr>
              <td colSpan={columns.length} className="text-center py-4">
                <div className="w-full h-[110px] flex flex-col items-center justify-center gap-4">
                    <i className="fas fa-box-open text-4xl text-gray-400"></i>
                    <div className="text-gray-400">No hay reservas para mostrar</div>
                </div>
              </td>
            </tr>
          ) :
          rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="px-6 py-4 font-medium text-white">
                  {column.renderCell
                    ? 
                    column.id === "actions" 
                    ? column.renderCell(row.id)
                    : column.renderCell(row[column.id])
                    : row[column.id] || "-"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

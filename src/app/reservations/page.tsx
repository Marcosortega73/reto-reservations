"use client";
import { format } from "@formkit/tempo";
import {
  ChipStates,
  DialogComponent,
  TableComponent,
  TooltipComponent,
} from "@/components";
import { useFetchReservations } from "@/hooks";
import { ColumnsTable, Reservation, StatusReservation } from "@/interfaces";
import { redirect } from "next/navigation";

import React, { useEffect, useState } from "react";
import FormDeleteReservation from "./_components/FormDeleteReservation";
import FormChangeStateReservation from "./_components/FormChangeStateReservation";

function isStatusReservation(
  value: string | number | StatusReservation
): value is StatusReservation {
  return (value as StatusReservation).name !== undefined;
}

const ReservationsConponent = () => {
  const columns: ColumnsTable[] = [
    { id: "id", label: "ID" },
    { id: "clientName", label: "Cliente" },
    { id: "numberOfGuests", label: "Numero de Invitados" },
    {
      id: "reservationDate",
      label: "Fecha de Reserva",
      renderCell: (value: string | number | StatusReservation) =>
      {
        const date = format({
          date: new Date(value as string),
          format: "DD-MM-YYYY HH:mm",
          tz: "Europe/Lisbon",
        });
        return date;
      }
      ,
    },

    {
      id: "createdAt",
      label: "Fecha de Creacion",
      renderCell: (value: string | number | StatusReservation) =>
        format(new Date(value as string), "DD/MM/YYYY HH:mm"),
    },
    {
      id: "updatedAt",
      label: "Fecha de Actualizacion",
      renderCell: (value: string | number | StatusReservation) =>
        format(new Date(value as string), "DD/MM/YYYY HH:mm"),
    },
    {
      id: "status",
      label: "Estado",
      align: "start",
      renderCell: (value: string | number | StatusReservation) => {
        if (isStatusReservation(value)) {
          const { name = "", color = "default" } = value;

          return <ChipStates label={name} color={color} />;
        }
        return null; // o algún valor predeterminado si no es StatusReservation
      },
    },
    {
      id: "actions",
      label: "Acciones",
      align: "center",
      renderCell: (params: string | number | StatusReservation) => {
        return (
          <div className="flex justify-center gap-2">
            <TooltipComponent text="Eliminar" position="top">
              <button
                className="btn btn-primary"
                onClick={() => handleAction("delete", params as number)}
              >
                <i className="fas fa-trash"></i>
              </button>
            </TooltipComponent>
            <TooltipComponent text="Editar" position="top">
              <button
                className="btn btn-secondary"
                onClick={() => handleAction("edit", params as number)}
              >
                <i className="fas fa-edit"></i>
              </button>
            </TooltipComponent>
            <TooltipComponent text="Cambiar Estado" position="top">
              <button
                className="btn btn-accent"
                onClick={() => handleAction("status", params as number)}
              >
                <i className="fas fa-exchange-alt"></i>
              </button>
            </TooltipComponent>
          </div>
        );
      },
    },
  ];
  const { reservations, loading, error, refetch } = useFetchReservations();

  const [rows, setRows] = useState<Reservation[]>([]);
  const [action, setAction] = useState<string | null>(null);
  const [statusName, setStatusName] = useState<string>("");

  const configTable = {
    title: "Lista de Reservas",
  };

  const [open, setOpen] = React.useState(false);
  const [rowIdSelected, setRowIdSelected] = React.useState<number | null>(null);


  const handleAction = (action: string, id?: number) => {
    const actions: {
      edit: () => void;
      delete: () => void;
      create: () => void;
      status: () => void;
    } = {
      edit: () => redirect(`/reservations/edit/${id}`),
      delete: () => handleDelete(id as number),
      create: () => redirect("/reservations/create"),
      status: () => handleChangeStatus(id as number),
    };
    setAction(action);
    actions[action as "edit" | "delete" | "create"]();
  };

  const handleDelete = (rowId: number) => {
    setRowIdSelected(rowId);
    setOpen(true);
  };
  const handleChangeStatus = (rowId: number) => {
    setRowIdSelected(rowId);
    const filterRow = rows.find((row) => row.id === rowId);
    setStatusName(filterRow?.status.slug as unknown as string);
    setOpen(true);
  };

  const handleRefresh = async() => {
    await refetch();
  }

  useEffect(() => {
    if (reservations) {
      setRows(reservations);
    }
  }, [reservations]);

  return (
    <>
      <div className="container mx-auto p-4 page-enter-left pt-20">
        {error && <div>Error: {error.message}</div>}
        {rows && (
          <TableComponent
            rows={rows}
            config={configTable}
            columns={columns}
            handleAction={handleAction}
            loading={loading}
          />
        )}
      </div>
      {open && (
        <DialogComponent isOpen={open} onClose={() => setOpen(false)}>
          {action === "delete" ? (
          <FormDeleteReservation
            idRow={rowIdSelected as unknown as number}
            setClose={setOpen}
            handleRefresh={handleRefresh}
          />
          ):
          <FormChangeStateReservation
            idRow={rowIdSelected as unknown as number}
            setClose={setOpen}
            handleRefresh={handleRefresh}
            statusName={statusName}
          />
        }
        </DialogComponent>
      )}
    </>
  );
};

export default ReservationsConponent;

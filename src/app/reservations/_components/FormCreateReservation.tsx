import { CustomButton, InputForm } from "@/components";
import { useFetchStatusReservations } from "@/hooks";
import { usePathname } from "next/navigation";
import React from "react";

const FormCreateReservation = ({
  formData,
  handleChange,
  handleSubmit,
}: {
  formData: {
    clientName: string;
    numberOfGuests: number;
    reservationDate: string;
    reservationTime: string;
    statusName: string;
  };
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleSubmit: (e: React.FormEvent) => void;
}) => {
  const { statusReservations } = useFetchStatusReservations();
  const pathName = usePathname();
  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="clientName"
            className="block text-lg font-medium text-gray-700"
          >
            Cliente
          </label>
          <InputForm
            type="text"
            placeholder="Ingrese el nombre del cliente"
            value={formData.clientName}
            onChange={handleChange}
            name="clientName"
            required={true}
            id="clientName"
          />
        </div>

        <div>
          <label
            htmlFor="numberOfGuests"
            className="block text-lg font-medium text-gray-700"
          >
            Numero de Invitados
          </label>

          <InputForm
            type="number"
            placeholder="Ingrese el numero de invitados"
            value={formData.numberOfGuests}
            onChange={handleChange}
            name="numberOfGuests"
            required={true}
            id="numberOfGuests"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="reservationDate"
              className="block text-lg font-medium text-gray-700"
            >
              Fecha de Reserva
            </label>

            <InputForm
              type="date"
              placeholder="Ingrese la fecha de la reserva"
              value={formData.reservationDate}
              onChange={handleChange}
              name="reservationDate"
              required={true}
              id="reservationDate"
            />
          </div>
          <div>
            <label
              htmlFor="reservationDate"
              className="block text-lg font-medium text-gray-700"
            >
              Horario
            </label>

            <InputForm
              type="time"
              placeholder="Ingrese la fecha de la reserva"
              value={formData.reservationTime}
              onChange={handleChange}
              name="reservationTime"
              required={true}
              id="reservationDate"
            />
          </div>
        </div>
        {pathName.includes("edit") && (
          <div>
            <label
              htmlFor="statusId"
              className="block text-lg font-medium text-gray-700"
            >
              Estado
            </label>
            <select
              id="statusName"
              name="statusName"
              value={formData.statusName}
              onChange={handleChange}
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-info focus:outline-none"
              required
            >
              {statusReservations.map((status) => (
                <option key={status.id} value={status.slug}>
                  {status.name}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="flex justify-center">
          <CustomButton
            type="submit"
            className="px-6 py-3 text-white  rounded-lg shadow-md hover:bg-muted focus:outline-none focus:ring-2 focus:ring-muted focus:ring-opacity-50"
            label="Confirmar Reserva"
          />
        </div>
      </form>
    </>
  );
};

export default FormCreateReservation;

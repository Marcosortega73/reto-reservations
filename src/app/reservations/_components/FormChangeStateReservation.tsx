import { Backdrop } from "@/components";
import { useChangeStatusReservation, useFetchStatusReservations } from "@/hooks";
import { useState } from "react";

const FormChangeStateReservation = ({
  idRow,
  setClose,
  handleRefresh,
  statusName,
}: {
  idRow: number;
  setClose: (value: boolean) => void;
  handleRefresh: () => void;
  statusName: string;
}) => {

  const { statusReservations } = useFetchStatusReservations();
  const { changeStatusReservation,error,loading } = useChangeStatusReservation();

  const [statusNameSelected, setStatusNameSelected] = useState(statusName);

  const handleChangeStatus = async () => {
    await changeStatusReservation(idRow, statusNameSelected);
    if (error) {
      console.error("Error update(state) reservation", error);
      return;
    }
    handleRefresh();
    setClose(false);
  };



  return (
    <>
      <Backdrop show={loading} />
      <div className="flex flex-col">
        <h2 className="text-xl font-semibold text-center">
          Reservación n°: <span className="font-bold">{idRow}</span>
        </h2>
        <p className="text-center">Cambiar estado de la reservación</p>

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
            value={statusNameSelected}
            onChange={(e) => setStatusNameSelected(e.target.value)}
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

        <div className="flex justify-center mt-4 gap-3">
          <button
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-4 py-2 rounded-lg"
            onClick={() => setClose(false)}
          >
            Cancelar
          </button>

          <button
            className="bg-secondary hover:bg-muted text-white font-semibold px-4 py-2 rounded-lg mr-2"
            onClick={() => handleChangeStatus()}
          >
            Cambiar
          </button>
        </div>
      </div>
    </>
  );
};

export default FormChangeStateReservation;

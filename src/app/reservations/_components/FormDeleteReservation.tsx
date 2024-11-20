import { Backdrop } from "@/components";
import { useDeleteReservation } from "@/hooks";

const FormDeleteReservation = ({
  idRow,
  setClose,
  handleRefresh,
}: {
  idRow: number;
  setClose: (value: boolean) => void;
  handleRefresh: () => void;
}) => {
  const { deleteReservation, loading, error } = useDeleteReservation();

  const handleDelete = async () => {
    await deleteReservation(idRow);
    if (error) {
      console.error("Error deleting reservation", error);
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
          Eliminar Reservación n°: <span className="font-bold">{idRow}</span>
        </h2>
        <p className="text-center">
          ¿Estás seguro de que deseas eliminar esta reservación?
        </p>
        <div className="flex justify-center mt-4 gap-3">
          <button
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-4 py-2 rounded-lg"
            onClick={() => setClose(false)}
          >
            Cancelar
          </button>

          <button
            className="bg-secondary hover:bg-muted text-white font-semibold px-4 py-2 rounded-lg mr-2"
            onClick={() => handleDelete()}
          >
            Eliminar
          </button>
        </div>
      </div>
    </>
  );
};

export default FormDeleteReservation;

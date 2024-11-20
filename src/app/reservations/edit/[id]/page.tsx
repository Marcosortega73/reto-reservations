"use client";
import { Backdrop, CustomButtonReturn } from "@/components";
import { useShowReservation, useUpdateReservation } from "@/hooks";
import { format } from "@formkit/tempo";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import FormCreateReservation from "../../_components/FormCreateReservation";


type ReservationForm = {
  clientName: string;
  numberOfGuests: number;
  reservationDate: string;
  reservationTime: string;
  statusName: string;
};

const ReservationPageForm = () => {
  const [formData, setFormData] = useState<ReservationForm>({
    clientName: "",
    numberOfGuests: 1,
    reservationDate: format(new Date(), "YYYY-MM-DD"),
    reservationTime: "12:00",
    statusName: "pending",
  });
  const {id} = useParams()

  const { updateReservation, loading, error } = useUpdateReservation();

  const { reservation, loading: loadingReservation,fetchReservation } = useShowReservation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const fetchShowReservation = async () => {
    if (id) {
      await fetchReservation(id as string);
      if (error) {
        console.error("Error fetching reservation", error);
        return;
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateReservation(id as string, formData);
    if (error) {
      console.error("Error creating reservation", error);
      return;
    }
    redirect("/reservations");
  };

  useEffect(() => {
    fetchShowReservation();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (reservation) {
      setFormData({
        clientName: reservation.clientName,
        numberOfGuests: reservation.numberOfGuests,
        reservationDate: format({
          date: new Date(reservation.reservationDate),
          format: "YYYY-MM-DD",
          tz: "Europe/Lisbon",
        }) 
        ,
        reservationTime:
          format({
            date: new Date(reservation.reservationDate),
            format: "HH:mm",
            tz: "Europe/Lisbon",
          }) || "12:00"
        ,
        statusName: reservation.status.slug,
      });
    }
  }, [reservation]);

  return (
    <div className="page-enter min-h-screen flex flex-col items-center justify-center gap-5">
      <Backdrop show={loading || loadingReservation} />
      <div className="w-full max-w-lg p-8 bg-primary rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Editar Reserva
        </h3>
        <FormCreateReservation
          handleSubmit={handleSubmit}
          formData={formData}
          handleChange={handleChange}
        />
      </div>
      <div className="w-100 flex justify-center">
        <CustomButtonReturn />
      </div>
    </div>
  );
};

export default ReservationPageForm;

"use client";
import { Backdrop, CustomButtonReturn } from "@/components";
import { useCreateReservation } from "@/hooks";
import { useState } from "react";
import FormCreateReservation from "../_components/FormCreateReservation";
import { redirect } from "next/navigation";
import { format } from "@formkit/tempo";

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

  const { createReservation, loading, error } = useCreateReservation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createReservation(formData);
    if (error) {
      console.error("Error creating reservation", error);
      return;
    }
    redirect("/reservations");
  };

  return (
    <div className="page-enter min-h-screen flex flex-col items-center justify-center gap-5">
      <Backdrop show={loading} />
      <div className="w-full max-w-lg p-8 bg-primary rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Nueva Reserva - ¡Te Esperamos!
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

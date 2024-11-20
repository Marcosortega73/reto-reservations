import { ColorTypes } from "./componentsTypes";

export interface Reservation {
    id: number;
    clientName: string;
    numberOfGuests: number;
    reservationDate: string;
    statusId: number;
    status: StatusReservation;
    createdAt: string;
    updatedAt: string;
}

export type StatusReservation = {
    id: number;
    name: string;
    slug: string;
    color: ColorTypes;
};


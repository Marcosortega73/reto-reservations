import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { ParamsRequest } from "@/interfaces";

export async function GET(request: Request, { params }: ParamsRequest) {
  try {
    const { id } = await params;
    const reservation = await prisma.reservation.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        status: true,
      },
    });
    return NextResponse.json({
      message: "Fetching reservation",
      details: reservation ?? "Reservation not found",
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: "Error fetching reservations", details: error.message },
        { status: 500 }
      );
    }
  }
}

export async function DELETE(request: Request, { params }: ParamsRequest) {
  try {
    const { id } = params;
    const existingReservation = await prisma.reservation.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!existingReservation) {
      return NextResponse.json(
        { message: "Reservation not found" },
        { status: 404 }
      );
    }
    await prisma.reservation.delete({
      where: {
        id: Number(id),
      },
    });
    return NextResponse.json({ message: "Deleting reservation" });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: "Error deleting reservation", details: error.message },
        { status: 500 }
      );
    }
  }
}

export async function PUT(request: Request, { params }: ParamsRequest) {
  try {
    const { id } = await params;
    const { clientName, numberOfGuests, reservationDate, statusName,reservationTime } =
      await request.json();

    const reservationDateTime = new Date(
      `${reservationDate}T${reservationTime}:00` // Usa T para separar la fecha y la hora
    );

    const localReservationDateTime = new Date(
      reservationDateTime.getTime() -
        reservationDateTime.getTimezoneOffset() * 60000
    );

    const status = await prisma.reservationStatus.findFirstOrThrow({
      where: {
        slug: statusName,
      },
    });

    const existingReservation = await prisma.reservation.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!existingReservation) {
      return NextResponse.json(
        { message: "Reservation not found" },
        { status: 404 }
      );
    }

    const updatedReservation = await prisma.reservation.update({
      where: {
        id: Number(id),
      },
      data: {
        clientName,
        numberOfGuests: Number(numberOfGuests),
        reservationDate: localReservationDateTime,
        statusId: status?.id ?? 1,
      },
    });

    return NextResponse.json({
      message: "Updating reservation",
      details: updatedReservation,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: "Error updating reservation", details: error.message },
        { status: 500 }
      );
    }
  }
}

import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
export async function GET() {
  try {
    const reservations = await prisma.reservation.findMany({
      include: {
        status: true,
      },
      orderBy: {
        reservationDate: "asc",
      },
    });
    return NextResponse.json(reservations);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: "Error fetching reservations", details: error.message },
        { status: 500 }
      );
    }
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { clientName, numberOfGuests, reservationDate, reservationTime } = body;

    if (!clientName || !numberOfGuests || !reservationDate || !reservationTime) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const status = await prisma.reservationStatus.findFirstOrThrow({
      where: { slug: "pendiente" },
    });

    const reservationDateTime = new Date(
      `${reservationDate}T${reservationTime}:00` 
    );    

    const localReservationDateTime = new Date(reservationDateTime.getTime() - reservationDateTime.getTimezoneOffset() * 60000);


    const newReservation = await prisma.reservation.create({
      data: {
        clientName,
        numberOfGuests: Number(numberOfGuests),
        reservationDate: localReservationDateTime,
        statusId: status.id,
      },
    });

    return NextResponse.json(
      { message: "Creating reservation", details: newReservation },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return NextResponse.json(
        { message: "Error creating reservation", details: error.message },
        { status: 500 }
      );
    }
  }
}


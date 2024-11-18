import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
export async function GET() {
  try {
    const reservations = await prisma.reservation.findMany({
        include: {
            status: true,
            
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
    const { clientName, numberOfGuests, reservationDate, statusName } =
      await request.json();

    const status = await prisma.reservationStatus.findFirstOrThrow({
      where: {
        slug: statusName,
      },
    });

    const newReservation = await prisma.reservation.create({
      data: {
        clientName,
        numberOfGuests,
        reservationDate,
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

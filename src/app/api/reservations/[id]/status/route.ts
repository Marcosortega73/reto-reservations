import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { ParamsRequest } from "@/interfaces";

export async function PUT(request: Request, { params }: ParamsRequest) {
    try {
      const { id } = await params;
      const { statusName } =
        await request.json();
  
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
            statusId: status.id,
        },
      });
  
      return NextResponse.json({
        message: "Updating reservation state",
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
import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
export async function GET() {
    try {
      const statusReservations = await prisma.reservationStatus.findMany();
      return NextResponse.json(statusReservations);
    } catch (error) {
      if (error instanceof Error) {
        return NextResponse.json(
          { message: "Error fetching statusReservations", details: error.message },
          { status: 500 }
        );
      }
    }
  }
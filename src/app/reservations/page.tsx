"use client";

import { useReservations } from '@/hooks'

import React from 'react'

const ReservationsConponent = () => {
    const { reservations, loading, error } = useReservations();
  return (
    <div>
        {loading && <div>Loading...</div>}
        {error && <div>Error: {error.message}</div>}
        {reservations && (
            <ul>
                {reservations.map((reservation) => (
                    <li key={reservation.id}>{reservation.clientName}</li>
                ))}
            </ul>
        )}
    </div>
  )
}

export default ReservationsConponent
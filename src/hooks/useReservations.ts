"use client";

import { Reservation } from "@/interfaces";
import axios from "axios";
import { useState, useEffect } from "react";

/**
 *  Fetch all reservations from the API
 * @returns  { reservations, loading, error, refetch }
 */

export const useFetchReservations = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchReservations = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await axios.get("/api/reservations");
      setReservations(data.data);
    } catch (err) {
      setError(err as unknown as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  return { reservations, loading, error, refetch: fetchReservations };
};

/**
 * Create a new reservation
 * @returns { createReservation, loading, error }
 */
export const useCreateReservation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createReservation = async (reservationData: object) => {
    setLoading(true);
    setError(null);
    console.log({reservationData});
    try {
      await axios.post("/api/reservations", reservationData);
    } catch (err) {
      setError(err as unknown as Error);
    } finally {
      setLoading(false);
    }
  };

  return { createReservation, loading, error };
};

/**
 * Update a reservation
 * @returns { updateReservation, loading, error }
 */
export const useUpdateReservation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const updateReservation = async (id: string, updatedData: object) => {
    setLoading(true);
    setError(null);
    try {
      await axios.put(`/api/reservations/${id}`, updatedData);
    } catch (err) {
      setError(err as unknown as Error);
    } finally {
      setLoading(false);
    }
  };

  return { updateReservation, loading, error };
};

/**
 * Delete a reservation
 * @returns { deleteReservation, loading, error }
 */
export const useDeleteReservation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const deleteReservation = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`/api/reservations/${id}`);
    } catch (err) {
      setError(err as unknown as Error);
    } finally {
      setLoading(false);
    }
  };

  return { deleteReservation, loading, error };
};


/**
 * Fetch a single reservation
 * @returns { reservation, loading, error, fetchReservation }
 */
export const useShowReservation = () => {
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchReservation = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await axios.get(`/api/reservations/${id}`);
      setReservation(data.data?.details);
    } catch (err) {
      setError(err as unknown as Error);
    } finally {
      setLoading(false);
    }
  };

  return { reservation, loading, error, fetchReservation };
};

/**
 * Change the status of a reservation
 * @returns { changeStatusReservation, loading, error }
 */
export const useChangeStatusReservation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const changeStatusReservation = async (id: number, statusName: string) => {
    setLoading(true);
    setError(null);
    try {
      await axios.put(`/api/reservations/${id}/status`, { statusName });
    } catch (err) {
      setError(err as unknown as Error);
    } finally {
      setLoading(false);
    }
  };

  return { changeStatusReservation, loading, error };
};
import { StatusReservation } from "@/interfaces";
import axiosInstance from "@/libs/axiosInstance";
import { useEffect, useState } from "react";

export const useFetchStatusReservations = () => {
    const [statusReservations, setStatusReservations] = useState<StatusReservation[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
  
    const fetchStatusReservations = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await axiosInstance.get("/reservations/status");
        setStatusReservations(data.data);
      } catch (err) {
        setError(err as unknown as Error);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchStatusReservations();
    }, []);
  
    return { statusReservations, loading, error };
  };
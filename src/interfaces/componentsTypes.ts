import { StatusReservation } from "./reservations";

export interface ColumnsTable{
    id: string;
    label: string;
    minWidth?: number;
    align?: 'start' | 'center' | 'end';
    renderCell?: (value: number | string | StatusReservation) => React.ReactNode;
}

export type ColorTypes = "error" | "success" | "warning" | "info" | "default" | "primary" | "secondary" | "muted" | "accent" | "foreground" | "background";
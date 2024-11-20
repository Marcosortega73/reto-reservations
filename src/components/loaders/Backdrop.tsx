"use client";

import React from "react";

type BackdropProps = {
  show: boolean;
};

export const Backdrop = ({ show }: BackdropProps) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      {/* Spinner */}
      <div className="w-16 h-16 border-4 border-t-secondary border-gray-300 rounded-full animate-spin"></div>
    </div>
  );
};

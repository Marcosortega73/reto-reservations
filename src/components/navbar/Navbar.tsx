"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const mockNavItems = [
  { name: "Inicio", href: "/" },
  { name: "Mis Reservas", href: "/reservations" },
];
export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); 

  return (
    <nav className="bg-white border-b border-gray-200 shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-xl font-bold text-black">
              Reto UpperEat
            </Link>
          </div>

          <div className="hidden md:flex space-x-8">
            {mockNavItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={`block px-1 py-2  text-base font-medium ${
                    pathname === item.href
                      ? "text-secondary font-semibold border-b-4 border-muted"
                      : "text-gray-700 hover:text-muted"
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-600"
            >
              <svg
                className={`h-6 w-6 transition-transform ${
                  isOpen ? "rotate-90" : "rotate-0"
                }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-gray-50 border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {mockNavItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={`block px-1 py-2  text-base font-medium ${
                    pathname === item.href
                      ? "text-secondary font-semibold border-b-4 border-muted"
                      : "text-gray-700 hover:text-muted"
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

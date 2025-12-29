import React from "react";
import { Link } from "react-router";

interface LogoProps {
  onClick?: () => void;
}

export function Logo({ onClick }: LogoProps) {
  return (
    <Link
      to="/"
      onClick={onClick}
      className="flex items-center gap-2 cursor-pointer group"
    >
      <div className="bg-blue-600 text-white px-2 py-1.5 sm:p-2 rounded-lg font-bold text-base sm:text-lg shadow-blue-200 shadow-lg group-hover:scale-105 transition-transform duration-200">
        Music Notebook
      </div>
    </Link>
  );
}

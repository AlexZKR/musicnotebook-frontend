import React from "react";
import { Link } from "react-router";
import type { Route } from "./+types/_index";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Music Notebook" },
    { name: "description", content: "Interactive Music Learning" },
  ];
}

export default function IndexRoute() {
  return (
    <div className="flex flex-col items-center justify-center grow py-12 md:py-20 text-center animate-in fade-in zoom-in-95 duration-500">
      <div className="mb-8 inline-block px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-100">
        🎵 The future of music theory is interactive
      </div>
      <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-8 tracking-tight leading-tight">
        Master Music Theory <br className="hidden md:block" />
        <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600">
          The Interactive Way
        </span>
      </h1>
      <p className="text-lg md:text-xl text-gray-600 max-w-2xl mb-12 leading-relaxed mx-auto">
        Forget dry textbooks. Music Notebook lets you learn theory through
        <strong> living documents</strong>. Edit musical notation, hear the
        changes instantly, and visualize concepts on a connected roadmap.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
        <Link
          to="/roadmap"
          className="px-8 py-4 bg-blue-600 text-white rounded-full font-bold text-lg hover:bg-blue-700 transition-all hover:scale-105 shadow-lg shadow-blue-200"
        >
          Start Roadmap
        </Link>
        <Link
          to="/about"
          className="px-8 py-4 bg-white text-gray-700 border border-gray-300 rounded-full font-bold text-lg hover:bg-gray-50 transition-colors"
        >
          Learn More
        </Link>
      </div>
    </div>
  );
}

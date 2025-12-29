import React from "react";
import { Outlet } from "react-router";

import { AppNavBar } from "~/ui/organisms";

export function meta() {
  return [
    { title: "Music Notebook" },
    { name: "description", content: "Interactive Music Learning" },
  ];
}

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-gray-900">
      <AppNavBar />
      <main className="grow p-4 md:p-8 max-w-7xl mx-auto w-full flex flex-col">
        <Outlet />
      </main>
    </div>
  );
}

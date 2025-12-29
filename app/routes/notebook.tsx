import React from "react";
import { Link, useNavigate, useParams } from "react-router";
import confetti from "canvas-confetti";
import type { Route } from "./+types/notebook";

import { Notebook } from "~/ui/templates";
import { useRoadmapData } from "~/context/RoadmapDataContext";
import { useUserProgress } from "~/context/UserContext";

const CONFETTI_DURATION_MS = 2000;
const CONFETTI_PARTICLE_COUNT = 3;
const CONFETTI_SPREAD = 55;
const CONFETTI_ANGLE_LEFT = 60;
const CONFETTI_ANGLE_RIGHT = 120;
const RETURN_ANIMATION_CLEAR_DELAY_MS = 3000;

export function meta({ params }: Route.MetaArgs) {
  return [{ title: `${params.notebookId} | Notebook | Music Notebook` }];
}

export default function NotebookRoute() {
  const navigate = useNavigate();
  const { notebookId = "" } = useParams();
  const { getNotebook } = useRoadmapData();
  const notebook = getNotebook(notebookId);

  const { markNodeCompleted } = useUserProgress();

  if (!notebook) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Notebook not found
        </h1>
        <p className="text-gray-600 mb-8">
          The notebook you requested doesn’t exist.
        </p>
        <Link
          to="/roadmap"
          className="inline-flex px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition-colors shadow-md shadow-blue-200"
        >
          Back to Roadmap
        </Link>
      </div>
    );
  }

  const runConfetti = () => {
    const end = Date.now() + CONFETTI_DURATION_MS;

    const frame = () => {
      confetti({
        particleCount: CONFETTI_PARTICLE_COUNT,
        angle: CONFETTI_ANGLE_LEFT,
        spread: CONFETTI_SPREAD,
        origin: { x: 0 },
        colors: ["#60a5fa", "#34d399", "#f472b6"],
      });
      confetti({
        particleCount: CONFETTI_PARTICLE_COUNT,
        angle: CONFETTI_ANGLE_RIGHT,
        spread: CONFETTI_SPREAD,
        origin: { x: 1 },
        colors: ["#60a5fa", "#34d399", "#f472b6"],
      });

      if (Date.now() < end) requestAnimationFrame(frame);
    };

    frame();
  };

  const handleComplete = () => {
    runConfetti();

    if (notebook.trackProgress) {
      markNodeCompleted(notebook.id);
    }

    window.setTimeout(() => {
      navigate("/roadmap", {
        state: notebook.trackProgress
          ? { justCompletedNotebookId: notebook.id }
          : null,
      });
    }, RETURN_ANIMATION_CLEAR_DELAY_MS);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Link
            to="/roadmap"
            className="cursor-pointer hover:text-blue-600 font-medium transition-colors"
          >
            Roadmap
          </Link>
          <span className="text-gray-300">/</span>
          <span className="font-bold text-gray-900 bg-gray-100 px-2 py-0.5 rounded">
            {notebook.title}
          </span>
        </div>
        <Link
          to="/roadmap"
          className="self-start sm:self-auto px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors flex items-center gap-2"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Roadmap
        </Link>
      </div>

      {/* Key ensures component resets when notebook changes */}
      <Notebook
        key={notebook.id}
        initialBlocks={notebook.blocks}
        onComplete={notebook.trackProgress ? handleComplete : undefined}
      />
    </div>
  );
}

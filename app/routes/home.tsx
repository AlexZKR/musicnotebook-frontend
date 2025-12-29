import React, { useState } from "react";
import type { Route } from "./+types/home";
import Notebook, { type BlockData } from "~/notebook";
import Roadmap, { type TopicData } from "~/roadmap";
import { useNodesState, type Node } from "@xyflow/react";
import confetti from "canvas-confetti";

import { MUSICAL_NOTATION_LESSON } from "~/demo-notes/musicalNotaionLesson";
import { INTERVALS_LESSON } from "~/demo-notes/musicalIntervalsLesson";
import { SIMPLE_INTERVALS_LESSON } from "~/demo-notes/simpleIntervalsLesson";
import { COMPOUND_INTERVALS_LESSON } from "~/demo-notes/compoundIntervalsLesson";
import { TUTORIAL_CONTENT } from "~/demo-notes/tutorialContent";
import { initialNodes } from "~/demo-notes/initialRoadmap";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Music Notebook" },
    { name: "description", content: "Interactive Music Learning" },
  ];
}

type ViewState = "home" | "learning-path" | "about" | "notebook";

export default function Home() {
  const [view, setView] = useState<ViewState>("home");
  const [currentTopic, setCurrentTopic] = useState<string | null>(null);
  const [currentNodeId, setCurrentNodeId] = useState<string | null>(null);
  const [activeBlocks, setActiveBlocks] = useState<BlockData[] | undefined>(
    undefined
  );

  // Controlled Nodes State
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);

  const handleNodeClick = (nodeId: string, title: string) => {
    setCurrentTopic(title);
    setCurrentNodeId(nodeId);

    // Route to specific lessons based on Node ID
    if (nodeId === "1") {
      setActiveBlocks(MUSICAL_NOTATION_LESSON);
    } else if (nodeId === "2") {
      setActiveBlocks(INTERVALS_LESSON);
    } else if (nodeId === "2-1") {
      setActiveBlocks(SIMPLE_INTERVALS_LESSON);
    } else if (nodeId === "2-2") {
      setActiveBlocks(COMPOUND_INTERVALS_LESSON);
    } else {
      setActiveBlocks(undefined);
    }

    setView("notebook");
  };

  const handleTutorialClick = () => {
    setCurrentTopic("Tutorial");
    setCurrentNodeId(null);
    setActiveBlocks(TUTORIAL_CONTENT);
    setView("notebook");
  };

  const handleBackToMap = () => {
    setView("learning-path");
    setCurrentTopic(null);
    setActiveBlocks(undefined);
  };

  // --- CONFETTI & COMPLETION LOGIC ---
  const handleLessonComplete = () => {
    // 1. Trigger Confetti
    const duration = 2000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#60a5fa", "#34d399", "#f472b6"], // Blue, Green, Pink
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#60a5fa", "#34d399", "#f472b6"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    // 2. Update Node Status
    if (currentNodeId) {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === currentNodeId) {
            return {
              ...node,
              data: {
                ...node.data,
                status: "completed",
                justCompleted: true, // Trigger CSS animation in roadmap
              },
            };
          }
          return node;
        })
      );

      // 3. Remove "justCompleted" flag after animation
      setTimeout(() => {
        setNodes((nds) =>
          nds.map((node) => {
            if (node.id === currentNodeId) {
              const { justCompleted, ...rest } = node.data;
              return { ...node, data: rest };
            }
            return node;
          })
        );
      }, 3000);
    }

    // 4. Return to Map
    setView("learning-path");
    setCurrentTopic(null);
    setActiveBlocks(undefined);
  };

  const handleSignIn = () => {
    alert(
      "To be implemented. You will be able to log in to track your progress."
    );
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-gray-900">
      {/* --- NAVIGATION BAR --- */}
      <nav className="border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 bg-white/90 backdrop-blur-md z-50 shadow-sm">
        <div
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => setView("home")}
        >
          <div className="bg-blue-600 text-white p-2 rounded-lg font-bold text-lg shadow-blue-200 shadow-lg group-hover:scale-105 transition-transform duration-200">
            Music Notebook
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => setView("learning-path")}
            className={`text-sm font-semibold transition-colors ${
              view === "learning-path" || view === "notebook"
                ? "text-blue-600"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            Learning path
          </button>
          <button
            onClick={() => setView("home")}
            className={`text-sm font-semibold transition-colors ${
              view === "home"
                ? "text-blue-600"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            Home
          </button>
          <button
            onClick={() => setView("about")}
            className={`text-sm font-semibold transition-colors ${
              view === "about"
                ? "text-blue-600"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            About
          </button>
          <button
            onClick={handleSignIn}
            className="text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors"
          >
            Sign in
          </button>
        </div>
      </nav>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-grow p-4 md:p-8 max-w-7xl mx-auto w-full flex flex-col">
        {/* 1. LANDING PAGE */}
        {view === "home" && (
          <div className="flex flex-col items-center justify-center flex-grow py-12 md:py-20 text-center animate-in fade-in zoom-in-95 duration-500">
            <div className="mb-8 inline-block px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-100">
              🎵 The future of music theory is interactive
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-8 tracking-tight leading-tight">
              Master Music Theory <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                The Interactive Way
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mb-12 leading-relaxed mx-auto">
              Forget dry textbooks. Music Notebook lets you learn theory through
              <strong> living documents</strong>. Edit musical notation, hear
              the changes instantly, and visualize concepts on a connected
              roadmap.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
              <button
                onClick={() => setView("learning-path")}
                className="px-8 py-4 bg-blue-600 text-white rounded-full font-bold text-lg hover:bg-blue-700 transition-all hover:scale-105 shadow-lg shadow-blue-200"
              >
                Start Learning Path
              </button>
              <button
                onClick={() => setView("about")}
                className="px-8 py-4 bg-white text-gray-700 border border-gray-300 rounded-full font-bold text-lg hover:bg-gray-50 transition-colors"
              >
                Learn More
              </button>
            </div>
          </div>
        )}

        {/* 2. ROADMAP VIEW */}
        {view === "learning-path" && (
          <div className="space-y-6 animate-in fade-in duration-300 h-full flex flex-col">
            <div className="text-center space-y-2 mb-4">
              <h1 className="text-3xl font-bold text-gray-900">
                Your Learning Path
              </h1>
              <p className="text-gray-500">
                Explore the graph below. Click a topic to open its notebook.
              </p>
            </div>

            {/* Tutorial Banner */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl shadow-sm border border-blue-100">
                  🎓
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">New here?</h3>
                  <p className="text-sm text-gray-600">
                    Take the interactive tutorial to learn how to use the
                    notebook features.
                  </p>
                </div>
              </div>
              <button
                onClick={handleTutorialClick}
                className="whitespace-nowrap px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition-colors shadow-md shadow-blue-200"
              >
                Start Tutorial
              </button>
            </div>

            <div className="flex-grow min-h-[500px] border border-gray-200 rounded-2xl shadow-sm overflow-hidden relative">
              <Roadmap
                nodes={nodes}
                onNodesChange={onNodesChange}
                onNodeClick={handleNodeClick}
              />
            </div>
          </div>
        )}

        {/* 3. NOTEBOOK VIEW */}
        {view === "notebook" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span
                  className="cursor-pointer hover:text-blue-600 font-medium transition-colors"
                  onClick={() => setView("learning-path")}
                >
                  Learning Path
                </span>
                <span className="text-gray-300">/</span>
                <span className="font-bold text-gray-900 bg-gray-100 px-2 py-0.5 rounded">
                  {currentTopic}
                </span>
              </div>
              <button
                onClick={handleBackToMap}
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
                Back to Map
              </button>
            </div>

            {/* Key ensures component resets when topic changes */}
            <Notebook
              key={currentTopic}
              initialBlocks={activeBlocks}
              onComplete={currentNodeId ? handleLessonComplete : undefined}
            />
          </div>
        )}

        {/* 4. ABOUT VIEW */}
        {view === "about" && (
          <div className="max-w-3xl mx-auto py-12 animate-in fade-in duration-300">
            <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-3xl">
              💡
            </div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-8">
              About Music Notebook
            </h1>
            <div className="prose prose-lg text-gray-600 space-y-6 leading-relaxed">
              <p>
                Music Notebook is a Proof-of-Concept (POC) application designed
                to reimagine how we learn music theory. Traditional learning
                methods often separate <em>theory</em> (textbooks) from{" "}
                <em>practice</em> (instruments). We combine them into{" "}
                <strong>interactive documents</strong>.
              </p>

              <div className="p-4 bg-yellow-50 border border-yellow-100 rounded-lg text-sm text-yellow-800 flex items-start gap-3">
                <span className="text-xl">🎓</span>
                <div>
                  <strong>Just getting started?</strong>
                  <br />
                  Check out our{" "}
                  <button
                    onClick={handleTutorialClick}
                    className="underline font-bold hover:text-yellow-900"
                  >
                    Interactive Tutorial
                  </button>{" "}
                  to see the features in action before diving into the main
                  curriculum.
                </div>
              </div>

              <p>
                Inspired by developer tools like Jupyter Notebooks, our platform
                allows you to:
              </p>
              <ul className="list-none space-y-4 pl-0">
                <li className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 text-xs font-bold">
                    ✓
                  </div>
                  <span>Read explanations alongside the music notation.</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 text-xs font-bold">
                    ✓
                  </div>
                  <span>
                    <strong>Edit musical notation</strong> in real-time and hear
                    the results immediately using our audio engine.
                  </span>
                </li>
                <li className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 text-xs font-bold">
                    ✓
                  </div>
                  <span>
                    Visualize concepts through a connected knowledge graph
                    (Roadmap).
                  </span>
                </li>
              </ul>
              <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-200 text-sm">
                <strong className="block text-gray-900 mb-2">
                  Current Status
                </strong>
                This project is currently in active development. Features like
                user accounts, progress tracking, and community-shared lessons
                are coming soon!
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

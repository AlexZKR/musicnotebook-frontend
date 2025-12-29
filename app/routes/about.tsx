import React from "react";
import { Link } from "react-router";

export function meta() {
  return [{ title: "About | Music Notebook" }];
}

export default function AboutRoute() {
  return (
    <div className="max-w-3xl mx-auto py-12 animate-in fade-in duration-300">
      <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-3xl">
        💡
      </div>
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8">
        About Music Notebook
      </h1>
      <div className="prose prose-lg text-gray-600 space-y-6 leading-relaxed">
        <p>
          Music Notebook is a Proof-of-Concept (POC) application designed to
          reimagine how we learn music theory. Traditional learning methods
          often separate <em>theory</em> (textbooks) from <em>practice</em>{" "}
          (instruments). We combine them into{" "}
          <strong>interactive documents</strong>.
        </p>

        <div className="p-4 bg-yellow-50 border border-yellow-100 rounded-lg text-sm text-yellow-800 flex items-start gap-3">
          <span className="text-xl">🎓</span>
          <div>
            <strong>Just getting started?</strong>
            <br />
            Check out our{" "}
            <Link
              to="/notebook/tutorial"
              className="underline font-bold hover:text-yellow-900"
            >
              Interactive Tutorial
            </Link>{" "}
            to see the features in action before diving into the main
            curriculum.
          </div>
        </div>

        <p>
          This app uses <strong>ABC Notation</strong> for rendering music.
          It&apos;s a simple, text-based format for music notation. While you
          don&apos;t need to be an expert, knowing the basics helps you create
          your own exercises.{" "}
          <Link
            to="/notebook/tutorial"
            className="text-blue-600 underline font-medium hover:text-blue-800"
          >
            Learn ABC Notation Basics in the Tutorial
          </Link>
          . For more advanced documentation, visit the{" "}
          <a
            href="https://abcnotation.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline font-medium hover:text-blue-800"
          >
            ABC Notation website
          </a>
          .
        </p>

        <p>
          Inspired by developer tools like Jupyter Notebooks, our platform
          allows you to:
        </p>
        <ul className="list-none space-y-4 pl-0">
          <li className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 text-xs font-bold">
              ✓
            </div>
            <span>Read explanations alongside the music notation.</span>
          </li>
          <li className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 text-xs font-bold">
              ✓
            </div>
            <span>
              <strong>Edit musical notation</strong> in real-time and hear the
              results immediately using our audio engine.
            </span>
          </li>
          <li className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 text-xs font-bold">
              ✓
            </div>
            <span>
              Visualize concepts through a connected knowledge graph (Roadmap).
            </span>
          </li>
        </ul>
        <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-200 text-sm">
          <strong className="block text-gray-900 mb-2">Current Status</strong>
          This project is currently in active development. Features like user
          accounts, progress tracking, and community-shared lessons are coming
          soon!
        </div>
      </div>
    </div>
  );
}

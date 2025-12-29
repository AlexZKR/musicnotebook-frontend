import type { Route } from "./+types/home";
import Notebook from "~/notebook";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Music Learning Canvas" },
    { name: "description", content: "Interactive Music Notebook" },
  ];
}

export default function Home() {
  return <Notebook />;
}

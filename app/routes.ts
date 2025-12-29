import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("routes/_layout.tsx", [
    index("routes/_index.tsx"),
    route("roadmap", "routes/roadmap.tsx"),
    route("about", "routes/about.tsx"),
    route("notebook/:notebookId", "routes/notebook.tsx"),
  ]),
] satisfies RouteConfig;

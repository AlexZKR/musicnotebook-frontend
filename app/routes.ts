import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("routes/_layout.tsx", [
    index("routes/_index.tsx"),
    route("about", "routes/about.tsx"),

    route("courses", "routes/courses.tsx"),
    route("course/:courseId", "routes/course.tsx"),
    route("course/:courseId/topic/:topicId", "routes/topic.tsx"),

    route("notebook/:notebookId", "routes/notebook.tsx"),
  ]),
] satisfies RouteConfig;

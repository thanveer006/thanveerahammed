import type { RouteRecord } from "vite-react-ssg";
import { Layout } from "@/components/layout/layout";

export const routes: RouteRecord[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, lazy: () => import("@/routes/home") },
      { path: "projects", lazy: () => import("@/routes/projects") },
      { path: "projects/:slug", lazy: () => import("@/routes/project-detail") },
      { path: "blog", lazy: () => import("@/routes/blog") },
      { path: "blog/:slug", lazy: () => import("@/routes/blog-post") },
      { path: "resume", lazy: () => import("@/routes/resume") },
      { path: "uses", lazy: () => import("@/routes/uses") },
      { path: "now", lazy: () => import("@/routes/now") },
      { path: "privacy", lazy: () => import("@/routes/privacy") },
      { path: "*", lazy: () => import("@/routes/not-found") },
    ],
  },
];

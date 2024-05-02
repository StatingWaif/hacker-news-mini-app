import { createHashRouter } from "@vkontakte/vk-mini-apps-router";

export const DEFAULT_ROOT = "default_root";

export const DEFAULT_VIEW = "default_view";

export const DEFAULT_VIEW_PANELS = {
  HOME: "home",
  SECOND: "second",
} as const;

export const router = createHashRouter([
  {
    path: "/",
    panel: "home",
    view: "home",
  },
  {
    path: "/news/:id",
    panel: "news",
    view: "news",
  },
]);

import AuthMiddleware from "src/router/middlewares/auth";

const routes = [
  {
    path: "/auth/",
    component: () => import("src/layouts/AuthLayout.vue"),
    children: [
      {
        path: "login",
        name: "login",
        component: () => import("src/pages/auth/LoginPage.vue"),
      },
      {
        path: "register",
        name: "register",
        component: () => import("src/pages/auth/RegisterPage.vue"),
      },
    ],
  },
  {
    path: "/",
    meta: { middlewares: [AuthMiddleware] },
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "dashboard",
        component: () => import("src/pages/DashboardPage.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;

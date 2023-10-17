import { route } from "quasar/wrappers";
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import routes from "./routes";
import middlewarePipeline from "./middlewarePipeline";

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { ssrContext } */ { store }) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === "history"
    ? createWebHistory
    : createWebHashHistory;

  const router = createRouter({
    scrollBehavior: (to, from, savedPosition) => {
      if (savedPosition) {
        return savedPosition;
      } else {
        return { left: 0, top: 0 };
      }
    },
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(
      process.env.MODE === "ssr" ? void 0 : process.env.VUE_ROUTER_BASE
    ),
  });

  router.beforeEach((to, from, next) => {
    const middlewares = [];

    to.matched.forEach((route) => {
      if (route.meta.middlewares) {
        route.meta.middlewares.forEach((middleware) =>
          middlewares.push(middleware)
        );
      }
    });

    if (!middlewares.length) return next();

    const context = {
      from,
      next,
      router,
      to,
      store,
    };

    return middlewares[0]({
      ...context,
      next: middlewarePipeline(context, middlewares, 1),
    });
  });
  return router;
});

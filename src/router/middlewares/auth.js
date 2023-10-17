import { useAuthStore } from "src/stores/auth";
export default async function auth({ next }) {
  const authStore = useAuthStore();
  if (authStore.isAuth) {
    return next();
  }
  next({ name: "login" });
}

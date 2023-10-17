import { boot } from "quasar/wrappers";
import axios from "axios";
import { getTokenFromCache } from "src/utils/auth";
import { Notify } from "quasar";
import { getServerError } from "src/utils/helpers";
const api = axios.create({ baseURL: process.env.API });
import { useAuthStore } from "stores/auth";
export default boot(({ app }) => {
  const authStore = useAuthStore();
  api.interceptors.request.use(
    (config) => {
      const token = getTokenFromCache();
      if (token) config.headers.Authorization = "Bearer " + token;

      return config;
    },
    (error) => Promise.reject(error)
  );
  const logout = async () => {
    await authStore.logout();
    console.log("LOGOUT");
    router.push({ name: "login" });
  };
  api.interceptors.response.use(
    (response) => {
      const res = { ...response };
      if (res?.status >= 200 && !res.data) {
        res.data = { success: true };
      }
      return res;
    },
    async (error) => {
      let message = getServerError(error, "errorMessage");
      const status = error?.response?.status;

      if ("pass" in error?.config) {
        return Promise.reject(error);
      }
      console.log("error", status);
      if (status === 401) {
        logout();
        return { data: { result: null, error: true } };
      } else if (status?.toString()?.slice(0, 1) === 5) {
        message = "Internal Server Error";
      } else if (status === 405) {
        message = "Method Not Allowed";
      } else if (status === 404) {
        message = "Not Found";
      } else if (status === 403) {
        message = "403 Forbidden";
      } else {
        message = message ?? "Error 500. Backanda nomalum xatolik yuz berdi!";
      }

      if (message) {
        Notify.create({
          progress: true,
          position: "top",
          message,
          type: "negative",
          timeout: 6000,
        });
      }

      return { data: { result: null, error: true } };
    }
  );
});

export { api };

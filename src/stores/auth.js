import { defineStore } from "pinia";
import * as api from "src/api/auth";
import {
  getTokenFromCache,
  removeTokenFromCache,
  setTokenToCache,
} from "src/utils/auth";
import { ref, computed } from "vue-demi";
export const useAuthStore = defineStore("auth", () => {
  const token = ref(getTokenFromCache());
  const user = ref({});
  const isAuth = computed(() => !!token.value);
  async function login(payload) {
    const res = await api.login(payload);
    const token = res?.data.result?.token;

    console.log("res", res);
    if (token) {
      setToken(token);
      getUser();
    }
    return res;
  }

  function setUser(data) {
    user.value = data;
  }
  async function getUser() {
    const res = await api.me();
    if (res?.data?.result) {
      setUser(res.data?.result);
    }
  }
  function setToken(payload) {
    token.value = payload;
    setTokenToCache(payload);
  }
  function removeToken() {
    token.value = null;
    removeTokenFromCache();
  }
  async function logout() {
    removeToken();
  }
  return {
    login,
    logout,
    user,
    isAuth,
  };
});

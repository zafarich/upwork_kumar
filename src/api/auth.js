import { api } from "src/boot/axios";
const urlAdmin = "auth";

export async function login(payload) {
  const { data } = await api.post("admin/" + urlAdmin + "/login", payload, {
    pass: true,
  });

  return data;
}
export async function me(payload) {
  const { data } = await api(urlAdmin + "/me", payload, {
    pass: true,
  });
  return data;
}

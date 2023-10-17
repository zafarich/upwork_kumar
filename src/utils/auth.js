const KEY = "token";

export function getTokenFromCache() {
  return localStorage.getItem(KEY);
}
export function setTokenToCache(token) {
  return localStorage.setItem(KEY, token);
}
export function removeTokenFromCache() {
  return localStorage.removeItem(KEY);
}

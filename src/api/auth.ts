import { AUTH_BASE_URL } from "../utils/const";
import { getPref, setPref } from "../utils/prefs";

export interface LoginResponse {
  token: string;
  user: {
    name: string;
    email: string;
  };
}

export async function login(
  email: string,
  password: string,
): Promise<LoginResponse> {
  const url = `${AUTH_BASE_URL}/auth/login`;
  const xhr = await Zotero.HTTP.request("POST", url, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ email, password }),
    responseType: "json",
  });

  if (xhr?.status !== 200) {
    const msg = xhr?.response?.message || `HTTP ${xhr?.status}`;
    throw new Error(msg);
  }

  const resp = xhr.response;
  if (resp.code !== 0) {
    throw new Error(resp.message || "登录失败");
  }

  const data = resp.data as LoginResponse;
  setPref("authkey", data.token);
  setPref("userEmail", data.user.email);
  setPref("userName", data.user.name);

  return data;
}

export function logout(): void {
  setPref("authkey", "");
  setPref("userEmail", "");
  setPref("userName", "");
}

export function isLoggedIn(): boolean {
  const token = getPref("authkey");
  return !!token;
}

export function getLoggedInEmail(): string {
  return getPref("userEmail") || "";
}

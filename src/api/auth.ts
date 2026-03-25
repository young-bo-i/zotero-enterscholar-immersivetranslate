import { setPref } from "../utils/prefs";

export function logout(): void {
  setPref("authkey", "");
}

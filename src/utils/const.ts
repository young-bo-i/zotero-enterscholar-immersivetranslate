const SELF_HOSTED_SERVER = "https://enterscholar.com";
const API_PREFIX = "/zotero-bridge/v1";

export const AUTH_BASE_URL = `${SELF_HOSTED_SERVER}${API_PREFIX}`;

export const APP_SITE_URL = SELF_HOSTED_SERVER;
export const TEST_APP_SITE_URL = SELF_HOSTED_SERVER;

export const SELF_SERVICE_COLLECT_URL = "";
export const SELF_SERVICE_COLLECT_URL_CN = "";

export const BASE_URL_TEST = `${SELF_HOSTED_SERVER}${API_PREFIX}/babeldoc`;
export const BASE_URL = `${SELF_HOSTED_SERVER}${API_PREFIX}/babeldoc`;

export const BASE_URL_TEST_CN = BASE_URL;
export const BASE_URL_CN = BASE_URL;

export const HEALTHCHECK_URL_TEST = `${SELF_HOSTED_SERVER}${API_PREFIX}/babeldoc/connectivity_check`;
export const HEALTHCHECK_URL = `${SELF_HOSTED_SERVER}${API_PREFIX}/babeldoc/connectivity_check`;

export const BEBELDOC_URL = `${SELF_HOSTED_SERVER}${API_PREFIX}/babeldoc/`;

export function getGMurls() {
  return [];
}

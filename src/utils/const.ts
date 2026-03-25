// ============================================================
// 恩特学术服务地址
// ============================================================
const SELF_HOSTED_SERVER = "https://enterscholar.com";
const API_PREFIX = "/zotero-bridge/v1";

export const AUTH_BASE_URL = `${SELF_HOSTED_SERVER}${API_PREFIX}`;

export const HOST_NAME = "enterscholar.com";
export const HOST_NAME_CN = "enterscholar.com";
export const APP_SITE_URL = SELF_HOSTED_SERVER;
export const TEST_APP_SITE_URL = SELF_HOSTED_SERVER;

const OLD_GA_MEASUREMENT_ID = __OLD_GA_MEASUREMENT_ID__ || "";
const OLD_GA_API_SECRET = __OLD_GA_API_SECRET__ || "";
const NEW_GA_MEASUREMENT_ID = __NEW_GA_MEASUREMENT_ID__ || "";
const NEW_GA_API_SECRET = __NEW_GA_API_SECRET__ || "";

export const BASE_URL_TEST = `${SELF_HOSTED_SERVER}${API_PREFIX}/babeldoc`;
export const BASE_URL = `${SELF_HOSTED_SERVER}${API_PREFIX}/babeldoc`;

export const BASE_URL_TEST_CN = `${SELF_HOSTED_SERVER}${API_PREFIX}/babeldoc`;
export const BASE_URL_CN = `${SELF_HOSTED_SERVER}${API_PREFIX}/babeldoc`;

export const SELF_SERVICE_COLLECT_URL = `https://analytics.${HOST_NAME}/collect`;
export const SELF_SERVICE_COLLECT_URL_CN = `https://analytics.${HOST_NAME_CN}/collect`;

export const HEALTHCHECK_URL_TEST = `${SELF_HOSTED_SERVER}${API_PREFIX}/babeldoc/connectivity_check`;
export const HEALTHCHECK_URL = `${SELF_HOSTED_SERVER}${API_PREFIX}/babeldoc/connectivity_check`;

export const BEBELDOC_URL = `${SELF_HOSTED_SERVER}${API_PREFIX}/babeldoc/`;

export function getGMurls() {
  if (!NEW_GA_MEASUREMENT_ID || NEW_GA_MEASUREMENT_ID === "undefined") {
    ztoolkit.log("Warning: env not inject success!");
    return [];
  }
  if (addon.data.env === "development") {
    return [
      `https://www.google-analytics.com/debug/mp/collect?measurement_id=${OLD_GA_MEASUREMENT_ID}&api_secret=${OLD_GA_API_SECRET}`,
      `https://www.google-analytics.com/debug/mp/collect?measurement_id=${NEW_GA_MEASUREMENT_ID}&api_secret=${NEW_GA_API_SECRET}`,
    ];
  }
  return [
    `https://www.google-analytics.com/mp/collect?measurement_id=${OLD_GA_MEASUREMENT_ID}&api_secret=${OLD_GA_API_SECRET}`,
    `https://www.google-analytics.com/mp/collect?measurement_id=${NEW_GA_MEASUREMENT_ID}&api_secret=${NEW_GA_API_SECRET}`,
  ];
}

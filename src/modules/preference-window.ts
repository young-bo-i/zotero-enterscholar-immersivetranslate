import { config } from "../../package.json";
import { getString } from "../utils/locale";
import { getPref, setPref } from "../utils/prefs";
import { showDialog } from "../utils/dialog";
import { getLanguages, getLanguageName } from "./language";
import {
  translateModes,
  translateModels,
  dualModeOptions,
  fontFamilyOptions,
  ocrWorkaroundOptions,
  translateModels_CN,
  layoutModelOptions,
} from "../config";
import type { Language } from "./language/types";
import { checkIsCN } from "../utils/cn";
import { login, logout, isLoggedIn, getLoggedInEmail } from "../api/auth";

export function registerPrefs() {
  Zotero.PreferencePanes.register({
    pluginID: addon.data.config.addonID,
    src: rootURI + "content/preferences.xhtml",
    label: getString("prefs-title"),
    image: `chrome://${addon.data.config.addonRef}/content/icons/favicon.png`,
  });
}

export async function registerPrefsScripts(_window: Window) {
  // This function is called when the prefs window is opened
  // See addon/content/preferences.xhtml onpaneload
  if (!addon.data.prefs) {
    addon.data.prefs = {
      window: _window,
    };
  } else {
    addon.data.prefs.window = _window;
  }
  buildPrefsPane();
  bindPrefEvents();
}

function buildPrefsPane() {
  const doc = addon.data.prefs?.window?.document;
  if (!doc) {
    return;
  }
  ztoolkit.UI.replaceElement(
    {
      tag: "menulist",
      id: `${config.addonRef}-target-language`,
      attributes: {
        value: getPref("targetLanguage") as string,
        native: "true",
      },
      styles: {
        maxWidth: "250px",
      },
      children: [
        {
          tag: "menupopup",
          children: getLanguages().map((lang) => {
            const nativeLang = getLanguageName(lang, Zotero.locale as Language);
            return {
              tag: "menuitem",
              attributes: {
                label: nativeLang,
                value: lang,
              },
            };
          }),
        },
      ],
      listeners: [
        {
          type: "command",
          listener: (e: Event) => {
            ztoolkit.log(e);
            setPref("targetLanguage", (e.target as XUL.MenuList).value);
          },
        },
      ],
    },
    doc.querySelector(`#${config.addonRef}-target-language-placeholder`)!,
  );

  ztoolkit.UI.replaceElement(
    {
      tag: "menulist",
      id: `${config.addonRef}-translate-mode`,
      attributes: {
        value: getPref("translateMode") as string,
        native: "true",
      },
      styles: {
        maxWidth: "250px",
      },
      children: [
        {
          tag: "menupopup",
          children: translateModes.map((item) => {
            return {
              tag: "menuitem",
              attributes: {
                label: getString(item.label),
                value: item.value,
              },
            };
          }),
        },
      ],
      listeners: [
        {
          type: "command",
          listener: (e: Event) => {
            ztoolkit.log(e);
            setPref("translateMode", (e.target as XUL.MenuList).value);
          },
        },
      ],
    },
    doc.querySelector(`#${config.addonRef}-translate-mode-placeholder`)!,
  );

  const isCN = checkIsCN();
  const real_translateModels = isCN ? translateModels_CN : translateModels;

  ztoolkit.UI.replaceElement(
    {
      tag: "menulist",
      id: `${config.addonRef}-translate-model`,
      attributes: {
        value: getPref("translateModel") as string,
        native: "true",
      },
      styles: {
        maxWidth: "250px",
      },
      children: [
        {
          tag: "menupopup",
          children: real_translateModels.map((item) => {
            return {
              tag: "menuitem",
              attributes: {
                label: getString(item.label),
                value: item.value,
              },
            };
          }),
        },
      ],
      listeners: [
        {
          type: "command",
          listener: (e: Event) => {
            ztoolkit.log(e);
            setPref("translateModel", (e.target as XUL.MenuList).value);
          },
        },
      ],
    },
    doc.querySelector(`#${config.addonRef}-translate-model-placeholder`)!,
  );

  ztoolkit.UI.replaceElement(
    {
      tag: "menulist",
      id: `${config.addonRef}-enable-ocr-workaround`,
      attributes: {
        value: getPref("ocrWorkaround") as string,
        native: "true",
      },
      styles: {
        maxWidth: "250px",
      },
      children: [
        {
          tag: "menupopup",
          children: ocrWorkaroundOptions.map((item) => {
            return {
              tag: "menuitem",
              attributes: {
                label: getString(item.label),
                value: item.value,
              },
            };
          }),
        },
      ],
      listeners: [
        {
          type: "command",
          listener: (e: Event) => {
            ztoolkit.log(e);
            setPref("ocrWorkaround", (e.target as XUL.MenuList).value);
          },
        },
      ],
    },
    doc.querySelector(`#${config.addonRef}-enable-ocr-workaround-placeholder`)!,
  );

  ztoolkit.UI.replaceElement(
    {
      tag: "menulist",
      id: `${config.addonRef}-font-family`,
      attributes: {
        value: getPref("primaryFontFamily") as string,
        native: "true",
      },
      styles: {
        maxWidth: "250px",
      },
      children: [
        {
          tag: "menupopup",
          children: fontFamilyOptions.map((item) => {
            return {
              tag: "menuitem",
              attributes: {
                label: getString(item.label),
                value: item.value,
              },
            };
          }),
        },
      ],
      listeners: [
        {
          type: "command",
          listener: (e: Event) => {
            ztoolkit.log(e);
            setPref("primaryFontFamily", (e.target as XUL.MenuList).value);
          },
        },
      ],
    },
    doc.querySelector(`#${config.addonRef}-font-family-placeholder`)!,
  );

  ztoolkit.UI.replaceElement(
    {
      tag: "menulist",
      id: `${config.addonRef}-dual-mode`,
      attributes: {
        value: getPref("dualMode") as string,
        native: "true",
      },
      styles: {
        maxWidth: "250px",
      },
      children: [
        {
          tag: "menupopup",
          children: dualModeOptions.map((item) => {
            return {
              tag: "menuitem",
              attributes: {
                label: getString(item.label),
                value: item.value,
              },
            };
          }),
        },
      ],
      listeners: [
        {
          type: "command",
          listener: (e: Event) => {
            ztoolkit.log(e);
            setPref("dualMode", (e.target as XUL.MenuList).value);
          },
        },
      ],
    },
    doc.querySelector(`#${config.addonRef}-dual-mode-placeholder`)!,
  );

  ztoolkit.UI.replaceElement(
    {
      tag: "menulist",
      id: `${config.addonRef}-layout-model`,
      attributes: {
        value: getPref("layoutModel") as string,
        native: "true",
      },
      styles: {
        maxWidth: "250px",
      },
      children: [
        {
          tag: "menupopup",
          children: layoutModelOptions.map((item) => {
            return {
              tag: "menuitem",
              attributes: {
                label: getString(item.label),
                value: item.value,
              },
            };
          }),
        },
      ],
      listeners: [
        {
          type: "command",
          listener: (e: Event) => {
            ztoolkit.log(e);
            setPref("layoutModel", (e.target as XUL.MenuList).value);
          },
        },
      ],
    },
    doc.querySelector(`#${config.addonRef}-layout-model-placeholder`)!,
  );
}

function updateLoginUI() {
  const doc = addon.data.prefs?.window?.document;
  if (!doc) return;

  const loginSection = doc.getElementById(
    `zotero-prefpane-${config.addonRef}-login-section`,
  );
  const loggedInSection = doc.getElementById(
    `zotero-prefpane-${config.addonRef}-loggedin-section`,
  );
  const statusLabel = doc.getElementById(
    `zotero-prefpane-${config.addonRef}-login-status`,
  );

  if (isLoggedIn()) {
    loginSection?.setAttribute("hidden", "true");
    loggedInSection?.removeAttribute("hidden");
    if (statusLabel) {
      statusLabel.setAttribute(
        "value",
        `${getString("pref-login-status")}: ${getLoggedInEmail()}`,
      );
    }
  } else {
    loginSection?.removeAttribute("hidden");
    loggedInSection?.setAttribute("hidden", "true");
  }
}

function bindPrefEvents() {
  const doc = addon.data.prefs?.window?.document;
  if (!doc) return;

  updateLoginUI();

  doc
    .getElementById(`zotero-prefpane-${config.addonRef}-login-button`)
    ?.addEventListener("command", async () => {
      const emailInput = doc.getElementById(
        `zotero-prefpane-${config.addonRef}-login-email`,
      ) as HTMLInputElement | null;
      const passwordInput = doc.getElementById(
        `zotero-prefpane-${config.addonRef}-login-password`,
      ) as HTMLInputElement | null;

      const email = emailInput?.value?.trim();
      const password = passwordInput?.value;

      if (!email || !password) {
        showDialog({ title: getString("pref-login-failed") });
        return;
      }

      try {
        await login(email, password);
        showDialog({ title: getString("pref-login-success") });
        if (passwordInput) passwordInput.value = "";
        updateLoginUI();
      } catch (error: any) {
        ztoolkit.log("Login failed:", error);
        showDialog({
          title: getString("pref-login-failed"),
          message: error.message,
        });
      }
    });

  doc
    .getElementById(`zotero-prefpane-${config.addonRef}-logout-button`)
    ?.addEventListener("command", () => {
      logout();
      updateLoginUI();
    });
}

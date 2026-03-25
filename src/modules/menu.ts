import { config } from "../../package.json";
import { getString } from "../utils/locale";

export function registerMenu() {
  const doc = Zotero.getMainWindow()?.document;
  if (!doc) return;

  const menuIcon = `chrome://${config.addonRef}/content/icons/favicon@0.5x.png`;

  const existing = doc.getElementById("zotero-itemmenu-babeldoc-translate");
  if (existing) existing.remove();

  const menuItem = doc.createXULElement("menuitem");
  menuItem.id = "zotero-itemmenu-babeldoc-translate";
  menuItem.setAttribute("label", getString("menuitem-translate"));
  menuItem.setAttribute("image", menuIcon);
  menuItem.setAttribute("class", "menuitem-iconic");
  menuItem.addEventListener("command", () => addon.hooks.onTranslate());

  doc.getElementById("zotero-itemmenu")?.appendChild(menuItem);
}

export function registerWindowMenu() {
  const doc = Zotero.getMainWindow()?.document;
  if (!doc) return;

  const existingSep = doc.getElementById(
    "zotero-menuview-babeldoc-translate-separator",
  );
  if (existingSep) existingSep.remove();
  const existingItem = doc.getElementById(
    "zotero-menuview-babeldoc-translate-menuitem",
  );
  if (existingItem) existingItem.remove();

  const viewMenu = doc.getElementById("menu_viewPopup");
  if (!viewMenu) return;

  const separator = doc.createXULElement("menuseparator");
  separator.id = "zotero-menuview-babeldoc-translate-separator";
  viewMenu.appendChild(separator);

  const menuItem = doc.createXULElement("menuitem");
  menuItem.id = "zotero-menuview-babeldoc-translate-menuitem";
  menuItem.setAttribute("label", getString("menuView-tasks"));
  menuItem.addEventListener("command", () =>
    addon.hooks.onViewTranslationTasks(),
  );
  viewMenu.appendChild(menuItem);
}

export function unregisterMenu() {
  const doc = Zotero.getMainWindow()?.document;
  if (!doc) return;

  [
    "zotero-itemmenu-babeldoc-translate",
    "zotero-menuview-babeldoc-translate-separator",
    "zotero-menuview-babeldoc-translate-menuitem",
  ].forEach((id) => {
    doc.getElementById(id)?.remove();
  });
}

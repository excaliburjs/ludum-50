import store from "store";

export let Preferences = {
  muteBackgroundMusic: false,
  muteAll: false,
};

let _origPreferences = { ...Preferences };

export function resetPreferences() {
  Preferences = { ..._origPreferences };
}

export function savePreferences() {
  store.set("pref", Preferences);
}

export function loadPreferences() {
  // overwrite but allow new properties
  Preferences = { ...Preferences, ...store.get("pref") };
}
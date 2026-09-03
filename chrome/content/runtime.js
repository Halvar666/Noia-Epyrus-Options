var NoiaEpyrusOptions = NoiaEpyrusOptions || {};

NoiaEpyrusOptions.Runtime = {
  PREF_BRANCH: "extensions.noiaepyrusoptions.",
  THEME_PREF: "general.skins.selectedSkin",
  THEME_NAME: "noiaepyrus",

  ALL_SHEETS: [
    "chrome://noiaepyrusoptions/content/color-blue.css",
    "chrome://noiaepyrusoptions/content/color-black.css",
    "chrome://noiaepyrusoptions/content/color-black-linux.css",
    "chrome://noiaepyrusoptions/content/color-black-windows.css",
    "chrome://noiaepyrusoptions/content/color-black-australis-tabs.css",
    "chrome://noiaepyrusoptions/content/color-black-classic-tabs.css",
    "chrome://noiaepyrusoptions/content/classic-tabs-square.css",
    "chrome://noiaepyrusoptions/content/classic-tabs-rounded.css",
    "chrome://noiaepyrusoptions/content/dialog-tabs-square.css",
    "chrome://noiaepyrusoptions/content/dialog-tabs-rounded.css",
    "chrome://noiaepyrusoptions/content/rounded-buttons.css",
    "chrome://noiaepyrusoptions/content/blue-close-buttons.css",
    "chrome://noiaepyrusoptions/content/no-toolbar-borders.css",
    "chrome://noiaepyrusoptions/content/toolbar-hover-background.css",
    "chrome://noiaepyrusoptions/content/plain-toolbars.css",
    "chrome://noiaepyrusoptions/content/striped-message-list.css"
  ],

  _prefs: function() {
    return Components.classes["@mozilla.org/preferences-service;1"]
      .getService(Components.interfaces.nsIPrefService)
      .getBranch(this.PREF_BRANCH);
  },

  _rootPrefs: function() {
    return Components.classes["@mozilla.org/preferences-service;1"]
      .getService(Components.interfaces.nsIPrefService)
      .getBranch("");
  },

  _sss: function() {
    return Components.classes["@mozilla.org/content/style-sheet-service;1"]
      .getService(Components.interfaces.nsIStyleSheetService);
  },

  _ios: function() {
    return Components.classes["@mozilla.org/network/io-service;1"]
      .getService(Components.interfaces.nsIIOService);
  },

  _os: function() {
    try {
      return Components.classes["@mozilla.org/xre/app-info;1"]
        .getService(Components.interfaces.nsIXULRuntime).OS;
    } catch (e) {
      return "";
    }
  },

  isNoiaEpyrusActive: function() {
    try {
      return this._rootPrefs().getCharPref(this.THEME_PREF) == this.THEME_NAME;
    } catch (e) {
      return false;
    }
  },

  getBool: function(name) {
    try { return this._prefs().getBoolPref(name); }
    catch (e) { return false; }
  },

  getChar: function(name, fallback) {
    try { return this._prefs().getCharPref(name); }
    catch (e) { return fallback || ""; }
  },

  setBool: function(name, value) {
    this._prefs().setBoolPref(name, !!value);
    this.applyAll();
  },

  setChar: function(name, value) {
    this._prefs().setCharPref(name, value);
    this.applyAll();
  },

  clear: function(name) {
    try { this._prefs().clearUserPref(name); } catch (e) {}
  },

  _setSheet: function(url, enabled) {
    var sss = this._sss();
    var uri = this._ios().newURI(url, null, null);
    var type = sss.AGENT_SHEET;
    var registered = sss.sheetRegistered(uri, type);
    if (enabled && !registered)
      sss.loadAndRegisterSheet(uri, type);
    else if (!enabled && registered)
      sss.unregisterSheet(uri, type);
  },

  _unregisterAll: function() {
    for (var i = 0; i < this.ALL_SHEETS.length; i++)
      this._setSheet(this.ALL_SHEETS[i], false);
  },

  migrateLegacyPreferences: function() {
    var prefs = this._prefs();
    try {
      if (prefs.prefHasUserValue("classicTabs") && prefs.getBoolPref("classicTabs") &&
          !prefs.prefHasUserValue("tabStyle")) {
        prefs.setCharPref("tabStyle", "classic-square");
      }
      if (prefs.prefHasUserValue("classicTabs")) prefs.clearUserPref("classicTabs");
    } catch (e) {}
  },

  applyAll: function() {
    this.migrateLegacyPreferences();
    this._unregisterAll();
    if (!this.isNoiaEpyrusActive()) return;

    var scheme = this.getChar("colorScheme", "grey");
    var tabStyle = this.getChar("tabStyle", "australis");
    var dialogStyle = this.getChar("dialogTabStyle", "standard");

    // Base colour scheme first; later modifiers deliberately override it.
    if (scheme == "blue")
      this._setSheet("chrome://noiaepyrusoptions/content/color-blue.css", true);
    else if (scheme == "black") {
      this._setSheet("chrome://noiaepyrusoptions/content/color-black.css", true);
      var os = this._os();
      if (os == "Linux")
        this._setSheet("chrome://noiaepyrusoptions/content/color-black-linux.css", true);
      else if (os == "WINNT")
        this._setSheet("chrome://noiaepyrusoptions/content/color-black-windows.css", true);
    }

    if (tabStyle == "classic-square")
      this._setSheet("chrome://noiaepyrusoptions/content/classic-tabs-square.css", true);
    else if (tabStyle == "classic-rounded")
      this._setSheet("chrome://noiaepyrusoptions/content/classic-tabs-rounded.css", true);

    // Apply Black tab foregrounds after the chosen geometry.  The default
    // curved Noia tabs and classic light tab faces need opposite text
    // colours, and the Australis sheet must never paint the outer tab box.
    if (scheme == "black") {
      if (tabStyle == "classic-square" || tabStyle == "classic-rounded")
        this._setSheet("chrome://noiaepyrusoptions/content/color-black-classic-tabs.css", true);
      else
        this._setSheet("chrome://noiaepyrusoptions/content/color-black-australis-tabs.css", true);
    }

    if (dialogStyle == "square")
      this._setSheet("chrome://noiaepyrusoptions/content/dialog-tabs-square.css", true);
    else if (dialogStyle == "rounded")
      this._setSheet("chrome://noiaepyrusoptions/content/dialog-tabs-rounded.css", true);

    if (this.getBool("roundedButtons"))
      this._setSheet("chrome://noiaepyrusoptions/content/rounded-buttons.css", true);
    if (this.getBool("blueCloseButtons"))
      this._setSheet("chrome://noiaepyrusoptions/content/blue-close-buttons.css", true);
    if (this.getBool("noToolbarBorders"))
      this._setSheet("chrome://noiaepyrusoptions/content/no-toolbar-borders.css", true);
    if (this.getBool("toolbarHoverBackground"))
      this._setSheet("chrome://noiaepyrusoptions/content/toolbar-hover-background.css", true);
    if (this.getBool("plainToolbars"))
      this._setSheet("chrome://noiaepyrusoptions/content/plain-toolbars.css", true);
    if (this.getBool("stripedRows"))
      this._setSheet("chrome://noiaepyrusoptions/content/striped-message-list.css", true);
  },

  reset: function() {
    var names = ["colorScheme", "tabStyle", "dialogTabStyle", "roundedButtons",
                 "blueCloseButtons", "stripedRows", "noToolbarBorders",
                 "toolbarHoverBackground", "plainToolbars", "classicTabs"];
    for (var i = 0; i < names.length; i++) this.clear(names[i]);
    this.applyAll();
  }
};

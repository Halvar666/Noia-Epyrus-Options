var NoiaEpyrusOptionsDialog = {
  init: function() {
    NoiaEpyrusOptions.Runtime.migrateLegacyPreferences();
    document.getElementById("colorScheme").value = NoiaEpyrusOptions.Runtime.getChar("colorScheme", "grey");
    document.getElementById("tabStyle").value = NoiaEpyrusOptions.Runtime.getChar("tabStyle", "australis");
    document.getElementById("dialogTabStyle").value = NoiaEpyrusOptions.Runtime.getChar("dialogTabStyle", "standard");
    document.getElementById("roundedButtons").checked = NoiaEpyrusOptions.Runtime.getBool("roundedButtons");
    document.getElementById("blueCloseButtons").checked = NoiaEpyrusOptions.Runtime.getBool("blueCloseButtons");
    document.getElementById("stripedRows").checked = NoiaEpyrusOptions.Runtime.getBool("stripedRows");
    document.getElementById("noToolbarBorders").checked = NoiaEpyrusOptions.Runtime.getBool("noToolbarBorders");
    document.getElementById("toolbarHoverBackground").checked = NoiaEpyrusOptions.Runtime.getBool("toolbarHoverBackground");
    document.getElementById("plainToolbars").checked = NoiaEpyrusOptions.Runtime.getBool("plainToolbars");

    var status = document.getElementById("themeStatus");
    if (NoiaEpyrusOptions.Runtime.isNoiaEpyrusActive()) {
      status.value = "Noia Epyrus is active. Changes are applied immediately.";
      status.setAttribute("class", "theme-active");
    } else {
      status.value = "Noia Epyrus is not active. Preferences are saved, but no theme CSS is applied.";
      status.setAttribute("class", "theme-inactive");
    }
  },

  choose: function(name, value) {
    NoiaEpyrusOptions.Runtime.setChar(name, value);
  },

  toggle: function(name, checked) {
    NoiaEpyrusOptions.Runtime.setBool(name, checked);
  },

  reset: function() {
    NoiaEpyrusOptions.Runtime.reset();
    this.init();
  }
};

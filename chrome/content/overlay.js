window.addEventListener("load", function noiaEpyrusOptionsLoad() {
  window.removeEventListener("load", noiaEpyrusOptionsLoad, false);
  NoiaEpyrusOptions.Runtime.applyAll();
}, false);

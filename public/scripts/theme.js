(function () {
  function getPreferredTheme() {
    try {
      var stored = localStorage.getItem("theme");
      if (stored === "light" || stored === "dark") return stored;
    } catch {}
    var prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
  }

  function applyTheme(theme) {
    document.documentElement.classList.toggle("dark", theme === "dark");
    try {
      localStorage.setItem("theme", theme);
    } catch {}
  }

  function syncToggleButton() {
    var btn = document.querySelector("[data-theme-toggle]");
    if (!btn) return;
    btn.setAttribute(
      "aria-pressed",
      String(document.documentElement.classList.contains("dark"))
    );
  }

  function toggle() {
    var next = document.documentElement.classList.contains("dark")
      ? "light"
      : "dark";
    applyTheme(next);
    return next;
  }

  // Ensure state is consistent if user changed system theme while we're open.
  applyTheme(getPreferredTheme());
  syncToggleButton();

  document.addEventListener("click", function (e) {
    var target = e.target;
    if (!(target instanceof Element)) return;
    var btn = target.closest("[data-theme-toggle]");
    if (!btn) return;
    var theme = toggle();
    btn.setAttribute("aria-pressed", String(theme === "dark"));
  });
})();

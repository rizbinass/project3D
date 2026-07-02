import { APP_THEME_STORAGE_KEY } from "@/core/constants/app.constants";

const themeInitScript = `
(() => {
  try {
    const storedMode = window.localStorage.getItem("${APP_THEME_STORAGE_KEY}") || "dark";
    const resolvedTheme = storedMode === "system"
      ? (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark")
      : storedMode;

    document.documentElement.dataset.theme = resolvedTheme;
    document.documentElement.classList.toggle("dark", resolvedTheme === "dark");
  } catch {
    document.documentElement.dataset.theme = "dark";
    document.documentElement.classList.add("dark");
  }
})();
`;

export function ThemeInitScript() {
  return <script id="theme-init" dangerouslySetInnerHTML={{ __html: themeInitScript }} />;
}

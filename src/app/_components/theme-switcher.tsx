"use client";

import styles from "./theme-switcher.module.css";

export default function ThemeSwitcher() {
  return (
    <button
      className={styles.button}
      type="button"
      aria-label="Mudar tema"
      onClick={() => {
        document.documentElement.classList.toggle("dark");

        localStorage.setItem(
          "theme",
          document.documentElement.classList.contains("dark") ? "dark" : "light"
        );
      }}
    >
      <span className={[styles.icon, "material-symbols-outlined"].join(" ")}>
        contrast
      </span>
    </button>
  );
}

const storedTheme = localStorage.getItem("theme");
const deviceIsDark = matchMedia("(prefers-color-scheme: dark)").matches;
if (storedTheme === "dark" || (storedTheme == undefined && deviceIsDark))
  document.documentElement.classList.add("dark");

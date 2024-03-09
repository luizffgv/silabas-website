import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import styles from "./layout.module.css";
import ThemeSwitcher from "./_components/theme-switcher";

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
});

export const metadata: Metadata = {
  title: "Separador de Sílabas",
  description: "Veja como é uma palavra dividida em sílabas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={[styles.root, quicksand.variable].join(" ")}
      suppressHydrationWarning
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&display=block"
          rel="stylesheet"
        />
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="initial-theme-applier.js"></script>
      </head>
      <body>
        <ThemeSwitcher></ThemeSwitcher>
        <main className={styles.main}>{children}</main>
        <footer className={styles.footer}>
          <p>
            Feito por{" "}
            <a href="https://github.com/luizffgv" target="_blank">
              luizffgv
            </a>{" "}
            utilizando{" "}
            <a href="https://github.com/luizffgv/silabas-js" target="_blank">
              @luizffgv/silabas
            </a>
            <br />
            <a
              href="https://github.com/luizffgv/silabas-website"
              target="_blank"
            >
              Veja o código aqui
            </a>
          </p>
        </footer>
      </body>
    </html>
  );
}

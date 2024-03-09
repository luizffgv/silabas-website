import { dividirSilabas } from "@luizffgv/silabas";
import { useMemo } from "react";
import styles from "./syllable-separator.module.css";

export default function SyllableSeparator({ text }: { text: string }) {
  const { separated, syllableCount } = useMemo(() => {
    const words = text
      .trim()
      .split(/\s+/)
      .map((word) => dividirSilabas(word));

    const separated = words.map((word) => word.join("-")).join(" ");

    const syllableCount = words
      .flat()
      .filter((syllable) => syllable.length > 0).length;

    return { separated, syllableCount };
  }, [text]);

  return (
    <div className={styles.separator} data-empty={text.length === 0}>
      <span className={styles.separated}>{separated}</span>{" "}
      <span aria-label={`(${syllableCount} sílabas)`}>({syllableCount})</span>
    </div>
  );
}

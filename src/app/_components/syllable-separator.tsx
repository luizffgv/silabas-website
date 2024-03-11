import { dividirSilabas } from "@luizffgv/silabas";
import { useEffect, useMemo, useRef } from "react";
import styles from "./syllable-separator.module.css";

export default function SyllableSeparator({ text }: { text: string }) {
  const lastCharRef = useRef<HTMLSpanElement>(null);

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

  useEffect(() => {
    if (lastCharRef.current == null) return;

    new Animation(
      new KeyframeEffect(lastCharRef.current, [{ opacity: 0 }, {}], {
        duration: 250,
        easing: "ease",
      })
    ).play();
  }, [separated]);

  return (
    <div className={styles.separator} data-empty={text.length === 0}>
      <span className={styles.separated}>
        {separated.slice(0, -1)}
        <span ref={lastCharRef}>{separated.slice(-1)}</span>
      </span>{" "}
      <span aria-label={`(${syllableCount} sílabas)`}>({syllableCount})</span>
    </div>
  );
}

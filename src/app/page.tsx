"use client";

import { useEffect, useRef, useState } from "react";
import Card from "./_components/card";
import SyllableSeparator from "./_components/syllable-separator";
import styles from "./page.module.css";
import TextInput from "./_components/text-input";
import Heading from "./_components/heading";
import { useRouter, useSearchParams } from "next/navigation";

export default function Page() {
  const urlText = useSearchParams().get("texto");
  const [text, setText] = useState(urlText ?? "");
  const separatorWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const newUrl = `${window.location.protocol}//${window.location.host}${
      window.location.pathname
    }?texto=${encodeURIComponent(text)}`;
    history.replaceState(null, "", newUrl);

    if (separatorWrapperRef.current == null) return;

    const animation = new Animation(
      new KeyframeEffect(separatorWrapperRef.current, [{ scale: "0.95" }, {}], {
        duration: 50,
      })
    );
    animation.play();
  }, [text]);

  return (
    <>
      <Heading>Separador de sílabas</Heading>
      <Card>
        <TextInput
          label="Texto"
          placeholder="Digite algo aqui"
          onInput={(e) => setText(e.currentTarget.value)}
        />
      </Card>
      <div
        className={styles["separator-wrapper"]}
        ref={separatorWrapperRef}
        data-empty={text.length === 0}
      >
        <Card>
          <SyllableSeparator text={text}></SyllableSeparator>
        </Card>
      </div>
    </>
  );
}

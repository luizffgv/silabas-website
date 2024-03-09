import styles from "./text-input.module.css";
import { FormEventHandler } from "react";

export default function TextInput({
  label,
  placeholder,
  onInput,
}: {
  label: string;
  placeholder?: string;
  onInput: FormEventHandler<HTMLInputElement>;
}) {
  return (
    <label className={styles.container}>
      <div className={styles.label}>{label}</div>
      <input
        className={styles.input}
        type="text"
        placeholder={placeholder}
        onInput={onInput}
      />
    </label>
  );
}

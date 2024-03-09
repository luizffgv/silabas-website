import styles from "./card.module.css";

export default function Card({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className={styles.card}>{children}</div>;
}

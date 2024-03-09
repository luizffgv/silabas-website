import styles from "./heading.module.css";

export default function Heading({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <h1 className={styles.heading}>{children}</h1>;
}

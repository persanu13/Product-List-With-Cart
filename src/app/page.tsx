import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <Image
        src="/assets/images/image-waffle-thumbnail.jpg"
        alt="ceva"
        width="64"
        height="64"
      />
      <p>Ceva</p>
    </div>
  );
}

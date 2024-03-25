import { useState } from "react";
import SimpleCashierSession from "./SimpleCashierSession/simpleCashierSession";
import styles from "./openingProcess.module.css";

export default function OpeningProcess() {
  const [process, setProcess] = useState(1);
  return (
    <main className={styles.screen}>
      <SimpleCashierSession></SimpleCashierSession>
    </main>
  );
}

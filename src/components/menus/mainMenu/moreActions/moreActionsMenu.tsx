import { ActionsKeyboard } from "../../../mainKeyboard/actionKeyboard";
import styles from "./moreActionsMenu.module.css";
interface Props {
  isOpen: any;
  onClose: any;
  children: any;
}
export default function MoreActionsMenu({ isOpen, onClose, children }: Props) {
  return (
    <main className={styles.screen}>
      <section className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          X
        </button>
        <div className={styles.actionsContainer}></div>
        <ActionsKeyboard></ActionsKeyboard>
      </section>
    </main>
  );
}

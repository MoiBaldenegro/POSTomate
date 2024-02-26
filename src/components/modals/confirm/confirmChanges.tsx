import { useNavigate } from "react-router-dom";
import styles from "./confirmChanges.module.css";
interface Props {
  isOpen: any;
  onClose: any;
  children: any;
  route: string;
  action?: (argument: any) => void;
}
export default function ConfirmChanges({
  isOpen,
  onClose,
  children,
  route,
  action,
}: Props) {
  const navigate = useNavigate();

  setTimeout(() => {
    onClose();
    navigate(route);
    if (action) {
    }
  }, 1500);
  return (
    <div className={styles.screen}>
      <section className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          X
        </button>
        {children}
      </section>
    </div>
  );
}

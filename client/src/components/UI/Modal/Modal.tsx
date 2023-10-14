import { FC } from "react";
import styles from "./Modal.module.scss";
import classNames from "classnames";
import getIconByName from "@/utils/getIconByName";

interface ModalProps {}

interface ModalProps {
  active: boolean;
  setActive: (state: boolean) => void;
  children: React.ReactNode;
}

const Modal: FC<ModalProps> = ({ active, setActive, children }) => {
  return (
    <div
      className={classNames(styles["modal"], {
        [styles["modal--active"]]: active,
      })}
      onClick={() => setActive(false)}
    >
      <div
        className={styles["modal__content"]}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={styles["modal__close"]}
          onClick={() => setActive(false)}
        >
          {getIconByName("cross")}
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;

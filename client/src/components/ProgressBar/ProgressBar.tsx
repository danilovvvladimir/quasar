import { FC } from "react";
import styles from "./ProgressBar.module.scss";

interface ProgressBarProps {
  currentPercent: number;
}

const ProgressBar: FC<ProgressBarProps> = ({ currentPercent }) => {
  return (
    <div className={styles["progress-bar"]}>
      <span
        className={styles["progress-bar__fill"]}
        style={{ width: `${currentPercent}%` }}
      ></span>
    </div>
  );
};

export default ProgressBar;

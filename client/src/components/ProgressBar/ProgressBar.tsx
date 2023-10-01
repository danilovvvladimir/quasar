import { FC } from "react";
import "./ProgressBar.scss";

interface ProgressBarProps {
  currentPercent: number;
}

const ProgressBar: FC<ProgressBarProps> = ({ currentPercent }) => {
  return (
    <div className="progress-bar">
      <span
        className="progress-bar__fill"
        style={{ width: `${currentPercent}%` }}
      ></span>
    </div>
  );
};

export default ProgressBar;

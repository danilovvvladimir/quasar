"use client";

import { FC, useState } from "react";
import styles from "./Stepper.module.scss";
import Button from "../Button/Button";
import classNames from "classnames";

interface StepperProps {
  min: number;
  max: number;
}

const Stepper: FC<StepperProps> = ({ max, min }) => {
  const [count, setCount] = useState<number>(min);

  const handleSetCount = (value: number) => {
    if (value < min || value > max) {
      return;
    }

    setCount(value);
  };

  return (
    <div className={styles["stepper"]}>
      <Button
        disabled={count === min}
        className={classNames(styles["stepper__control"], {
          [styles["stepper__control--disabled"]]: count === min,
        })}
        onClick={() => handleSetCount(count - 1)}
      >
        -
      </Button>
      <div className={styles["stepper__number"]}>{count}</div>
      <Button
        disabled={count === max}
        className={classNames(styles["stepper__control"], {
          [styles["stepper__control--disabled"]]: count === max,
        })}
        onClick={() => handleSetCount(count + 1)}
      >
        +
      </Button>
    </div>
  );
};

export default Stepper;

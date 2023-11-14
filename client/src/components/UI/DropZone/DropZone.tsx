"use client";

import { ChangeEventHandler, FC } from "react";
import styles from "./DropZone.module.scss";
import Image from "next/image";
import getIconByName from "@/utils/getIconByName";
import classNames from "classnames";
import useDropZone, { FileWithPreview } from "@/hooks/useDropzone";

interface DropZoneProps {
  name: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  files: FileWithPreview[];
  setFiles: (files: FileWithPreview[]) => void;
}

const DropZone: FC<DropZoneProps> = ({ onChange, name, files, setFiles }) => {
  const {
    getRootProps,
    isDragActive,
    getInputProps,
    MAX_FILES_QUANTITY,
    removeFile,
  } = useDropZone({ name, onChange, files, setFiles });

  return (
    <section>
      <div
        {...getRootProps({
          className: classNames(styles["drop-zone"], {
            [styles["drop-zone--active"]]: isDragActive,
          }),
        })}
      >
        <input {...getInputProps()} name={name} />
        {isDragActive ? (
          <p>Перенесите</p>
        ) : (
          <p>Перенесите сюда изображения...</p>
        )}
        <p>
          {MAX_FILES_QUANTITY - files.length === 0
            ? "Вы не можете добавить больше изображений..."
            : `Вы можете добавить ещё ${MAX_FILES_QUANTITY - files.length}`}
        </p>
      </div>

      <ul className={styles["drop-zone__items"]}>
        {files.map((file) => (
          <li key={file.name} className={styles["drop-zone__item"]}>
            <Image
              src={file.preview}
              title={file.name}
              alt={file.name}
              width={75}
              height={75}
              onLoad={() => {
                URL.revokeObjectURL(file.preview);
              }}
              className={styles["drop-zone__item-image"]}
            />
            <button
              type="button"
              className={styles["drop-zone__item-remove"]}
              onClick={() => removeFile(file.name)}
            >
              {getIconByName("cross")}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default DropZone;

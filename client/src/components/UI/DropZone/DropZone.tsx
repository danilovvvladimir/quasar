"use client";

import {
  ChangeEventHandler,
  FC,
  useCallback,
  useEffect,
  useState,
} from "react";
import styles from "./DropZone.module.scss";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import getIconByName from "@/utils/getIconByName";
import classNames from "classnames";
import { useFormContext } from "react-hook-form";

interface DropZoneProps {
  name: string;
  // setValue: (name: string, value: any) => void;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

interface FileWithPreview extends File {
  preview: string;
}

const DropZone: FC<DropZoneProps> = ({ value, onChange, name }) => {
  const MAX_FILES_QUANTITY: number = 4;

  const [files, setFiles] = useState<FileWithPreview[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: any[]) => {
      if (files.length === MAX_FILES_QUANTITY) {
        return;
      }

      if (acceptedFiles?.length) {
        // setFiles((previousFiles) => [
        //   ...previousFiles,
        //   ...acceptedFiles.map((file) =>
        //     Object.assign(file, { preview: URL.createObjectURL(file) }),
        //   ),
        // ]);
        // setValue(name, [...files, ...updatedFiles]);

        setFiles((previousFiles) => [
          ...previousFiles,
          ...acceptedFiles.map((file) =>
            Object.assign(file, { preview: URL.createObjectURL(file) }),
          ),
        ]);

        // Вызовите onChange с актуальным значением файлов
        const updatedFiles = [...files, ...acceptedFiles];
        onChange && onChange({ target: { name, value: updatedFiles } });
      }
    },
    [files, name],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    maxFiles: MAX_FILES_QUANTITY,
    onDrop,
  });

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  const removeFile = (name: string) => {
    setFiles((files) => files.filter((file) => file.name !== name));
  };

  console.log("files:", files);

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

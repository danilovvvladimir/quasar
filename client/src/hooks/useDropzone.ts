import { useState, useCallback, useEffect, ChangeEventHandler } from "react";
import { useDropzone } from "react-dropzone";

export interface FileWithPreview extends File {
  preview: string;
}

const useDropZone = ({
  name,
  onChange,
  files,
  setFiles,
}: {
  name: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  files: FileWithPreview[];
  setFiles: (files: FileWithPreview[]) => void;
}) => {
  const MAX_FILES_QUANTITY: number = 4;

  const onDrop = useCallback(
    (acceptedFiles: any[]) => {
      if (files.length === MAX_FILES_QUANTITY) {
        return;
      }

      if (acceptedFiles?.length) {
        setFiles([
          ...acceptedFiles.map((file) =>
            Object.assign(file, { preview: URL.createObjectURL(file) }),
          ),
        ]);

        const updatedFiles = [...files, ...acceptedFiles];
        onChange({ target: { name, value: updatedFiles } });
      }

      console.log(files);
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
    const filteredFiles = files.filter((file) => file.name !== name);

    setFiles(filteredFiles);
    onChange({
      target: { name, value: filteredFiles },
    });
  };

  return {
    getRootProps,
    isDragActive,
    getInputProps,
    MAX_FILES_QUANTITY,
    removeFile,
  };
};

export default useDropZone;

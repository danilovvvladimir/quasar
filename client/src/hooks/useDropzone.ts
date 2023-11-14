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

  // const [files, setFiles] = useState<FileWithPreview[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: any[]) => {
      if (files.length === MAX_FILES_QUANTITY) {
        return;
      }

      if (acceptedFiles?.length) {
        setFiles((previousFiles) => [
          ...previousFiles,
          ...acceptedFiles.map((file) =>
            Object.assign(file, { preview: URL.createObjectURL(file) }),
          ),
        ]);

        const updatedFiles = [...files, ...acceptedFiles];
        onChange({ target: { name, value: updatedFiles } });
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
    console.log("current files", files);

    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  const removeFile = (name: string) => {
    setFiles((files) => files.filter((file) => file.name !== name));
    onChange({
      target: { name, value: files.filter((item) => item.name !== name) },
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

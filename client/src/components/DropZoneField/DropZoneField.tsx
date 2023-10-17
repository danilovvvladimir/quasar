"use client";

import { FC } from "react";
import { Control, Controller, useFormContext } from "react-hook-form";
import DropZone from "../UI/DropZone/DropZone";

interface DropZoneFieldProps {
  name: string;
  control: any;
}

const DropZoneField: FC<DropZoneFieldProps> = ({ name, control }) => {
  // const { control } = useFormContext();

  return (
    <Controller
      render={({ field: { onChange } }) => (
        <DropZone onChange={(e) => onChange(e.target.files)} />
      )}
      rules={{
        required: { value: true, message: "This field is required" },
      }}
      name={name}
      control={control}
    />
  );
};

export default DropZoneField;

"use client";

import { FC, useState } from "react";
import ReactSelect from "react-select";
import { IOption } from "@/hooks/useHomePageInner";

interface SelectProps {
  options: IOption[];
  selectedOption: IOption;
  setSelectedOption: (newOptions: IOption | null) => void;
}

const Select: FC<SelectProps> = ({
  options,
  selectedOption,
  setSelectedOption,
}) => {
  return (
    <ReactSelect
      instanceId="1"
      components={{ IndicatorSeparator: () => null }}
      isSearchable={false}
      classNamePrefix="custom-select"
      placeholder="Сортировка"
      value={selectedOption}
      onChange={setSelectedOption}
      options={options}
    />
  );
};

export default Select;

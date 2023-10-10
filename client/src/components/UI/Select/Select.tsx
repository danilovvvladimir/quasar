"use client";

import { FC, useState } from "react";
import ReactSelect from "react-select";
import "./Select.scss";

interface SelectProps {
  options: SelectOption[];
}

export interface SelectOption {
  value: string;
  label: string;
}

const Select: FC<SelectProps> = ({ options }) => {
  const [selectedOption, setSelectedOption] = useState<SelectOption | null>(
    null,
  );

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

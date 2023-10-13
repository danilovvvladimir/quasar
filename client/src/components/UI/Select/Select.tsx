"use client";

import { FC, useState } from "react";
import ReactSelect from "react-select";
import "./Select.scss";
import { IOption } from "@/components/HomePageInner/HomePageInner";

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
  // const [selectedOption, setSelectedOption] = useState<IOption | null>(null);

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

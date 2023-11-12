"use client";

import { FC, useState } from "react";
import ReactSelect, { Props as ReactSelectProps } from "react-select";
import { IOption } from "@/hooks/useHomePageInner";

interface SelectProps extends ReactSelectProps {
  options: IOption[];
  selectedOption: IOption;
  setSelectedOption: (newOptions: IOption | null) => void;
}

const Select: FC<SelectProps> = ({
  options,
  selectedOption,
  setSelectedOption,
  ...rest
}) => {
  return (
    <ReactSelect
      {...rest}
      instanceId="1"
      components={{ IndicatorSeparator: () => null }}
      value={selectedOption}
      onChange={setSelectedOption}
      options={options}
    />
  );
};

export default Select;

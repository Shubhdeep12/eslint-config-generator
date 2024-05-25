"use client";

import { Checkbox } from "@mantine/core";
import {
  Children,
  ReactElement,
  cloneElement,
  useEffect,
  useState,
} from "react";

type ItemProps = {
  label: string;
  disabled?: boolean;
  children: ReactElement | ReactElement[];
  defaultInclude?: boolean;
  onChange?: (val: boolean) => void;
};

export default function Item({
  label,
  disabled = false,
  children,
  defaultInclude = false,
  onChange,
}: ItemProps) {
  const [isDisabled, setIsDisabled] = useState<boolean>(!defaultInclude);

  const renderChildren = () => {
    return Children.map(children, (child) => {
      return cloneElement(child, {
        disabled: isDisabled || disabled,
      });
    });
  };

  useEffect(() => {
    if (onChange) onChange(isDisabled || disabled);
  }, [disabled, onChange, isDisabled]);

  return (
    <div className="flex flex-col items-start gap-4">
      <Checkbox
        disabled={disabled}
        checked={!isDisabled}
        onChange={(e) => {
          setIsDisabled((prev) => !prev);
          if (onChange) onChange(!e.target.checked || disabled);
        }}
        size="sm"
        color="rgba(0,0,0,1)"
        label={label}
      />

      {renderChildren()}
    </div>
  );
}

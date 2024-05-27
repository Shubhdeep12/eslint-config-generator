"use client";

import { cn } from "@/utils/cn";
import { Checkbox, MenuLabel } from "@mantine/core";
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
  children?: ReactElement | ReactElement[];
  defaultInclude?: boolean;
  onChange?: (val: boolean) => void;
  className?: string;
  type?: string | React.ElementType;
  labelClassName?: string;
  childrenClassName?: string;
  size?: string;
};

export default function Item({
  label,
  disabled = false,
  children,
  defaultInclude = false,
  onChange,
  className = "",
  type = "h2",
  labelClassName = "font-semibold text-2xl",
  childrenClassName = "",
  size = "md",
}: ItemProps) {
  const [isDisabled, setIsDisabled] = useState<boolean>(!defaultInclude);

  const renderChildren = () => {
    return Children.map(children, (child) => {
      if (child)
        return cloneElement(child, {
          disabled: isDisabled || disabled,
        });
    });
  };

  useEffect(() => {
    if (onChange) onChange(isDisabled || disabled);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disabled]);
  const Label = type;
  return (
    <div
      className={cn(
        className,
        "border border-transparent hover:border-gray-300 transition-all rounded-md p-4 mb-2 gap-4 flex flex-col"
      )}
    >
      <div className="flex gap-2 items-center px-4">
        <Checkbox
          disabled={disabled}
          checked={!isDisabled}
          onChange={(e) => {
            setIsDisabled((prev) => !prev);
            if (onChange) onChange(!e.target.checked || disabled);
          }}
          size={size}
          color="rgba(0,0,0,1)"
        />
        <Label className={cn(labelClassName)}>{label}</Label>
      </div>

      {children ? (
        <div
          className={cn(
            childrenClassName,
            "transition-all p-4 rounded-md",
            `${isDisabled ? "opacity-80 " : "opacity-1"}`
          )}
        >
          {renderChildren()}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

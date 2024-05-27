"use client";

import InfoIcon from "@/assets/Info";
import { cn } from "@/utils/cn";
import { Checkbox, Popover, Text } from "@mantine/core";
import Link from "next/link";
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
  infoLabel?: string;
  infoLink?: string;
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
  infoLabel = "",
  infoLink = "",
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
      <div className="flex items-center px-4">
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
        <Label className={cn(labelClassName, "ml-2")}>{label}</Label>
        {infoLabel && (
          <Popover width={300} position="top" withArrow shadow="md">
            <Popover.Target>
              <div className="ml-1">
                <InfoIcon />
              </div>
            </Popover.Target>
            <Popover.Dropdown>
              <div>
                <Text>{infoLabel}</Text>
                {infoLink && (
                  <Text>
                    <Link
                      className="text-blue-500 !italic"
                      href={infoLink}
                      target="_blank"
                    >
                      Click here
                    </Link>{" "}
                    to learn more.
                  </Text>
                )}
              </div>
            </Popover.Dropdown>
          </Popover>
        )}
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

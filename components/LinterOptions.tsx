"use client";
import { Select } from "@mantine/core";
import Item from "./Item";
import { useData } from "../containers/DataContainer";
import { useEffect, useState } from "react";
import { LinterOptionsTypes } from "../types";

export default function LinterOptions() {
  const { setData } = useData();
  const [linterOptions, setLinterOptions] = useState<LinterOptionsTypes>({
    noInlineConfig: undefined,
    reportUnusedDisableDirectives: undefined,
  });
  useEffect(() => {
    setData((prev) => ({ ...prev, linterOptions }));
  }, [linterOptions]);

  return (
    <Item
      onChange={(disabled) => {
        if (disabled)
          setData((prev) => ({ ...prev, linterOptions: undefined }));
        else setData((prev) => ({ ...prev, linterOptions }));
      }}
      label="Include Linter options"
      childrenClassName="flex w-full gap-4"
    >
      {/* <Item
        onChange={(disabled) => {
          if (disabled)
            setData((prev) => ({
              ...prev,
              linterOptions: {
                ...prev.linterOptions,
                noInlineConfig: undefined,
              },
            }));
          else
            setData((prev) => ({
              ...prev,
              linterOptions: {
                ...prev.linterOptions,
                noInlineConfig: linterOptions.noInlineConfig,
              },
            }));
        }}
        label="noInlineConfig"
      > */}
      <Select
        clearable
        label="noInlineConfig"
        onClear={() =>
          setLinterOptions((prev) => ({
            ...prev,
            noInlineConfig: undefined,
          }))
        }
        value={String(linterOptions?.noInlineConfig)}
        data={["true", "false"]}
        placeholder="Select value"
        onChange={(e) =>
          setLinterOptions((prev) => ({
            ...prev,
            noInlineConfig: Boolean(e),
          }))
        }
      />
      {/* </Item> */}

      {/* <Item
        onChange={(disabled) => {
          if (disabled)
            setData((prev) => ({
              ...prev,
              linterOptions: {
                ...prev.linterOptions,
                reportUnusedDisableDirectives: undefined,
              },
            }));
          else
            setData((prev) => ({
              ...prev,
              linterOptions: {
                ...prev.linterOptions,
                reportUnusedDisableDirectives:
                  linterOptions.reportUnusedDisableDirectives,
              },
            }));
        }}
        label="reportUnusedDisableDirectives"
      > */}
      <Select
        label="reportUnusedDisableDirectives"
        clearable
        onClear={() =>
          setLinterOptions((prev) => ({
            ...prev,
            reportUnusedDisableDirectives: undefined,
          }))
        }
        value={String(linterOptions?.reportUnusedDisableDirectives)}
        data={["true", "false"]}
        placeholder="Select value"
        onChange={(e) =>
          setLinterOptions((prev) => ({
            ...prev,
            reportUnusedDisableDirectives: Boolean(e),
          }))
        }
      />
      {/* </Item> */}
    </Item>
  );
}

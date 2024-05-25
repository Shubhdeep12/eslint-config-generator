"use client";
import { Select } from "@mantine/core";
import Item from "./Item";
import { useData } from "../containers/DataContainer";
import { useState } from "react";
import { LinterOptionsTypes } from "../types";

export default function LinterOptions() {
  const { setData } = useData();
  const [linterOptions, setLinterOptions] = useState<LinterOptionsTypes>({
    noInlineConfig: false,
    reportUnusedDisableDirectives: false,
  });
  return (
    <Item
      onChange={(disabled) => {
        if (disabled)
          setData((prev) => ({ ...prev, linterOptions: undefined }));
        else setData((prev) => ({ ...prev, linterOptions }));
      }}
      label="Include Linter options"
    >
      <Item
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
      >
        <Select
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
      </Item>

      <Item
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
      >
        <Select
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
      </Item>
    </Item>
  );
}

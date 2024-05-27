"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Item from "./Item";
import { CloseButton, Input, Select } from "@mantine/core";
import { useData } from "../containers/DataContainer";
import { DataProps, RulesType } from "../types";
import InfiniteScroll from "./InfiniteScroll";
import getPaginatedData from "@/utils/getPaginatedData";

export default function Rules({ rules }: { rules: string }) {
  const { setData } = useData();
  const [rulesState, setRulesState] = useState<RulesType>({});
  return (
    <Item
      onChange={(disabled) => {
        if (disabled) setData((prev) => ({ ...prev, rules: undefined }));
        else setData((prev) => ({ ...prev, rules: rulesState }));
      }}
      label="Include Rules"
      infoLabel="An object containing the configured rules."
      infoLink="https://eslint.org/docs/latest/use/configure/rules"
    >
      <InfiniteScroll
        limit={12}
        getData={(props) =>
          getPaginatedData({
            ...props,
            data: JSON.parse(rules || "{}"),
          })
        }
        renderRow={(item, itemDisabled) => {
          for (const name in item) {
            return (
              // <Item
              //   disabled={itemDisabled}
              //   defaultInclude={Object.keys(rulesState).includes(name)}
              //   onChange={(isItemDisabled) => {
              //     if (isItemDisabled)
              //       setData((prev) => ({
              //         ...prev,
              //         rules: { ...prev.rules, [name]: undefined },
              //       }));
              //     else
              //       setData((prev) => ({
              //         ...prev,
              //         rules: { ...prev.rules, [name]: rulesState?.[name] },
              //       }));
              //   }}
              //   label={name}
              //   key={name}
              // >
              <Select
                disabled={itemDisabled}
                label={name}
                key={name}
                clearable
                onClear={() => {
                  setRulesState((prev) => ({
                    ...prev,
                    [name]: undefined,
                  }));
                  setData((prev) => ({
                    ...prev,
                    rules: { ...prev.rules, [name]: undefined },
                  }));
                }}
                description={item[name].meta.docs.description}
                value={String(rulesState?.[name])}
                placeholder="Select value"
                data={["off", "warn", "error"]}
                onChange={(e) => {
                  setRulesState((prev) => ({
                    ...prev,
                    [name]: e || undefined,
                  }));
                  setData((prev) => ({
                    ...prev,
                    rules: { ...prev.rules, [name]: e || undefined },
                  }));
                }}
              />
              // </Item>
            );
          }
        }}
      />
    </Item>
  );
}

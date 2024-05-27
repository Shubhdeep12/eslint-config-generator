"use client";
type Props = {};
import { lazy, useState } from "react";
import { useData } from "../containers/DataContainer";
import { Button, Text } from "@mantine/core";
import Chevron from "@/assets/Chevron";
import { cn } from "@/utils/cn";
const LazyReactJson = lazy(() => import("react-json-view"));

function cleanJSON(data: any): any {
  if (Array.isArray(data)) {
    return data
      .map((item) => cleanJSON(item))
      .filter(
        (item) =>
          item !== undefined &&
          item !== null &&
          !(typeof item === "object" && Object.keys(item).length === 0)
      );
  } else if (data && typeof data === "object") {
    return Object.keys(data).reduce((acc, key) => {
      const value = cleanJSON(data[key]);
      if (
        value !== undefined &&
        value !== null &&
        !(typeof value === "object" && Object.keys(value).length === 0) &&
        !(typeof value === "string" && !value)
      ) {
        (acc as any)[key] = value;
      }
      return acc;
    }, {});
  }
  return data;
}

export default function RenderJSON({}: Props) {
  const { data } = useData();
  const { format, ..._data } = data;
  const [treeVisible, setTreeVisible] = useState(false);
  let cleanData = cleanJSON(_data);

  return (
    <div className="flex flex-col gap-4">
      <div className="p-2 w-full justify-between bg-black rounded-md flex items-center">
        <Text className="!font-semibold" c="white" size="lg">{`eslint.config${
          format === "esm" ? ".mjs" : ".cjs"
        }`}</Text>

        <Button
          variant="filled"
          color="dark"
          size="compact-sm"
          onClick={() => setTreeVisible((prev) => !prev)}
        >
          <Text className="!font-semibold">{`${
            treeVisible ? "Hide config" : "Show config"
          }`}</Text>
        </Button>
      </div>
      {treeVisible && (
        <div className="whitespace-pre-wrap font-mono">
          <Text>
            {format === "esm" ? "export default " : "module.exports = "}
          </Text>
          <LazyReactJson
            src={cleanData}
            enableClipboard={false}
            displayDataTypes={false}
            displayObjectSize={false}
            quotesOnKeys={false}
            name={false}
          />
        </div>
      )}
    </div>
  );
}

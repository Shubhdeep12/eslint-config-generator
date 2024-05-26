"use client";
type Props = {};
import { lazy, useState } from "react";
import { useData } from "../containers/DataContainer";
import { Button } from "@mantine/core";
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
  const { data = {} } = useData();
  const [treeVisible, setTreeVisible] = useState(false);
  const cleanData = cleanJSON(data);
  return (
    <div>
      <Button
        variant="gradient"
        onClick={() => setTreeVisible((prev) => !prev)}
      >
        {treeVisible ? "Hide Config" : "Show Config"}
      </Button>
      {treeVisible && <LazyReactJson src={cleanData} />}
    </div>
  );
}

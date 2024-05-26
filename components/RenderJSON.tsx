"use client";
type Props = {};
import ReactJson from "react-json-view";
import { useData } from "../containers/DataContainer";

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

  const cleanData = cleanJSON(data);
  if (typeof window === "undefined") {
    return <p>{JSON.stringify(data || {})}</p>;
  }
  return <ReactJson src={cleanData} />;
}

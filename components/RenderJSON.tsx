"use client";
type Props = {};
import ReactJson from "react-json-view";
import { useData } from "../containers/DataContainer";

export default function RenderJSON({}: Props) {
  const { data = {} } = useData();
  return <ReactJson src={data} />;
}

/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Input } from "@mantine/core";
import { useData } from "../containers/DataContainer";
import Item from "./Item";
import { useEffect, useState } from "react";

export default function Name() {
  const { setData } = useData();
  const [name, setName] = useState<string>("");

  useEffect(() => {
    setData((prev) => ({ ...prev, name }));
  }, [name]);

  return (
    <Item
      onChange={(disabled) => {
        if (disabled) {
          setData((prev) => ({ ...prev, name: undefined }));
        } else setData((prev) => ({ ...prev, name }));
      }}
      defaultInclude
      label="Name"
      className="w-auto"
    >
      <Input
        placeholder="Enter name of project"
        value={name}
        color="black"
        radius="md"
        size="md"
        onChange={(e) => setName(e.target.value)}
      />
    </Item>
  );
}

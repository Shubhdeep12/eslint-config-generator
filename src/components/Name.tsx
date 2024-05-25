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
    >
      <Input
        placeholder="Enter name of project"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </Item>
  );
}

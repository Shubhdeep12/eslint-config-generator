"use client";
import { List, ListItem, MenuLabel, Radio } from "@mantine/core";
import { useData } from "../containers/DataContainer";

type Props = {};

export default function Format({}: Props) {
  const { data, setData } = useData();
  const FORMAT_TYPES = [
    {
      id: "commonjs",
      label: "CommonJS",
    },
    {
      id: "esm",
      label: "ESM",
    },
  ];
  return (
    <div className="px-4">
      <h2 className="font-semibold text-2xl mb-4">Format</h2>
      <List className="flex gap-3">
        {FORMAT_TYPES.map(({ id, label }) => (
          <ListItem key={id}>
            <Radio
              label={label}
              checked={data.format === id}
              onChange={() => setData((prev) => ({ ...prev, format: id }))}
              color="rgba(0, 0, 0, 1)"
              size="md"
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

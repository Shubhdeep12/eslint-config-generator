"use client";
import { Checkbox } from "@mantine/core";
import { useData } from "../containers/DataContainer";

export default function FilesAndIgnores() {
  const { data, setData } = useData();
  return (
    <div>
      <Checkbox
        checked={!!data?.files}
        onChange={(e) =>
          setData((prev) => ({
            ...prev,
            files: !prev.files ? [] : undefined,
          }))
        }
        size="sm"
        color="rgba(0,0,0,1)"
        label={"Include files config"}
      />
      <Checkbox
        checked={!!data?.ignores}
        onChange={(e) =>
          setData((prev) => ({
            ...prev,
            ignores: !prev.ignores ? [] : undefined,
          }))
        }
        size="sm"
        color="rgba(0,0,0,1)"
        label={"Include ignores config"}
      />
    </div>
  );
}

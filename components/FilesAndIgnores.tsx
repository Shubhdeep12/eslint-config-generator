"use client";
import { useData } from "../containers/DataContainer";
import Item from "./Item";

export default function FilesAndIgnores() {
  const { setData } = useData();
  return (
    <>
      <Item
        onChange={(disabled) => {
          setData((prev) => ({
            ...prev,
            files: !disabled ? ["./app/**/*.{js,ts,jsx,tsx,mdx}"] : undefined,
          }));
        }}
        label="Include files config"
        infoLabel="An array of glob patterns indicating the files that the configuration object should apply to."
        infoLink="https://eslint.org/docs/latest/use/configure/configuration-files#specifying-files-and-ignores"
      />

      <Item
        onChange={(disabled) => {
          setData((prev) => ({
            ...prev,
            ignores: !disabled ? ["./node_modules"] : undefined,
          }));
        }}
        label="Include ignores config"
        infoLabel="An array of glob patterns indicating the files that the configuration object should not apply to."
        infoLink="https://eslint.org/docs/latest/use/configure/ignore"
      />

      {/* <Checkbox
        checked={!!data?.files}
        onChange={(e) =>
          setData((prev) => ({
            ...prev,
            files: !prev.files ? [] : undefined,
          }))
        }
        size="md"
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
        size="md"
        color="rgba(0,0,0,1)"
        label={"Include ignores config"}
      /> */}
    </>
  );
}

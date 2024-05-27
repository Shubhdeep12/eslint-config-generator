"use client";
import { useData } from "@/containers/DataContainer";
import Item from "./Item";

export default function Others() {
  const { setData } = useData();
  return (
    <>
      <Item
        onChange={(disabled) => {
          setData((prev) => ({
            ...prev,
            plugins: !disabled ? ["example/plugin"] : undefined,
          }));
        }}
        label="Include plugins config"
        infoLabel="An object containing a name-value mapping of plugin names to plugin objects."
        infoLink="https://eslint.org/docs/latest/use/configure/plugins"
      />

      <Item
        onChange={(disabled) => {
          setData((prev) => ({
            ...prev,
            settings: !disabled ? ["example/settings"] : undefined,
          }));
        }}
        label="Include settings config"
        infoLabel="An object containing name-value pairs of information that should be available to all rules."
      />
    </>
  );
}

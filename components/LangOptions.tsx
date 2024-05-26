/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Input, Select } from "@mantine/core";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Item from "./Item";
import { useData } from "../containers/DataContainer";
import { LangOptionsTypes } from "../types";

function RenderEcmaVersion({
  disabled,
  langOptions,
  setLangOptions,
}: {
  disabled?: boolean;
  langOptions: LangOptionsTypes;
  setLangOptions: Dispatch<SetStateAction<LangOptionsTypes>>;
}) {
  const [customEcmaVersion, setCustomEcmaVersion] = useState<{
    edit?: boolean;
    value?: string;
  }>({
    edit: false,
    value: "",
  });
  return (
    <div className="flex flex-col gap-4">
      <Select
        clearable
        onClear={() =>
          setCustomEcmaVersion({
            edit: false,
            value: undefined,
          })
        }
        size="md"
        disabled={disabled}
        label="ecmaVersion"
        placeholder="Select value"
        value={
          langOptions.ecmaVersion &&
          !["5", "3"].includes(langOptions.ecmaVersion)
            ? "Custom"
            : langOptions.ecmaVersion
        }
        data={["3", "5", "Custom"]}
        onChange={(e) => {
          if (e !== "Custom") {
            setLangOptions((prev) => ({
              ...prev,
              ecmaVersion: e || undefined,
            }));

            setCustomEcmaVersion((prev) => ({ ...prev, edit: false }));
          } else setCustomEcmaVersion((prev) => ({ ...prev, edit: true }));
        }}
      />

      <Input
        size="md"
        placeholder="Enter custom ecmaVersion"
        disabled={disabled || !customEcmaVersion.edit}
        value={customEcmaVersion.value}
        onChange={(e) => {
          setCustomEcmaVersion((prev) => ({ ...prev, value: e.target.value }));
          setLangOptions((prev) => ({ ...prev, ecmaVersion: e.target.value }));
        }}
      />
    </div>
  );
}

function RenderParserOptions({
  disabled,
  langOptions,
  setLangOptions,
}: {
  disabled?: boolean;
  langOptions: LangOptionsTypes;
  setLangOptions: Dispatch<SetStateAction<LangOptionsTypes>>;
}) {
  const [localData, setlocalData] = useState({
    allowReserved: langOptions.allowReserved,
    globalReturn: langOptions.globalReturn,
    impliedStrict: langOptions.impliedStrict,
    jsx: langOptions.jsx,
  });

  useEffect(() => {
    setLangOptions((prev) => ({ ...prev, ...localData }));
  }, [localData]);

  return (
    <div className="flex  gap-5">
      {/* <Item
        disabled={disabled}
        onChange={(itemDisabled) => {
          if (itemDisabled)
            setLangOptions((prev) => ({ ...prev, allowReserved: undefined }));
          else
            setLangOptions((prev) => ({
              ...prev,
              allowReserved: localData.allowReserved,
            }));
        }}
        label="allowReserved"
        type="h4"
        size="sm"
        labelClassName="text-lg"
      > */}
      <Select
        disabled={disabled}
        label="allowReserved"
        clearable
        onClear={() =>
          setlocalData((prev) => ({
            ...prev,
            allowReserved: undefined,
          }))
        }
        placeholder="Select value"
        value={String(localData.allowReserved)}
        data={["true", "false"]}
        onChange={(e) =>
          setlocalData((prev) => ({
            ...prev,
            allowReserved: Boolean(e),
          }))
        }
      />
      {/* </Item> */}

      <Item
        type="h4"
        size="sm"
        labelClassName="text-lg"
        disabled={disabled}
        onChange={(itemDisabled) => {
          if (itemDisabled)
            setLangOptions((prev) => ({
              ...prev,
              globalReturn: undefined,
              impliedStrict: undefined,
              jsx: undefined,
            }));
          else {
            setLangOptions((prev) => ({
              ...prev,
              globalReturn: localData.globalReturn,
              impliedStrict: localData.impliedStrict,
              jsx: localData.jsx,
            }));
          }
        }}
        label="ecmaFeatures"
        childrenClassName="flex flex-col gap-3"
      >
        <Select
          clearable
          onClear={() =>
            setlocalData((prev) => ({
              ...prev,
              globalReturn: undefined,
            }))
          }
          label="globalReturn"
          value={String(localData.globalReturn)}
          data={["true", "false"]}
          placeholder="Select value"
          onChange={(e) =>
            setlocalData((prev) => ({
              ...prev,
              globalReturn: Boolean(e),
            }))
          }
        />

        <Select
          label="impliedStrict"
          value={String(localData.impliedStrict)}
          data={["true", "false"]}
          placeholder="Select value"
          clearable
          onClear={() =>
            setlocalData((prev) => ({
              ...prev,
              impliedStrict: undefined,
            }))
          }
          onChange={(e) =>
            setlocalData((prev) => ({
              ...prev,
              impliedStrict: Boolean(e),
            }))
          }
        />

        <Select
          clearable
          onClear={() =>
            setlocalData((prev) => ({
              ...prev,
              jsx: undefined,
            }))
          }
          label="jsx"
          value={String(localData.jsx)}
          data={["true", "false"]}
          placeholder="Select value"
          onChange={(e) =>
            setlocalData((prev) => ({
              ...prev,
              jsx: Boolean(e),
            }))
          }
        />
      </Item>
    </div>
  );
}

export default function LangOptions() {
  const { setData } = useData();

  const [langOptions, setLangOptions] = useState<LangOptionsTypes>({});

  useEffect(() => {
    setData((prev) => ({ ...prev, langOptions }));
  }, [langOptions]);

  return (
    <Item
      onChange={(disabled) => {
        if (disabled) setData((prev) => ({ ...prev, langOptions: undefined }));
        else setData((prev) => ({ ...prev, langOptions }));
      }}
      label="Include Language options"
      childrenClassName="flex flex-wrap gap-4 justify-between pt-4"
    >
      <Item
        labelClassName="text-xl"
        type="h3"
        onChange={(disabled) => {
          if (disabled)
            setData((prev) => ({
              ...prev,
              langOptions: {
                ...prev.langOptions,
                ecmaVersion: undefined,
              },
            }));
          else
            setData((prev) => ({
              ...prev,
              langOptions: {
                ...prev.langOptions,
                ecmaVersion: langOptions.ecmaVersion,
              },
            }));
        }}
        label="Include ecmaVersion"
      >
        <RenderEcmaVersion
          langOptions={langOptions}
          setLangOptions={setLangOptions}
        />
      </Item>
      <Item
        labelClassName="text-xl"
        type="h3"
        onChange={(disabled) => {
          if (disabled)
            setData((prev) => ({
              ...prev,
              langOptions: {
                ...prev.langOptions,
                sourceType: undefined,
              },
            }));
          else
            setData((prev) => ({
              ...prev,
              langOptions: {
                ...prev.langOptions,
                sourceType: langOptions.sourceType,
              },
            }));
        }}
        label="Include sourceType"
      >
        <Select
          clearable
          onClear={() =>
            setLangOptions((prev) => ({
              ...prev,
              sourceType: undefined,
            }))
          }
          label="sourceType"
          value={langOptions.sourceType}
          placeholder="Select value"
          size="md"
          onChange={(e) =>
            setLangOptions((prev) => ({
              ...prev,
              sourceType: e || undefined,
            }))
          }
          data={["module", "commonjs", "script"]}
        />
      </Item>
      <Item
        labelClassName="text-xl"
        type="h3"
        onChange={(disabled) => {
          if (disabled)
            setData((prev) => ({
              ...prev,
              langOptions: {
                ...prev.langOptions,
                allowReserved: undefined,
                globalReturn: undefined,
                impliedStrict: undefined,
                jsx: undefined,
              },
            }));
          else
            setData((prev) => ({
              ...prev,
              langOptions: {
                ...prev.langOptions,
                allowReserved: langOptions.allowReserved,
                globalReturn: langOptions.globalReturn,
                impliedStrict: langOptions.impliedStrict,
                jsx: langOptions.jsx,
              },
            }));
        }}
        label="Include parserOptions"
      >
        <RenderParserOptions
          langOptions={langOptions}
          setLangOptions={setLangOptions}
        />
      </Item>

      {/* TODO: Goals */}
    </Item>
  );
}

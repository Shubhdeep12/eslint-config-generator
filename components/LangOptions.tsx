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
  const [customEcmaVersion, setCustomEcmaVersion] = useState({
    edit: false,
    value: "",
  });
  return (
    <>
      <Select
        disabled={disabled}
        label="ecmaVersion"
        placeholder="Select value"
        value={
          !langOptions.ecmaVersion ||
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
        placeholder="Enter custom ecmaVersion"
        disabled={disabled || !customEcmaVersion.edit}
        value={customEcmaVersion.value}
        onChange={(e) => {
          setCustomEcmaVersion((prev) => ({ ...prev, value: e.target.value }));
          setLangOptions((prev) => ({ ...prev, ecmaVersion: e.target.value }));
        }}
      />
    </>
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

  return (
    <>
      <Item
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
      >
        <Select
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
      </Item>

      <Item
        disabled={disabled}
        onChange={(itemDisabled) => {
          if (itemDisabled)
            setLangOptions((prev) => ({
              ...prev,
              allowReserved: undefined,
              globalReturn: undefined,
              impliedStrict: undefined,
              jsx: undefined,
            }));
        }}
        label="ecmaFeatures"
      >
        <Item
          onChange={(itemDisabled) => {
            if (itemDisabled)
              setLangOptions((prev) => ({ ...prev, globalReturn: undefined }));
            else
              setLangOptions((prev) => ({
                ...prev,
                globalReturn: localData.globalReturn,
              }));
          }}
          label="globalReturn"
        >
          <Select
            value={String(langOptions.globalReturn)}
            data={["true", "false"]}
            placeholder="Select value"
            onChange={(e) =>
              setLangOptions((prev) => ({
                ...prev,
                globalReturn: Boolean(e),
              }))
            }
          />
        </Item>
        <Item
          onChange={(itemDisabled) => {
            if (itemDisabled)
              setLangOptions((prev) => ({ ...prev, impliedStrict: undefined }));
            else
              setLangOptions((prev) => ({
                ...prev,
                impliedStrict: localData.impliedStrict,
              }));
          }}
          label="impliedStrict"
        >
          <Select
            value={String(langOptions.impliedStrict)}
            data={["true", "false"]}
            placeholder="Select value"
            onChange={(e) =>
              setLangOptions((prev) => ({
                ...prev,
                impliedStrict: Boolean(e),
              }))
            }
          />
        </Item>
        <Item
          onChange={(itemDisabled) => {
            if (itemDisabled)
              setLangOptions((prev) => ({ ...prev, jsx: undefined }));
            else
              setLangOptions((prev) => ({
                ...prev,
                jsx: localData.jsx,
              }));
          }}
          label="jsx"
        >
          <Select
            value={String(langOptions.jsx)}
            data={["true", "false"]}
            placeholder="Select value"
            onChange={(e) =>
              setLangOptions((prev) => ({
                ...prev,
                jsx: Boolean(e),
              }))
            }
          />
        </Item>
      </Item>
    </>
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
    >
      <Item
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
          label="sourceType"
          value={langOptions.sourceType}
          placeholder="Select value"
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

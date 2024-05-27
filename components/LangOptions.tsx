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
    ecmaFeatures: {
      globalReturn: langOptions.ecmaFeatures?.globalReturn,
      impliedStrict: langOptions.ecmaFeatures?.impliedStrict,
      jsx: langOptions.ecmaFeatures?.jsx,
    },
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
              ecmaFeatures: {
                globalReturn: undefined,
                impliedStrict: undefined,
                jsx: undefined,
              },
            }));
          else {
            setLangOptions((prev) => ({
              ...prev,
              ecmaFeatures: {
                globalReturn: localData.ecmaFeatures?.globalReturn,
                impliedStrict: localData.ecmaFeatures?.impliedStrict,
                jsx: localData.ecmaFeatures?.jsx,
              },
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
              ecmaFeatures: {
                ...prev.ecmaFeatures,
                globalReturn: undefined,
              },
            }))
          }
          label="globalReturn"
          value={String(localData.ecmaFeatures?.globalReturn)}
          data={["true", "false"]}
          placeholder="Select value"
          onChange={(e) =>
            setlocalData((prev) => ({
              ...prev,
              ecmaFeatures: {
                ...prev.ecmaFeatures,
                globalReturn: Boolean(e),
              },
            }))
          }
        />

        <Select
          label="impliedStrict"
          value={String(localData.ecmaFeatures?.impliedStrict)}
          data={["true", "false"]}
          placeholder="Select value"
          clearable
          onClear={() =>
            setlocalData((prev) => ({
              ...prev,
              ecmaFeatures: {
                ...prev.ecmaFeatures,
                impliedStrict: undefined,
              },
            }))
          }
          onChange={(e) =>
            setlocalData((prev) => ({
              ...prev,
              ecmaFeatures: {
                ...prev.ecmaFeatures,
                impliedStrict: Boolean(e),
              },
            }))
          }
        />

        <Select
          clearable
          onClear={() =>
            setlocalData((prev) => ({
              ...prev,
              ecmaFeatures: {
                ...prev.ecmaFeatures,
                jsx: undefined,
              },
            }))
          }
          label="jsx"
          value={String(localData.ecmaFeatures?.jsx)}
          data={["true", "false"]}
          placeholder="Select value"
          onChange={(e) =>
            setlocalData((prev) => ({
              ...prev,
              ecmaFeatures: {
                ...prev.ecmaFeatures,
                jsx: Boolean(e),
              },
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
      infoLabel="An object containing settings related to how JavaScript is configured for linting"
      infoLink="https://eslint.org/docs/latest/use/configure/language-options"
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
        infoLabel="Indicates the ECMAScript version of the code being linted, determining both the syntax and the available global variables."
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
        infoLabel="Indicates the mode of the JavaScript file being used."
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
                ecmaFeatures: {
                  globalReturn: undefined,
                  impliedStrict: undefined,
                  jsx: undefined,
                },
              },
            }));
          else
            setData((prev) => ({
              ...prev,
              langOptions: {
                ...prev.langOptions,
                allowReserved: langOptions.allowReserved,
                ecmaFeatures: {
                  globalReturn: langOptions.ecmaFeatures?.globalReturn,
                  impliedStrict: langOptions.ecmaFeatures?.impliedStrict,
                  jsx: langOptions.ecmaFeatures?.jsx,
                },
              },
            }));
        }}
        label="Include parserOptions"
        infoLabel="If you are using the built-in ESLint parser, you can additionally change how ESLint interprets your code by specifying the languageOptions.parserOptions key."
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

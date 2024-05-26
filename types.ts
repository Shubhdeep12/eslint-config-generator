export type LangOptionsTypes = {
  ecmaVersion?: string;
  sourceType?: string;
  includeParserOptions?: boolean;
  allowReserved?: boolean;
  jsx?: boolean;
  impliedStrict?: boolean;
  globalReturn?: boolean;
};

export type RulesType = Record<string, string | number | string[] | undefined>;

export type LinterOptionsTypes = {
  noInlineConfig?: boolean;
  reportUnusedDisableDirectives?: boolean;
};

export type DataProps = {
  name?: string;
  format: string;
  langOptions?: LangOptionsTypes;
  linterOptions?: LinterOptionsTypes;
  files?: string[];
  ignores?: string[];
  rules?: RulesType;
};

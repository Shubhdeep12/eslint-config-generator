# ESLint Config Generator

A tool to quickly generate customized ESLint configuration files.

## Features

- Choose between **CommonJS** or **ESM** format.
- Configure **language options** like `ecmaVersion`, `jsx`, and more.
- Include various settings like `sourceType` and `parserOptions`.
- Customize linter options like `noInlineConfig`, `reportUnusedDisableDirectives`.
- Option to add plugins, rules, and file/ignore configurations.

## How to Use

1. Visit [eslint-config-generator.shubhdeepchhabra.in](https://eslint-config-generator.shubhdeepchhabra.in/).
2. Select your desired options for the configuration file.
3. Once done, click the **Show config** button to view and copy your ESLint configuration.

## Example

```json
{
  "env": {
    "browser": true
  },
  "parserOptions": {
    "ecmaVersion": 2020,
    "sourceType": "module"
  },
  "rules": {
    "semi": ["error", "always"]
  }
}

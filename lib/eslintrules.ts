import eslintBase from "eslint"; // eslint v9
// import { Linter } from "eslint"; // eslint v8

export async function getEslintRules() {
  // const linter = new Linter(); // v8
  const rules = new eslintBase.Linter({ configType: "eslintrc" }).getRules();
  // const rules = linter.getRules(); //v8

  let obj: any = {};

  rules.forEach(function (value, key) {
    obj[key] = value;
  });

  return obj;
}

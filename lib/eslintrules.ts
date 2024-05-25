"use server";
import { Linter } from "eslint";

export async function getEslintRules() {
  const linter = new Linter();
  const rules = linter.getRules();

  let obj: any = {};

  rules.forEach(function (value, key) {
    obj[key] = value;
  });

  return obj;
}

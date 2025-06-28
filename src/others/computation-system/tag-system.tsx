import {
  TagSystem,
  TagSystemLetter,
  TagSystemLetterFrom,
  TagSystemRuleSet,
} from "computation-system";

export const defaultTagSystemCode: string = `
delete-num=2
input = ABB

# Rules
A: BH
B: A
H: !
  `.trim();

export function tagSystemAndInputBuilder(
  code: string
): [TagSystem, [TagSystemLetter[]]] {
  const lines = code.split("\n").map((str) => str.trim());

  const usedLetters = new Map<string, TagSystemLetter>();

  const errorLetters = ["!", "=", ":", "", " "];

  const findLetter = function (str: string) {
    if (errorLetters.includes(str)) {
      throw new Error(`The string "${str}" cannot used as letter.`);
    }

    if (!usedLetters.has(str)) {
      usedLetters.set(str, TagSystemLetterFrom(str)[0]);
    }

    return usedLetters.get(str)!;
  };

  const ruleSetBuilder = TagSystemRuleSet.builder();

  let deleteNum = 2;
  let input: TagSystemLetter[] = [];

  lines.forEach((line) => {
    if (line.startsWith("#")) {
      //do nothing
    } else if (line.includes(":")) {
      const idx = line.search(":");
      const [first, rest] = [
        line.substring(0, idx).trim(),
        line.substring(idx + 1).trim(),
      ];

      if (first.length !== 1)
        throw new Error(
          `Left side's length must be 0. Received ${first} instead.`
        );
      const inp = findLetter(first);

      if (/\ *!\ */.test(rest)) {
        ruleSetBuilder.addStop(inp);
      } else {
        ruleSetBuilder.add(
          inp,
          [...rest].filter((str) => str !== " ").map((str) => findLetter(str))
        );
      }
    } else if (line.includes("=")) {
      const idx = line.search("=");
      const [first, rest] = [
        line.substring(0, idx).trim(),
        line.substring(idx + 1).trim(),
      ];

      switch (first) {
        case "delete-num":
          deleteNum = parseInt(rest, 10);
          if (isNaN(deleteNum)) {
            throw new Error(
              `delete-num's value(${rest}) cannot be parse as integer.`
            );
          }
          break;
        case "input":
          input = [...rest]
            .filter((str) => !errorLetters.includes(str))
            .map((str) => findLetter(str));
          break;
      }
    }
  });

  return [new TagSystem(deleteNum, ruleSetBuilder.build()), [input]];
}

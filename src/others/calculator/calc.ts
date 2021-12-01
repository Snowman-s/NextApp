import { Compiler } from "bnf";
import bnfToken from "src/others/bnf/token";
import { createNodes } from "./evaluation_node";

export default function calcIt(it: String) {
  let compiler = new Compiler();
  compiler.AddLanguage(
    `
    <SYNTAX> ::= <term>

    <two_operator> ::= "+" | "-" | "*" | "/"

    <term> ::= <OWSP> <NUMBER> <OWSP> *(<two_operator> <OWSP> <NUMBER> <OWSP>)
    `.trim(),
    "calcLang"
  );

  compiler.SetRuleEvents({
    term(token: bnfToken, result: { result: number }) {
      const nodes = createNodes(token);

      const stack = [];

      nodes.forEach((n) => {
        n.calc(stack);
      });

      result.result = stack[0];
    },
  });

  let result: { result: number } = { result: 0 };

  compiler.ParseScript(it, result);

  if (isNaN(result.result)) return "?????";

  return result.result;
}

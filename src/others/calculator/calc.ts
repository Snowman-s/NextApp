import { Compiler } from "bnf";
import bnfToken from "src/others/bnf/token";
import { createNode } from "./evaluation_node";

export default function calcIt(it: String) {
  let compiler = new Compiler();
  compiler.AddLanguage(
    `
    <SYNTAX> ::= <term>

    <one_operator> ::= "+" | "-" | "sin" | "cos" | "tan"
    <one_op_term> ::= <one_operator> <exp>

    <two_operator> ::= "+" | "-" | "*" | "/"

    <two_op_term> ::= <exp> 1*(<two_operator> <exp>)

    <term> ::= <OWSP> (<exp> | <one_op_term> | <two_op_term>) <OWSP>

    <bracket_exp> ::= "(" <term> ")"
  
    <exp> ::= <OWSP> ( <NUMBER> | <bracket_exp> ) <OWSP>
    `.trim(),
    "calcLang"
  );

  compiler.SetRuleEvents({
    SYNTAX(token: bnfToken, result: { result: number }) {
      result.result = createNode(token.tokens[0]).calc();
    },
  });

  let result: { result: number } = { result: NaN };

  compiler.ParseScript(it, result);

  if (isNaN(result.result)) return "?????";

  return result.result;
}

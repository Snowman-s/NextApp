import { Compiler } from "bnf";
import bnfToken from "src/others/bnf/token";
import { createNode } from "./evaluation_node";

export default function calcIt(it: String) {
  let compiler = new Compiler();
  compiler.AddLanguage(
    `
    <SYNTAX> ::= <exp>

    <one_operator> ::= "+" | "-" | "sin" | "cos" | "tan"
    <one_op_exp> ::= <one_operator> <term>

    <two_operator> ::= "+" | "-" | "*" | "/"

    <two_op_exp> ::= <term> 1*(<two_operator> <term>)

    <exp> ::= <OWSP> (<term> | <one_op_exp> | <two_op_exp>) <OWSP>

    <bracket_term> ::= "(" <exp> ")"
  
    <term> ::= <OWSP> ( <NUMBER> | <bracket_term> ) <OWSP>
    `.trim(),
    "calcLang"
  );

  compiler.SetRuleEvents({
    SYNTAX(token: bnfToken, result: { result: number }) {
      result.result = createNode(token.tokens[0]).calc();

      console.log(createNode(token.tokens[0]));
    },
  });

  let result: { result: number } = { result: NaN };

  compiler.ParseScript(it, result);

  if (isNaN(result.result)) return "?????";

  return result.result;
}

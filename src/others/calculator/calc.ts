import { Compiler } from "bnf";
import bnfToken from "src/others/bnf/token";

export default function calcIt(it: String) {
  let compiler = new Compiler();
  compiler.AddLanguage(
    `
    <SYNTAX> ::= <evaluation>
    <evaluation> ::= <number> <OWSP> <type> <OWSP> <number>
    <number> ::= <DIGITS>
    <type> ::= "+" | "-" | "/" | "*"
    `,
    "testLang"
  );
  compiler.SetRuleEvents({
    evaluation(
      token: bnfToken,
      dataObject: { num1: number; op: string; num2: number }
    ) {
      dataObject.num1 = parseInt(token.tokens[0].value, 10);
      dataObject.op = token.tokens[2].value;
      dataObject.num2 = parseInt(token.tokens[4].value, 10);
    },
  });

  let dataObject: { num1: number; op: string; num2: number } = {
    num1: 0,
    op: "",
    num2: 0,
  };

  compiler.ParseScript(it, dataObject);

  switch (dataObject.op) {
    case "+":
      return dataObject.num1 + dataObject.num2;

    case "-":
      return dataObject.num1 - dataObject.num2;

    case "*":
      return dataObject.num1 * dataObject.num2;

    case "/":
      return dataObject.num1 / dataObject.num2;

    default:
      return "?????";
  }
}

import bnfToken from "../bnf/token";
import two_op_node from "./two_op_node";

export function createNode(token: bnfToken): evaluation_node {
  switch (token.name) {
    case "one_op_exp":
      return one_op_node.create(token);
    case "two_op_exp":
      return two_op_node.create(token);
    case "NUMBER":
      return number_node.create(token);
    case "exp":
      return createNode(token.tokens[1]);
    case "bracket_term":
      return createNode(token.tokens[1]);
    case "term":
      return createNode(token.tokens[1]);
    default:
      return nop_node.create(token);
  }
}

export interface evaluation_node {
  calc(): number;
}

class nop_node implements evaluation_node {
  calc() {
    //nop
    return NaN;
  }

  static create(token: bnfToken) {
    return new nop_node();
  }
}

class number_node implements evaluation_node {
  num: number;

  calc() {
    return this.num;
  }

  static create(token: bnfToken) {
    var node = new number_node();

    node.num = parseFloat(token.value);

    return node;
  }
}

class one_op_node implements evaluation_node {
  op: string;
  term: evaluation_node;

  calc() {
    const termResult = this.term.calc();

    switch (this.op) {
      case "+":
        return termResult;
      case "-":
        return -termResult;
      case "sin":
        return Math.sin(termResult);
      case "cos":
        return Math.cos(termResult);
      case "tan":
        return Math.tan(termResult);
      default:
        return NaN;
    }
  }

  static create(token: bnfToken) {
    var node = new one_op_node();

    node.op = token.tokens[0].value;
    node.term = createNode(token.tokens[1]);

    return node;
  }
}

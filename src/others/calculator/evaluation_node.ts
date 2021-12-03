import bnfToken from "../bnf/token";
import two_op_node from "./two_op_node";

export function createNode(token: bnfToken): evaluation_node {
  switch (token.name) {
    case "two_op_term":
      return two_op_node.create(token);
    case "NUMBER":
      return number_node.create(token);
    case "term":
      return createNode(token.tokens[1]);
    case "bracket_exp":
      return createNode(token.tokens[1]);
    case "exp":
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

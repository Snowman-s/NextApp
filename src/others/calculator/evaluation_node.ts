import bnfToken from "../bnf/token";
import two_op_node from "./two_op_node";

export function createNode(token: bnfToken): evaluation_node {
  switch (token.name) {
    case "one_op_exp":
      return one_op_node.create(token);
    case "two_op_exp":
      return two_op_node.create(token);
    case "string_constants":
      return string_constants_node.create(token);
    case "NUMBER":
      return number_node.create(token);
    case "signed_constants":
      return signed_constants_node.create(token);
    case "unsigned_constants":
      return createNode(token.tokens[0]);
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

class string_constants_node implements evaluation_node {
  constants: number;

  calc() {
    return this.constants;
  }

  static create(token: bnfToken) {
    var node = new string_constants_node();

    switch (token.value) {
      case "PI":
        node.constants = Math.PI;
        break;
      case "E":
        node.constants = Math.E;
        break;
      default:
        node.constants = NaN;
        break;
    }

    return node;
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

class signed_constants_node implements evaluation_node {
  op: string;
  unsigned_constants: evaluation_node;

  calc() {
    const constantsResult = this.unsigned_constants.calc();

    switch (this.op) {
      case "+":
        return constantsResult;
      case "-":
        return -constantsResult;
      default:
        return NaN;
    }
  }

  static create(token: bnfToken) {
    var node = new signed_constants_node();

    if (token.tokens.length == 1) {
      node.op = "+";
      node.unsigned_constants = createNode(token.tokens[0]);
    } else {
      node.op = token.tokens[0].value;
      node.unsigned_constants = createNode(token.tokens[1]);
    }

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

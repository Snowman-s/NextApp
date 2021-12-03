import { createNode, evaluation_node } from "./evaluation_node";
import bnfToken from "../bnf/token";

export default class two_op_node implements evaluation_node {
  elements: two_op_element[];
  calc() {
    const stack = [];
    this.elements.forEach((element) => {
      element.do(stack);
    });

    return stack.length == 0 ? NaN : stack[0];
  }

  static create(token: bnfToken) {
    var node = new two_op_node();

    let out: two_op_element[] = [];
    const stack: operator_element[] = [];

    token.tokens.forEach((child) => {
      switch (child.name) {
        case "exp":
          out.push(two_op_exp_element.create(child));
          break;
        case "two_operator":
          const theNode = operator_element.create(child);
          while (
            stack.length > 0 &&
            stack[0].priority() >= theNode.priority()
          ) {
            out.push(stack.pop());
          }
          stack.push(theNode);
        default:
          break;
      }
    });

    out = out.concat(stack.reverse());

    node.elements = out;

    return node;
  }
}

interface two_op_element {
  do(stack: Array<number>): void;
}

class two_op_exp_element implements two_op_element {
  exp: evaluation_node;

  do(stack: Array<number>) {
    stack.push(this.exp.calc());
  }

  static create(token: bnfToken) {
    var node = new two_op_exp_element();

    node.exp = createNode(token);

    return node;
  }
}

class operator_element implements two_op_element {
  op: string;

  do(stack: Array<number>) {
    const num1 = stack.pop();
    const num2 = stack.pop();

    switch (this.op) {
      case "+":
        stack.push(num2 + num1);
        break;
      case "-":
        stack.push(num2 - num1);
        break;
      case "*":
        stack.push(num2 * num1);
        break;
      case "/":
        stack.push(num2 / num1);
        break;
      default:
        stack.push(NaN);
        break;
    }
  }

  priority() {
    switch (this.op) {
      case "+":
      case "-":
        return 1;
      case "*":
      case "/":
        return 2;
      default:
        return 0;
    }
  }

  static create(token: bnfToken) {
    var node = new operator_element();

    node.op = token.value;

    return node;
  }
}

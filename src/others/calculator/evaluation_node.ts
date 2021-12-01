import internal from "stream";
import bnfToken from "../bnf/token";

export function createNodes(token: bnfToken): Array<evaluation_node> {
  let out: evaluation_node[] = [];
  const stack: evaluation_node[] = [];

  token.tokens.forEach((child) => {
    switch (child.name) {
      case "two_operator":
        console.log(stack);
        const theNode = two_op_node.create(child);
        while (stack.length > 0 && stack[0].priority() >= theNode.priority()) {
          out.push(stack.pop());
        }
        stack.push(theNode);
        break;
      case "NUMBER":
        out.push(number_node.create(child));
        break;
      default:
        break;
    }
  });

  out = out.concat(stack.reverse());

  return out;
}

export interface evaluation_node {
  calc(stack: Array<number>): void;

  priority(): number;
}

class nop_node implements evaluation_node {
  calc(_stack: Array<number>) {
    //nop
  }

  static create(token: bnfToken) {
    return new nop_node();
  }

  priority() {
    return 0;
  }
}

class number_node implements evaluation_node {
  num: number;

  calc(stack: Array<number>) {
    stack.push(this.num);
  }

  static create(token: bnfToken) {
    var node = new number_node();

    node.num = parseFloat(token.value);

    return node;
  }

  priority() {
    return 0;
  }
}

class two_op_node implements evaluation_node {
  op: string;
  calc(stack: Array<number>) {
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

  static create(token: bnfToken) {
    var node = new two_op_node();

    node.op = token.value;

    return node;
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
}

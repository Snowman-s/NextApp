import { NonErrorResult } from "./Parser";

export default class WhitespaceExecutor {
  exec(result: NonErrorResult, out: (out: string) => void) {
    const commands = result.commands;
    const labels = result.labels;
    let cmdPtr = 0;
    let stack: number[] = [];
    const pushStack = (data: number) => {
      checkNum(data);
      stack.push(data);
    };
    const popStack = () => {
      if (stack.length == 0) throw new Error("Attempt to pop from empty stack");
      return stack.pop();
    };
    const getStackElm = (index: number) => {
      if (stack.length <= index)
        throw new Error(`Index ${index} element is not exsist on stack`);
      return stack[index];
    };
    const removeStackElm = (index: number) => {
      if (stack.length <= index)
        throw new Error(`Index ${index} element is not exsist on stack`);
      return stack.splice(index, 1);
    };
    let heap: Map<number, number> = new Map();
    const checkNum = (data: number) => {
      if (!Number.isSafeInteger(data)) throw new Error("Integer overflowed");
    };
    const readHeap = (heapPtr: number) => {
      checkNum(heapPtr);
      return heap.has(heapPtr) ? heap[heapPtr] : 0;
    };
    const writeHeap = (heapPtr: number, data: number) => {
      return heap.set(heapPtr, data);
    };
    let returnAddress = [];
    const pushReturnAddress = (commandIndex: number) => {
      returnAddress.push(commandIndex);
    };
    const popReturnAddress = () => {
      if (returnAddress.length == 0)
        throw new Error("Attempt to end a subroutine in non-subrotine");
      return returnAddress.pop();
    };
    try {
      while (commands.length > cmdPtr) {
        let cmd = commands[cmdPtr];
        console.log(cmd.command);
        switch (cmd.command) {
          case "Push":
            pushStack(cmd.param);
            cmdPtr++;
            break;
          case "Dup":
            const num = popStack();
            pushStack(num);
            pushStack(num);
            cmdPtr++;
            break;
          case "Copy":
            pushStack(getStackElm(cmd.param));
            cmdPtr++;
            break;
          case "Swap":
            {
              const a = popStack();
              const b = popStack();
              pushStack(a);
              pushStack(b);
            }
            cmdPtr++;
            break;
          case "Discard":
            popStack();
            cmdPtr++;
            break;
          case "Slide":
            removeStackElm(cmd.param);
            cmdPtr++;
            break;
          case "Add":
            {
              const a = popStack();
              const b = popStack();
              pushStack(a + b);
            }
            cmdPtr++;
            break;
          case "Subtract":
            {
              const a = popStack();
              const b = popStack();
              pushStack(b - a);
            }
            cmdPtr++;
            break;
          case "Multiply":
            {
              const a = popStack();
              const b = popStack();
              pushStack(a * b);
            }
            cmdPtr++;
            break;
          case "Divide":
            {
              const a = popStack();
              const b = popStack();
              pushStack(Math.trunc(b / a));
            }
            cmdPtr++;
            break;
          case "Modulo":
            {
              const a = popStack();
              const b = popStack();
              pushStack(b % a);
            }
            cmdPtr++;
            break;
          case "Store":
            {
              const data = popStack();
              const ptr = popStack();

              writeHeap(ptr, data);
            }
            cmdPtr++;
            break;
          case "Retrieve":
            {
              const ptr = popStack();

              pushStack(readHeap(ptr));
            }
            cmdPtr++;
            break;
          case "Label":
            //do nothing
            cmdPtr++;
            break;
          case "Call":
            {
              pushReturnAddress(cmdPtr + 1);
              const targetLabel = cmd.param;
              const tmp = labels.find(
                (label) => label.label == targetLabel
              ).commandIndex;
              if (tmp == undefined)
                throw new Error(`Cannot find label ${targetLabel}`);
              cmdPtr = tmp;
            }
            break;
          case "Jump":
            {
              const targetLabel = cmd.param;
              const tmp = labels.find(
                (label) => label.label == targetLabel
              ).commandIndex;
              if (tmp == undefined)
                throw new Error(`Cannot find label ${targetLabel}`);
              cmdPtr = tmp;
            }
            break;
          case "JumpIfZero":
            {
              const stackElm = popStack();
              if (stackElm == 0) {
                const targetLabel = cmd.param;
                const tmp = labels.find(
                  (label) => label.label == targetLabel
                ).commandIndex;
                if (tmp == undefined)
                  throw new Error(`Cannot find label ${targetLabel}`);
                cmdPtr = tmp;
              } else {
                cmdPtr++;
              }
            }
            break;
          case "JumpIfNegative":
            {
              const stackElm = popStack();
              if (stackElm < 0) {
                const targetLabel = cmd.param;
                const tmp = labels.find(
                  (label) => label.label == targetLabel
                ).commandIndex;
                if (tmp == undefined)
                  throw new Error(`Cannot find label ${targetLabel}`);
                cmdPtr = tmp;
              } else {
                cmdPtr++;
              }
            }
            break;
          case "Return":
            cmdPtr = popReturnAddress();
            break;
          case "End": {
            //End exec
            return;
          }
          case "OutputCharacter": {
            out(String.fromCodePoint(popStack()));
            cmdPtr++;
            break;
          }
          case "OutputNumber": {
            out(popStack().toString());
            cmdPtr++;
            break;
          }
          case "ReadCharacter":
          case "ReadNumber":
            {
              //doNoting...
              cmdPtr++;
            }
            break;
          default:
            let c: never = cmd;
            break;
        }
      }
    } catch (e) {
      if (e instanceof Error) {
        out(`Error at index${cmdPtr} command: ${e.message}`);
      }
    }
  }
}

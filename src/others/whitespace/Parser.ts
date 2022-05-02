export type WhitespaceLexicalOutput = {
  error: boolean;
  where: string;
};
type TranscriptedToken = "ws" | "tab" | "lf";
export type AnalysisCommandResult<C extends Commands> =
  C extends ParamNumberCommand
    ? {
        command: C;
        param: number;
      }
    : C extends ParamLabelCommand
    ? {
        command: C;
        param: string;
      }
    : {
        command: C;
      };
export type AnalysisResult = NonErrorResult | ParseError[] | SyntaxErrors;
export type NonErrorResult = {
  commands: AnalysisCommandResult<Commands>[];
  labels: { commandIndex: number; label: string }[];
};
export type ParseError = { msg: string; tokenIndex: number };
export type SyntaxError = { msg: string; commandIndex: number };
export type SyntaxErrors = {
  error: SyntaxError[];
  out: AnalysisCommandResult<Commands>[];
};
type ErrorOr<T> = ErrorMessage | T;

const Commands = {
  Push: "Push",
  Dup: "Dup",
  Copy: "Copy",
  Swap: "Swap",
  Discard: "Discard",
  Slide: "Slide",
  Add: "Add",
  Subtract: "Subtract",
  Multiply: "Multiply",
  Divide: "Divide",
  Modulo: "Modulo",
  Store: "Store",
  Retrieve: "Retrieve",
  Label: "Label",
  Call: "Call",
  Jump: "Jump",
  JumpIfZero: "JumpIfZero",
  JumpIfNegative: "JumpIfNegative",
  Return: "Return",
  End: "End",
  OutputCharacter: "OutputCharacter",
  OutputNumber: "OutputNumber",
  ReadCharacter: "ReadCharacter",
  ReadNumber: "ReadNumber",
} as const;
type Commands = typeof Commands[keyof typeof Commands];
const ParamNumberCommand = [
  Commands.Push,
  Commands.Copy,
  Commands.Slide,
] as const;
function isParamNumberCommand(c: Commands): c is ParamNumberCommand {
  return ParamNumberCommand.find((cmd) => cmd == c) != undefined;
}
type ParamNumberCommand = typeof ParamNumberCommand[number];
const ParamLabelCommand = [
  Commands.Label,
  Commands.Call,
  Commands.Jump,
  Commands.JumpIfNegative,
  Commands.JumpIfZero,
] as const;
function isParamLabelCommand(c: Commands): c is ParamLabelCommand {
  return ParamLabelCommand.find((cmd) => cmd == c) != undefined;
}
type ParamLabelCommand = typeof ParamLabelCommand[number];

export class WhitespaceParser {
  parse(
    code: string,
    ws: string,
    tab: string,
    lf: string,
    ignoreUnknownToken = false
  ): AnalysisResult {
    let lexicalOutput: WhitespaceLexicalOutput[] = this.lexical(
      code,
      [ws, tab, lf],
      ignoreUnknownToken
    );

    if (!ignoreUnknownToken) {
      /*トークンに当てはまらない文字列があるか？
          エラーにindexが必要な為、敢えてmapを先に用いる。
        */
      const errors: ParseError[] = lexicalOutput
        .map((token, index) => {
          return {
            error: {
              msg: `"${token.where}" is invalid token`,
              tokenIndex: index,
            },
            token: token,
          };
        })
        .filter((info) => info.token.error)
        .map((info) => info.error);
      if (errors.length > 0) return errors;
    }

    //エラーが無いので安全にws, tab, lfにコンバートできる
    const rawTokens = lexicalOutput.map((tmp) => tmp.where);
    let tokens = this.transcript(rawTokens, ws, tab, lf);

    //で、改めて構文解析
    let syntacticOutput = this.syntactic(tokens);
    return syntacticOutput;
  }

  private lexical(code: string, tokens: string[], ignoreUnknownToken = false) {
    let output: WhitespaceLexicalOutput[] = [];
    let cBuffer = "";
    let errorBuffer = "";

    let pushOutput = (value: WhitespaceLexicalOutput) => {
      if (ignoreUnknownToken && value.error) return;
      output.push(value);
    };

    loop: for (let character of code) {
      if (character.match(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g)) {
        errorBuffer += cBuffer;
        if (errorBuffer != "") pushOutput({ error: true, where: errorBuffer });
        errorBuffer = cBuffer = "";
        continue;
      }
      let beforeBuffer = cBuffer;
      cBuffer += character;

      for (let token of tokens) {
        if (token == cBuffer) {
          //トークンが一致
          if (errorBuffer != "")
            pushOutput({ error: true, where: errorBuffer });
          errorBuffer = "";
          pushOutput({ error: false, where: cBuffer });
          cBuffer = "";
          continue loop;
        } else if (cBuffer == token.slice(0, cBuffer.length)) {
          //まだ対応するトークンがありそう
          continue loop;
        }
      }

      for (let token of tokens) {
        if (token[0] == character) {
          //今までのは一致しないが、最後の文字がトークンに入る可能性がある
          errorBuffer += beforeBuffer;
          cBuffer = character;
          continue loop;
        }
      }

      //既に一致するトークンが存在しないし、最後の文字も捨ててよい
      errorBuffer += cBuffer;
      cBuffer = "";
    }

    errorBuffer += cBuffer;

    if (errorBuffer != "") pushOutput({ error: true, where: errorBuffer });

    return output;
  }

  private transcript(
    rawTokens: string[],
    ws: string,
    tab: string,
    lf: string
  ): TranscriptedToken[] {
    const tokens = rawTokens.map((token) => {
      switch (token) {
        case ws:
          return "ws";
        case tab:
          return "tab";
        case lf:
          return "lf";
        default:
          //この中で使用する限り起こりえない
          throw new Error();
      }
    });

    return tokens;
  }

  private syntactic(
    tokens: TranscriptedToken[]
  ): AnalysisResult | SyntaxErrors {
    let read = () => {
      const tmp = tokens.shift();
      if (tmp == undefined) throw new UnexpectedEOFError();
      return tmp;
    };
    let output: AnalysisCommandResult<Commands>[] = [];
    let labels: { label: string; commandIndex: number }[] = [];
    let errorOutput: SyntaxError[] = [];
    try {
      while (tokens.length > 0) {
        const imp = this.findIMP(read);
        let command: AnalysisCommandResult<Commands> | ErrorMessage;
        switch (imp) {
          case "Stack":
            command = this.findStackCommand(read);
            break;
          case "Arith":
            command = this.findArithCommand(read);
            break;
          case "Flow":
            command = this.findFlowCommand(read);
            break;
          case "Heap":
            command = this.findHeapCommand(read);
            break;
          case "IO":
            command = this.findIOCommand(read);
            break;
          default:
            const _n: never = imp;
            break;
        }
        if ("msg" in command) {
          output.push(undefined);
          errorOutput.push(
            Object.assign(command, { commandIndex: output.length - 1 })
          );
        } else {
          output.push(command);
          if (command.command == "Label") {
            labels.push({
              label: command.param,
              commandIndex: output.length - 1,
            });
          }
        }
      }
    } catch (e) {
      if (e instanceof UnexpectedEOFError) {
        return {
          error: [{ msg: "Unexpected EOF", commandIndex: output.length }],
          out: output,
        };
      }
    }

    //同じラベルをつけない
    {
      let tmp = [];
      labels.forEach((l) => {
        if (tmp.indexOf(l.label) != -1) {
          errorOutput.push({
            msg: `Label "${l.label}" is already exsist.`,
            commandIndex: l.commandIndex,
          });
        } else {
          tmp.push(l.label);
        }
      });
    }

    //ラベルがあるかチェック
    {
      output.forEach((o, index) => {
        if (o == undefined) return;
        const hasLabel = function (
          o: AnalysisCommandResult<Commands>
        ): o is AnalysisCommandResult<ParamLabelCommand> {
          return isParamLabelCommand(o.command);
        };
        if (hasLabel(o)) {
          if (labels.map((l) => l.label).findIndex((l) => l == o.param) == -1) {
            errorOutput.push({
              msg: `Label "${o.param}" is not defined`,
              commandIndex: index,
            });
          }
        }
      });
    }

    if (errorOutput.length > 0) {
      return {
        error: errorOutput.sort((a, b) => a.commandIndex - b.commandIndex),
        out: output,
      };
    }
    return { commands: output, labels: labels };
  }

  private findIMP(sup: () => TranscriptedToken) {
    let first = sup();

    if (first == "ws") {
      return "Stack";
    } else if (first == "tab") {
      let second = sup();
      if (second == "ws") {
        return "Arith";
      } else if (second == "tab") {
        return "Heap";
      } else {
        return "IO";
      }
    } else {
      return "Flow";
    }
  }

  private findStackCommand(
    sup: () => TranscriptedToken
  ): ErrorOr<AnalysisCommandResult<Commands>> {
    return this.findCommandAndParam(sup, [
      { t: ["ws"], cmd: Commands.Push },
      { t: ["lf", "ws"], cmd: Commands.Dup },
      { t: ["tab", "ws"], cmd: Commands.Copy },
      { t: ["lf", "tab"], cmd: Commands.Swap },
      { t: ["lf", "lf"], cmd: Commands.Discard },
      { t: ["tab", "lf"], cmd: Commands.Slide },
    ]);
  }

  private findArithCommand(
    sup: () => TranscriptedToken
  ): ErrorOr<AnalysisCommandResult<Commands>> {
    return this.findCommandAndParam(sup, [
      { t: ["ws", "ws"], cmd: Commands.Add },
      { t: ["ws", "tab"], cmd: Commands.Subtract },
      { t: ["ws", "lf"], cmd: Commands.Multiply },
      { t: ["tab", "ws"], cmd: Commands.Divide },
      { t: ["tab", "tab"], cmd: Commands.Modulo },
    ]);
  }

  private findHeapCommand(
    sup: () => TranscriptedToken
  ): ErrorOr<AnalysisCommandResult<Commands>> {
    return this.findCommandAndParam(sup, [
      { t: ["ws"], cmd: Commands.Store },
      { t: ["tab"], cmd: Commands.Retrieve },
    ]);
  }

  private findFlowCommand(
    sup: () => TranscriptedToken
  ): ErrorOr<AnalysisCommandResult<Commands>> {
    const cmdAndParam = this.findCommandAndParam(sup, [
      { t: ["ws", "ws"], cmd: Commands.Label },
      { t: ["ws", "tab"], cmd: Commands.Call },
      { t: ["ws", "lf"], cmd: Commands.Jump },
      { t: ["tab", "ws"], cmd: Commands.JumpIfZero },
      { t: ["tab", "tab"], cmd: Commands.JumpIfNegative },
      { t: ["tab", "lf"], cmd: Commands.Return },
      { t: ["lf", "lf"], cmd: Commands.End },
    ]);

    return cmdAndParam;
  }

  private findIOCommand(
    sup: () => TranscriptedToken
  ): ErrorOr<AnalysisCommandResult<Commands>> {
    return this.findCommandAndParam(sup, [
      { t: ["ws", "ws"], cmd: Commands.OutputCharacter },
      { t: ["ws", "tab"], cmd: Commands.OutputNumber },
      { t: ["tab", "ws"], cmd: Commands.ReadCharacter },
      { t: ["tab", "tab"], cmd: Commands.ReadNumber },
    ]);
  }

  private findCommandAndParam(
    sup: () => TranscriptedToken,
    map: { t: TranscriptedToken[]; cmd: Commands }[]
  ): ErrorOr<AnalysisCommandResult<Commands>> {
    const cmd = this.findCommand(sup, map);
    if (cmd instanceof ErrorMessage) return cmd;
    if (isParamNumberCommand(cmd)) {
      const param = this.findNumber(sup);
      if (param instanceof ErrorMessage) return param;
      return { command: cmd, param: param };
    } else if (isParamLabelCommand(cmd)) {
      const param = this.findLabel(sup);
      if (param instanceof ErrorMessage) return param;
      return { command: cmd, param: param };
    } else {
      return { command: cmd };
    }
  }

  private findCommand<T extends Commands>(
    sup: () => TranscriptedToken,
    map: { t: TranscriptedToken[]; cmd: T }[]
  ): ErrorOr<Commands> {
    let readTokens = [];
    readTokens.push(sup());

    //より読んでいったら存在するかもしれない
    let maybeMatchFunc = () =>
      map.find((tuple) => {
        let token = tuple.t;
        return readTokens.find((t, index) => token[index] != t) == undefined;
      });
    let maybeMatch = maybeMatchFunc();

    //もう完全に一致したコマンドが存在する
    let completelyMatchFunc = () =>
      map.find((tuple) => {
        let token = tuple.t;
        return (
          token.length == readTokens.length &&
          token.find((token, index) => readTokens[index] != token) == undefined
        );
      });

    let completelyMatch = completelyMatchFunc();

    while (completelyMatch == undefined && maybeMatch != undefined) {
      readTokens.push(sup());

      maybeMatch = maybeMatchFunc();
      completelyMatch = completelyMatchFunc();
    }

    if (completelyMatch == undefined) {
      return error("There are no commands match to this pattern.");
    }

    return completelyMatch.cmd;
  }

  private findNumber(sup: () => TranscriptedToken): ErrorOr<number> {
    let out = sup();
    if (out == "lf") {
      return error("Unexpected end of number");
    }
    let sign = out == "ws" ? +1 : -1;

    out = sup();
    if (out == "lf") {
      return error("Unexpected end of number");
    }

    let bits: Array<number> = [];
    bits.push(out == "ws" ? 0 : 1);

    while ((out = sup()) != "lf") {
      bits.push(out == "ws" ? 0 : 1);
    }

    return (
      sign *
      bits
        .map((bit, index) => {
          return bit << (bits.length - 1 - index);
        })
        .reduce((a, b) => a + b)
    );
  }

  private findLabel(sup: () => TranscriptedToken): ErrorOr<string> {
    let out = sup();
    let label = "";
    if (out == "lf") {
      return error("Unexpected end of label");
    }

    label += out == "ws" ? "W" : out == "tab" ? "T" : "L";

    while ((out = sup()) != "lf") {
      label += out == "ws" ? "W" : out == "tab" ? "T" : "L";
    }

    return label;
  }
}

class UnexpectedEOFError extends Error {
  constructor() {
    super();
  }
}

class ErrorMessage {
  msg: string;
  constructor(msg: string) {
    this.msg = msg;
  }
}

function error(msg: string): ErrorMessage {
  return new ErrorMessage(msg);
}

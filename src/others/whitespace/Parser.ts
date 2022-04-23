export type WhitespaceParseOutput = { error: boolean; where: string };

export class WhitespaceParser {
  parse(code: string, tokens: string[]) {
    let output: WhitespaceParseOutput[] = [];
    let cBuffer = "";
    let errorBuffer = "";

    loop: for (let character of code) {
      if (character.match(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g)) continue;
      let beforeBuffer = cBuffer;
      cBuffer += character;

      for (let token of tokens) {
        if (token == cBuffer) {
          //トークンが一致
          if (errorBuffer != "")
            output.push({ error: true, where: errorBuffer });
          errorBuffer = "";
          output.push({ error: false, where: cBuffer });
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

    if (errorBuffer != "") output.push({ error: true, where: errorBuffer });

    return output;
  }
}

import Head from "next/head";
import { Paper, IconButton, Grid } from "@material-ui/core";
import React from "react";

import Editor from "react-simple-code-editor";

import Prism from "prismjs";
import PlayCircleIcon from "@material-ui/icons/PlayCircleFilled";
import {
  AnalysisResult,
  ParseError,
  SyntaxErrors,
  WhitespaceParser,
} from "src/others/whitespace/Parser";
import WhitespaceExecutor from "src/others/whitespace/Executor";

export default function Home() {
  const [code, setCode] = React.useState(
    "カラデシュ!\nすごい!\n本当にすごいんだ!"
  );

  const [parsed, setParsed] = React.useState<AnalysisResult>();
  const [parsedResultStr, setParsedResultStr] = React.useState<string>();
  const [execResultStr, setExecResultStr] = React.useState<string>();

  const highlightCss = `
      .token.ws {
        color: cornflowerblue;
      }
      .token.tab {
        color: #DD4A68;
      }
      .token.lf {
        color: coral;
      }
    `;

  Prism.languages["whitespace"] = {
    ws: /すごい\!/,
    tab: /カラデシュ\!/,
    lf: /本当にすごいんだ\!/,
  };

  const onParse = () => {
    let parser = new WhitespaceParser();
    const result = parser.parse(
      code,
      "すごい!",
      "カラデシュ!",
      "本当にすごいんだ!",
      true
    );

    setParsed(result);

    if (result == undefined) setParsedResultStr("");
    else setParsedResultStr(parseResultAsString(result));
  };

  const onExec = () => {
    if (parsed == undefined || Array.isArray(parsed) || "error" in parsed) {
      setExecResultStr("");
      return;
    }
    let executor = new WhitespaceExecutor();
    let output = "";
    executor.exec(parsed, (str) => (output += str));

    setExecResultStr(output);
  };

  return (
    <div>
      <Head>
        <title>わいと すぺーす えぐぜきゅーたー</title>
        <meta name="description" content="WhiteSpaceすごい!本当にすごいんだ!" />
        <link
          rel="icon"
          href={process.env.NEXT_PUBLIC_ASSET_PREFIX + "/favicon.ico"}
        />
        <style>{highlightCss}</style>
      </Head>
      <Grid container>
        <Grid item>
          <Paper>
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) =>
                Prism.highlight(code, Prism.languages.whitespace, "whitespace")
              }
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 12,
                fontWeight: "bold",
              }}
            />
          </Paper>
        </Grid>
        <Grid item>
          <IconButton onClick={onParse}>
            <PlayCircleIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <Paper style={{ whiteSpace: "pre" }}>{parsedResultStr}</Paper>
        </Grid>
        <Grid item>
          <IconButton onClick={onExec}>
            <PlayCircleIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <Paper style={{ whiteSpace: "pre" }}>{execResultStr}</Paper>
        </Grid>
      </Grid>
    </div>
  );
}

function parseResultAsString(
  result: AnalysisResult | ParseError[] | SyntaxErrors
): string {
  if ("commands" in result) {
    let str = result.commands
      .map((cmd) => {
        return `  ${cmd.command} ${
          "param" in cmd ? cmd.param.toString() : ""
        }\n`;
      })
      .reduce((a, b) => a + b, "");

    return str;
  } else if ("error" in result) {
    let str = result.error
      .map((r: { msg: string; tokenIndex?: number; commandIndex?: number }) => {
        return `Syntax Error: ${r.msg} Command Index=${r.commandIndex}\n`;
      })
      .reduce((a, b) => a + b, "");

    if (result.out.length > 0) {
      str += "\n・Commands to refer\n";
      str += result.out
        .map((cmd, index) => {
          return (
            index.toString() +
            ": " +
            (cmd == undefined
              ? "???\n"
              : `${cmd.command} ${
                  "param" in cmd ? cmd.param.toString() : ""
                }\n`)
          );
        })
        .reduce((a, b) => a + b, "");
    }

    return str;
  } else {
    return result
      .map((r) => {
        return `Syntax Error:${r.msg} Token Index=${r.tokenIndex}\n`;
      })
      .reduce((a, b) => a + b, "");
  }
}
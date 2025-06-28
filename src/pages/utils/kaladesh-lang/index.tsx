import Head from "next/head";
import React from "react";

import Editor from "react-simple-code-editor";

import { highlight, languages } from 'prismjs';
import {
  AnalysisResult,
  Commands,
  NonErrorResult,
  ParseError,
  SyntaxErrors,
  WhitespaceParser,
} from "src/others/kaladesh-lang/Parser";
import WhitespaceExecutor from "src/others/kaladesh-lang/Executor";
import {
  Paper,
  IconButton,
  Link,
  Button,
  Select,
  MenuItem,
  Stack,
  Box
} from "@mui/material";
import PlayCircle from "@mui/icons-material/PlayCircle";
import CustomBar from "src/components/CustomBar";

const langData = {
  "kaladesh": {
    tab: "カラデシュ!",
  },
  "avishkar": {
    tab: "アヴィシュカー!",
  },
};
type langKey = keyof typeof langData;

export default function Home() {
  const [code, setCode] = React.useState(
    "カラデシュ!\nすごい!\n本当にすごいんだ!"
  );

  const [langMode, setLangMode] = React.useState<langKey>("kaladesh");
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

  languages["kaladesh"] = {
    ws: /すごい\!/,
    tab: /カラデシュ\!/,
    lf: /本当にすごいんだ\!/,
  };
  languages["avishkar"] = {
    ws: /すごい\!/,
    tab: /アヴィシュカー\!/,
    lf: /本当にすごいんだ\!/,
  }

  const onParse = () => {
    let parser = new WhitespaceParser();
    const result = parser.parse(
      code,
      "すごい!",
      langData[langMode].tab,
      "本当にすごいんだ!",
      true
    );

    setParsed(result);

    if (result == undefined) setParsedResultStr("");
    else setParsedResultStr(parseResultAsString(result, langMode));
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

  const oChangeLangMode = (s: string) => {
    if (s in langData) {
      setCode(c => c.replaceAll(langData[langMode].tab, langData[s as langKey].tab));
      setLangMode(s as langKey);
      setParsedResultStr(undefined);
      setExecResultStr(undefined);
    }
  }

  return (
    <>
      <Head>
        <title>カラデシュ言語エディター</title>
        <meta
          name="description"
          content="カラデシュ言語すごい!本当にすごいんだ!"
        />
        <link
          rel="icon"
          href={process.env.NEXT_PUBLIC_ASSET_PREFIX + "/favicon.ico"}
        />
        <style>{highlightCss}</style>
      </Head>
      <div style={{ minWidth: "600px", width: "100vw", height: "100vh", display: "flex", flexDirection: "column", boxSizing: "border-box", overflowY: "hidden", overflowX: "hidden" }}>
        <CustomBar noScroll={true} />
        <Stack direction="column" spacing={2} flexGrow={1} minHeight={0} height="100%" padding="10px" boxSizing="border-box" >
          <Stack direction="row" spacing={2} alignItems="center" style={{ padding: 10, boxSizing: "border-box" }}>
            <h1>カラデシュ言語エディター</h1>
            <Link href="./help" target="_blank">
              <Button variant="contained">Help</Button>
            </Link>
            <Select
              value={langMode}
              onChange={(e) => oChangeLangMode(e.target.value)}
            >
              <MenuItem value="kaladesh">カラデシュモード</MenuItem>
              <MenuItem value="avishkar">アヴィシュカーモード</MenuItem>
            </Select>
          </Stack>
          <hr style={{ margin: 0 }} />
          <Stack
            direction="row"
            spacing={2}
            justifyContent="space-evenly"
            alignItems={"stretch"}
            flex={1}
            minHeight={0}
            style={{ height: "100%", boxSizing: "border-box" }}
          >
            <Paper sx={{ flex: 5, height: "100%" }} style={{ whiteSpace: "pre", padding: "10px", boxSizing: "border-box", minWidth: 0 }}>
              <Stack direction={"column"} spacing={2} style={{ width: "100%", height: "100%" }}>
                <h3>コード</h3>
                <hr style={{ marginRight: "10px" }} />
                <div style={{ flexGrow: 1, width: "100%", height: "100%", overflow: "scroll", margin: 0 }}>
                  <Editor
                    value={code}
                    onValueChange={(code) => setCode(code)}
                    highlight={(code) => {
                      const highlighted = highlight(
                        code,
                        langMode === "avishkar" ? languages.avishkar : languages.kaladesh,
                        langMode
                      );

                      return highlighted
                    }
                    }
                    padding={10}
                    style={{
                      fontFamily: '"Fira code", "Fira Mono", monospace',
                      fontSize: 12,
                      fontWeight: "bold",
                      border: "1px solid #ddd",
                      minHeight: "100%",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              </Stack>
            </Paper>
            <Box
              sx={{
                flex: 1,
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <IconButton onClick={onParse}>
                <PlayCircle />
              </IconButton>
            </Box>
            <Paper sx={{ flex: 3, height: "100%" }} style={{ whiteSpace: "pre", padding: "10px", boxSizing: "border-box", minWidth: 0 }}>
              <Stack direction={"column"} spacing={2} style={{ width: "100%", height: "100%" }}>
                <h3>コンパイル結果</h3>
                <hr style={{ marginRight: "15px" }} />
                <div style={{ width: "100%", height: "auto", overflow: "auto", margin: 0, flexGrow: 1 }}>
                  <pre>{parsedResultStr}</pre>
                </div>
              </Stack>
            </Paper>
            <Box
              sx={{
                flex: 1,
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <IconButton onClick={onExec}>
                <PlayCircle />
              </IconButton>
            </Box>
            <Paper sx={{ flex: 3, height: "100%" }} style={{ whiteSpace: "pre", padding: "10px", boxSizing: "border-box", minWidth: 0 }}>
              <Stack direction={"column"} spacing={2} style={{ width: "100%", height: "100%" }}>
                <h3>実行結果</h3>
                <hr style={{ marginRight: "15px" }} />
                <div style={{ width: "100%", height: "auto", overflow: "auto", margin: 0, flexGrow: 1 }}>
                  <pre>{execResultStr}</pre>
                </div>
              </Stack>
            </Paper>
          </Stack>
        </Stack>
      </div>
    </>
  );
}

function parseResultAsString(
  result: AnalysisResult | ParseError[] | SyntaxErrors,
  langMode: langKey = "kaladesh"
): string {
  const replaceCommandName = (str: Commands): string => {
    if (langMode === "avishkar" && str === "KaladeshArithmetic") {
      return "AvishkarArithmetic";
    }
    return str;
  }

  if ("commands" in result) {
    let str = result.commands
      .map((cmd) => {
        return `  ${replaceCommandName(cmd.command)} ${"param" in cmd ? cmd.param.toString() : ""}\n`;
      })
      .reduce((a, b) => a + b, "");

    return str;
  } else if ("error" in result) {
    let str = result.error
      .map((r: { msg: string; tokenIndex?: number; commandIndex?: number }) => {
        return `Syntax Error: ${r.msg}, Command Index=${r.commandIndex}\n`;
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
              : `${cmd.command} ${"param" in cmd ? cmd.param.toString() : ""
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

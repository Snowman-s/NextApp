import Head from "next/head";
import {
  IconButton,
  TextField,
  Typography,
  Grid,
  Button,
  Icon,
} from "@material-ui/core";
import React from "react";

import Editor from "react-simple-code-editor";
import dynamic from "next/dynamic";

import Prism from "prismjs";
import PlayCircleIcon from "@material-ui/icons/PlayCircleFilled";
import {
  WhitespaceParseOutput,
  WhitespaceParser,
} from "src/others/whitespace/Parser";

export default function Home() {
  const [code, setCode] = React.useState(
    "カラデシュ!\nすごい!\n本当にすごいんだ!"
  );

  const [parsed, setParsed] = React.useState<WhitespaceParseOutput[]>([]);

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
    ws: /カラデシュ\!/,
    tab: /すごい\!/,
    lf: /本当にすごいんだ\!/,
  };

  const onExec = () => {
    setParsed(
      new WhitespaceParser().parse(code, [
        "カラデシュ!",
        "すごい!",
        "本当にすごいんだ!",
      ])
    );
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
        <style jsx>{highlightCss}</style>
      </Head>
      <Grid container>
        <Grid item>
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
        </Grid>
        <Grid item>
          <IconButton onClick={onExec}>
            <PlayCircleIcon />
          </IconButton>
        </Grid>
        <Grid item>
          {parsed.map((p, index) => (
            <Typography key={index}>
              {p.error ? "Error:" + p.where : p.where}
            </Typography>
          ))}
        </Grid>
      </Grid>
    </div>
  );
}

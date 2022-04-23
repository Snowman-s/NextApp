import Head from "next/head";
import { IconButton, TextField, Typography, Grid } from "@material-ui/core";
import React from "react";

import Editor from "react-simple-code-editor";
import dynamic from "next/dynamic";

import Prism from "prismjs";

export default function Home() {
  const [code, setCode] = React.useState(
    `カラデシュ!\nすごい!\n本当にすごいんだ!`
  );

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
      </Grid>
    </div>
  );
}

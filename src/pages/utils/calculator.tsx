import Head from "next/head";
import { IconButton, TextField, Typography, Grid } from "@material-ui/core";
import calcIt from "src/others/calculator/calc";
import { useState } from "react";

export default function Home() {
  const [result, setResult] = useState("0.0");

  const onFormulaChanged = function (event: { target: { value: string } }) {
    setResult(calcIt(event.target.value).toString());
  };

  return (
    <div>
      <Head>
        <title>Calculator</title>
        <meta name="description" content="文字列を解釈する一般電卓" />
        <link
          rel="icon"
          href={process.env.NEXT_PUBLIC_ASSET_PREFIX + "/favicon.ico"}
        />
      </Head>
      <Grid container>
        <Grid item>
          <TextField onChange={onFormulaChanged} />
        </Grid>
        <Grid item>
          <Typography> = </Typography>
        </Grid>
        <Grid item>
          <Typography>{result}</Typography>
        </Grid>
      </Grid>
    </div>
  );
}

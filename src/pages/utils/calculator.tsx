import Head from "next/head";
import { IconButton, TextField, Typography } from "@material-ui/core";
import calcIt from "src/others/calculator/calc";
import { useState } from "react";

export default function Home() {
  const [result, setResult] = useState("0.0");
  const [formula, setFormula] = useState("");

  const onFormulaChanged = function (event: { target: { value: string } }) {
    setFormula(event.target.value);
  };
  const onCalcButtonClicked = function () {
    setResult(calcIt(formula).toString());
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
      <TextField onChange={onFormulaChanged} />
      <IconButton onClick={onCalcButtonClicked}>
        <Typography> = </Typography>
      </IconButton>
      <Typography>{result}</Typography>
    </div>
  );
}

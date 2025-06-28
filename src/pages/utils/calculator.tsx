import Head from "next/head";
import { TextField, Typography, Stack } from "@mui/material";
import calcIt from "src/others/calculator/calc";
import { useState } from "react";
import CustomBar from "src/components/CustomBar";

export default function Home() {
  const [result, setResult] = useState("0.0");

  const onFormulaChanged = function (event: { target: { value: string } }) {
    const answer = calcIt(event.target.value);
    setResult(typeof answer == "number" ? answer.toFixed(10) : answer);
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
      <CustomBar />
      <Stack direction="row">
        <TextField onChange={onFormulaChanged} />
        <Typography> = </Typography>
        <Typography>{result}</Typography>
      </Stack>
    </div>
  );
}

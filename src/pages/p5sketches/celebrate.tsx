import {
  TextField,
  Slider,
  Stack,
  Typography,
} from "@mui/material";
import Head from "next/head";
import { useState } from "react";
import { CanvasOperationPanel } from "src/components/CanvasOperationPanel";
import CustomBar from "src/components/CustomBar";
import P5Canvas from "src/components/P5Canvas";
import celebrate from "src/others/sketches/celebrate/celebrate";

export default function Home() {
  const [restart, setRestart] = useState(false);
  const [save, setSave] = useState(false);
  const [happiness, setHappiness] = useState(50);
  const [celebrateString, setCelebrateString] =
    useState("なにかしあわせなこと");

  return (
    <div>
      <Head>
        <title>せれぶれいと </title>
        <meta name="description" content="記入した文を凄まじくお祝いします" />
        <link
          rel="icon"
          href={process.env.NEXT_PUBLIC_ASSET_PREFIX + "/favicon.ico"}
        />
      </Head>
      <CustomBar />
      <P5Canvas
        sketch={celebrate}
        restartRequire={restart}
        onRestartEnd={() => {
          setRestart(false);
        }}
        saveRequire={save}
        onSaveEnd={() => {
          setSave(false);
        }}
        happiness={happiness}
        celebrateString={celebrateString}
      >
        <CanvasOperationPanel
          title="せれぶれいと"
          onRequireRestart={() => {
            setRestart(true);
          }}
          onRequireSave={() => {
            setSave(true);
          }}
          slideOutOnRestart={true}
        >
          <Stack direction="column" spacing={2}>
            <Stack direction="row" spacing={2}>
              <Stack flex={1}>
                <Typography gutterBottom>祝いたいこと</Typography>
                <TextField
                  value={celebrateString}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setCelebrateString(event.target.value);
                  }}
                  variant="standard"
                  fullWidth
                />
              </Stack>
            </Stack>
            <Stack direction="row" spacing={2}>
              <Stack flex={1}>
                <Typography gutterBottom>ハピネス度 (負荷注意！)</Typography>
                <Slider
                  max={100}
                  value={happiness}
                  onChange={(_event: Event, value: number | number[]) => {
                    if (typeof value === "number") setHappiness(value);
                  }}
                />
              </Stack>
            </Stack>
          </Stack>
        </CanvasOperationPanel>
      </P5Canvas>
    </div>
  );
}

import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  Slider,
  Stack,
  Typography,
} from "@mui/material";
import Head from "next/head";
import { ReactNode, useState } from "react";
import { CanvasOperationPanel } from "src/components/CanvasOperationPanel";
import CustomBar from "src/components/CustomBar";
import P5Canvas from "src/components/P5Canvas";
import lifegame from "src/others/sketches/lifegame";

export default function Home() {
  const [restart, setRestart] = useState(false);
  const [save, setSave] = useState(false);
  const [saturation, setSaturation] = useState(255);
  const [bornCondition, setBornCondition] = useState([3]);
  const [deadCondition, setDeadCondition] = useState([0, 1, 4, 5, 6, 7, 8]);
  const [minGridAmount, setMinGridAmount] = useState(20);

  const neighborSelectValues = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div>
      <Head>
        <title>LifeGame</title>
        <meta
          name="description"
          content="ライフゲームシュミレーター by p5.js"
        />
        <link
          rel="icon"
          href={process.env.NEXT_PUBLIC_ASSET_PREFIX + "/favicon.ico"}
        />
      </Head>
      <CustomBar />
      <P5Canvas
        sketch={lifegame}
        saturation={saturation}
        bornCondition={bornCondition}
        deadCondition={deadCondition}
        minGridAmount={minGridAmount}
        restartRequire={restart}
        onRestartEnd={() => {
          setRestart(false);
        }}
        saveRequire={save}
        onSaveEnd={() => {
          setSave(false);
        }}
      >
        <CanvasOperationPanel
          title="Life Game"
          onRequireRestart={() => {
            setRestart(true);
          }}
          onRequireSave={() => {
            setSave(true);
          }}
        >
          <Stack direction="column" spacing={3}>
            <Stack direction="row" spacing={2}>
              <Stack flex={1}>
                <Typography gutterBottom>彩度</Typography>
                <Slider
                  max={255}
                  defaultValue={255}
                  onChange={(_, value: number | number[]) => {
                    setSaturation(typeof value === "number" ? value : value[0]);
                  }}
                />
              </Stack>
            </Stack>
            <Stack direction="row" spacing={2}>
              <Stack flex={1}>
                <FormControl>
                  <InputLabel>生誕する際の隣人数</InputLabel>
                  <Select
                    multiple
                    value={bornCondition}
                    renderValue={(selected) =>
                      (selected as number[]).join(", ")
                    }
                    onChange={(event) => {
                      const value = event.target.value as number[];
                      setBornCondition([...value].sort());
                    }}
                    style={{ minWidth: 100 }}
                  >
                    {neighborSelectValues.map((num) => (
                      <MenuItem key={num} value={num}>
                        <Checkbox checked={bornCondition.includes(num)} />
                        <ListItemText primary={num} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>
              <Stack flex={1}>
                <FormControl>
                  <InputLabel>死亡する際の隣人数</InputLabel>
                  <Select
                    multiple
                    value={deadCondition}
                    renderValue={(selected) =>
                      (selected as number[]).join(", ")
                    }
                    onChange={(event) => {
                      const value = event.target.value as number[];
                      setDeadCondition([...value].sort());
                    }}
                    style={{ minWidth: 100 }}
                  >
                    {neighborSelectValues.map((num) => (
                      <MenuItem key={num} value={num}>
                        <Checkbox checked={deadCondition.includes(num)} />
                        <ListItemText primary={num} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>
            </Stack>
            <Stack direction="row" spacing={2}>
              <Stack flex={1}>
                <Typography gutterBottom>
                  マス目の多さ (変更時、現在の状態はリセット)
                </Typography>
                <Slider
                  min={3}
                  max={50}
                  defaultValue={20}
                  onChange={(_, value: number | number[]) => {
                    setMinGridAmount(typeof value === "number" ? value : value[0]);
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

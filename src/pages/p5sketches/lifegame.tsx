import { Button, Checkbox, Divider, FormControl, Grid, InputLabel, ListItemText, MenuItem, Paper, Select, Slider, Typography, Slide, Container, IconButton, Fab } from "@material-ui/core"
import {ExpandLess, ExpandMore} from "@material-ui/icons"
import Head from "next/head"
import { Color } from "p5"
import { ReactNode, useState } from "react"
import { CanvasOperationPanel } from "src/components/CanvasOperationPanel"
import P5Canvas from "src/components/P5Canvas"
import lifegame from "src/others/sketches/lifegame"

export default function Home() {
  const [restart, setRestart] = useState(false)
  const [save, setSave] = useState(false)
  const [saturation, setSaturation] = useState(255)
  const [bornCondition, setBornCondition] = useState([3])
  const [deadCondition, setDeadCondition] = useState([0, 1, 4, 5, 6, 7, 8])
  const [minGridAmount, setMinGridAmount] = useState(20)

  const neighborSelectValues = [0, 1, 2, 3, 4, 5, 6, 7, 8]

  const handleChangeDeadCondition = (event: React.ChangeEvent<{ name?:String, value: unknown }>, child:ReactNode) => {
    setDeadCondition((event.target.value as number[]).sort())
  };
  const handleChangeBornCondition = (event: React.ChangeEvent<{ name?:String, value: unknown }>, child:ReactNode) => {
    setBornCondition((event.target.value as number[]).sort())
  };

  return (
    <div>
      <Head>
        <title>LifeGame</title>
        <meta name="description" content="ライフゲームシュミレーター by p5.js" />
        <link rel="icon" href={process.env.NEXT_PUBLIC_ASSET_PREFIX + "/favicon.ico"} />
      </Head>
      <P5Canvas 
        sketch={lifegame} 
        saturation={saturation} 
        bornCondition={bornCondition} deadCondition={deadCondition} 
        minGridAmount={minGridAmount} 
        restartRequire={restart} 
        onRestartEnd={()=>{setRestart(false)}}
        saveRequire={save} 
        onSaveEnd={()=>{setSave(false)}}> 
        <CanvasOperationPanel title="Life Game" onRequireRestart={()=>{setRestart(true)}} onRequireSave={()=>{setSave(true)}}>
          <Grid container direction="column">
          <Grid item>
            <Grid container direction="row" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom>
                  彩度
                </Typography>
                <Slider max={255} defaultValue={255} onChange={(event:object,value:number)=>{setSaturation(value);}}/>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container direction="row" spacing={2}>
              <Grid item xs>
                <FormControl>
                  <InputLabel>
                    生誕する際の隣人数
                  </InputLabel>
                  <Select 
                    multiple 
                    value={bornCondition}
                    renderValue={(selected) => (selected as number[]).join(', ')}
                    onChange={handleChangeBornCondition}
                    style={{minWidth:100}}
                  >
                    {neighborSelectValues.map((num) => (
                      <MenuItem key={num} value={num}>
                        <Checkbox checked={bornCondition.includes(num)} />
                        <ListItemText primary={num} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs>
                <FormControl>
                  <InputLabel>
                    死亡する際の隣人数
                  </InputLabel>
                  <Select 
                    multiple 
                    value={deadCondition}
                    renderValue={(selected) => (selected as number[]).join(', ')}
                    onChange={handleChangeDeadCondition}
                    style={{minWidth:100}}
                  >
                    {neighborSelectValues.map((num) => (
                      <MenuItem key={num} value={num}>
                        <Checkbox checked={deadCondition.includes(num)} />
                        <ListItemText primary={num} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container direction="row" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom>
                  マス目の多さ (変更時、現在の状態はリセット)
                </Typography>
                <Slider min={3} max={50} defaultValue={20} onChange={(event:object,value:number)=>{setMinGridAmount(value);}}/>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        </CanvasOperationPanel>
      </P5Canvas>
    </div>
  )
}
  
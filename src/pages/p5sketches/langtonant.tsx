import { Grid, Slider, Switch, Typography} from "@material-ui/core"
import Head from "next/head"
import { useState } from "react"
import { CanvasOperationPanel } from "src/components/CanvasOperationPanel"
import P5Canvas from "src/components/P5Canvas"
import langtonant from "src/others/sketches/langtonant"

export default function Home() {
  const [restart, setRestart] = useState(false)
  const [save, setSave] = useState(false)
  const [saturation, setSaturation] = useState(255)
  const [antWaitTime, setAntWaitTime] = useState(2)  
  const [antAmount, setAntAmount] = useState(1)
  const [antVisible, setAntVisible] = useState(true)
  const [minGridAmount, setMinGridAmount] = useState(20)

  return (
    <div>
      <Head>
        <title>Langton&#39;s Ant</title>
        <meta name="description" content="ラングトンのアリシミュレーション by p5.js" />
        <link rel="icon" href={process.env.NEXT_PUBLIC_ASSET_PREFIX + "/favicon.ico"} />
      </Head>
      <P5Canvas 
        sketch={langtonant} 
        saturation={saturation} 
        speed={antWaitTime}
        antVisible={antVisible}
        antAmount={antAmount}
        minGridAmount={minGridAmount} 
        restartRequire={restart} 
        onRestartEnd={()=>{setRestart(false)}}
        saveRequire={save} 
        onSaveEnd={()=>{setSave(false)}}> 
        <CanvasOperationPanel title="Langton&#39;s Ant" onRequireRestart={()=>{setRestart(true)}} onRequireSave={()=>{setSave(true)}}>
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
            <Grid container direction="row" spacing={2} justifyContent="flex-start" alignItems="center">
              <Grid item>
                <Typography>
                  アリを描画する
                </Typography>
              </Grid>
              <Grid item>
                <Switch defaultChecked={true} onChange={(event:object)=>{setAntVisible(!antVisible);}}/>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container direction="row" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom>
                  アリの数
                </Typography>
                <Slider min={1} max={20} defaultValue={1} onChange={(event:object,value:number)=>{setAntAmount(value);}}/>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container direction="row" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom>
                  アリの移動間の待機時間
                </Typography>
                <Slider min={1} max={30} defaultValue={2} onChange={(event:object,value:number)=>{setAntWaitTime(value);}}/>
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
  
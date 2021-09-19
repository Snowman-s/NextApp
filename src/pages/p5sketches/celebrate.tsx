import { Grid, Input, Slider, Switch, TextField, Typography} from "@material-ui/core"
import Head from "next/head"
import { useState } from "react"
import { CanvasOperationPanel } from "src/components/CanvasOperationPanel"
import P5Canvas from "src/components/P5Canvas"
import celebrate from "src/others/sketches/celebrate/celebrate"

export default function Home() {
  const [restart, setRestart] = useState(false);
  const [save, setSave] = useState(false);
  const [happiness, setHappiness] = useState(50);
  const [celebrateString, setCelebrateString] = useState("なにかしあわせなこと");

  return (
    <div>
      <Head>
        <title>せれぶれいと </title>
        <meta name="description" content="記入した文を凄まじくお祝いします" />
        <link rel="icon" href={process.env.NEXT_PUBLIC_ASSET_PREFIX + "/favicon.ico"} />
      </Head>
      <P5Canvas 
        sketch={celebrate} 
        restartRequire={restart} 
        onRestartEnd={()=>{setRestart(false)}}
        saveRequire={save} 
        onSaveEnd={()=>{setSave(false)}}
        
        happiness = {happiness}
        celebrateString = {celebrateString}> 
        <CanvasOperationPanel title="せれぶれいと" onRequireRestart={()=>{setRestart(true)}} onRequireSave={()=>{setSave(true)}}>
          <Grid container direction="column">
          <Grid item>
            <Grid container direction="row" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom>
                  祝いたいこと
                </Typography>
                <Input onChange = {(event) => {setCelebrateString(event.target.value)}}/>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container direction="row" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom>
                  ハピネス度 (負荷注意！)
                </Typography>
                <Slider max={100} defaultValue={50} onChange={(event:object,value:number)=>{setHappiness(value);}}/>
              </Grid>
            </Grid>
          </Grid>
          </Grid>
        </CanvasOperationPanel>
      </P5Canvas>
    </div>
  )
}
  
import { Button, Checkbox, Divider, FormControl, Grid, Input, InputLabel, ListItemText, MenuItem, Paper, Select, Slider, Typography } from "@material-ui/core"
import { ReactNode, useState } from "react"
import P5Canvas from "src/components/P5Canvas"
import lifegame from "src/components/sketches/lifegame"

export default function Home() {
  const [restart, setRestart] = useState(false)
  const [saturation, setSaturation] = useState(255)
  const [bornCondition, setBornCondition] = useState([3])
  const [deadCondition, setDeadCondition] = useState([0, 1, 4, 5, 6, 7, 8])

  const neighborSelectValues = [0, 1, 2, 3, 4, 5, 6, 7, 8]

  const handleChangeDeadCondition = (event: React.ChangeEvent<{ name?:String, value: unknown }>, child:ReactNode) => {
    setDeadCondition((event.target.value as number[]).sort())
  };
  const handleChangeBornCondition = (event: React.ChangeEvent<{ name?:String, value: unknown }>, child:ReactNode) => {
    setBornCondition((event.target.value as number[]).sort())
  };

  return (
    <div>
      <P5Canvas sketch={lifegame} saturation={saturation} restartRequire={restart} bornCondition={bornCondition} deadCondition={deadCondition} onRestartEnd={()=>{setRestart(false)}}>  
        <Paper style={{padding:20, margin:20}}>
        <Grid container direction="column" spacing={1}>
          <Grid item>
            <Grid container direction="row" alignItems="center" spacing={1}>
              <Grid item>
              <Typography variant="h2">
                Life Game
              </Typography>
              </Grid>
              <Grid item>
              <Button variant="contained" color="primary" onClick={()=>{setRestart(true)}}>
                Restart
              </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Divider/>
          </Grid>
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
        </Grid>
        </Paper>
      </P5Canvas>
    </div>
  )
}
  
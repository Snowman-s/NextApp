import { Button, Divider, Fab, Grid, Paper, Slide, Typography } from "@material-ui/core"
import { ExpandLess, ExpandMore } from "@material-ui/icons"
import { ReactNode, useState } from "react"

export class CanvasOperationPanelProps{
    title:String;
    onRequireRestart: ()=>void;
    onRequireSave: ()=>void;
    children?:ReactNode;
}

export function CanvasOperationPanel(props:CanvasOperationPanelProps){
    const [slideIn, setSlideIn] = useState(true)
        
    const toggleSlideIn = ()=>{
        setSlideIn(!slideIn)
    }
    
    return (
        <div>
        <Grid container direction="row" spacing={1}>
        <Grid item>
        <Slide in={slideIn} >
        <Paper style={{padding:20, margin:20}}>
        <Grid container direction="column" spacing={1}>
        <Grid item>
            <Grid container direction="row" alignItems="center" spacing={1}>
            <Grid item>
            <Typography variant="h2">
                {props.title}
            </Typography>
            </Grid>
            <Grid item>
            <Button variant="contained" color="primary" onClick={()=>props.onRequireSave()}>
                Save
            </Button>
            </Grid>
            <Grid item>
            <Button variant="contained" color="primary" onClick={()=>{props.onRequireRestart()}}>
                Restart
            </Button>
            </Grid>
            </Grid>
        </Grid>
        <Grid item>
            <Divider/>
        </Grid>
        <Grid item>
            {props.children}
        </Grid>
        </Grid>
        </Paper>
        </Slide>
        </Grid>
        <Grid item>
        <Fab style={{marginTop:25}} onClick={toggleSlideIn} color="secondary">
        {
            slideIn? <ExpandLess/> : <ExpandMore/>
        }
        </Fab>
        </Grid>
        </Grid>
        </div>
    )
}       

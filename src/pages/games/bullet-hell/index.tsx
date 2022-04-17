import {
  makeStyles,
  createStyles,
  Theme,
  Paper,
  Grid,
} from "@material-ui/core";
import Head from "next/head";
import P5Canvas from "src/components/P5Canvas";
import { SketchList } from "src/components/SketchList";
import getWorksList from "src/others/games/bullet-hell/works/list";
import lifegame from "src/others/sketches/lifegame";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& h1": {
        padding: theme.spacing(3),
        color: theme.palette.primary.dark,
      },
    },
  })
);

export default function Home() {
  const classes = useStyles();

  let sketches = [];

  let keys = getWorksList().keys();

  if (getWorksList().size > 0) {
    for (let keysItem = keys.next(); !keysItem.done; keysItem = keys.next()) {
      var elm = keysItem.value;
      sketches.push({
        sketchName: elm,
        sketchURL: "/games/bullet-hell/" + elm + "/",
        sketchImage:
          process.env.NEXT_PUBLIC_ASSET_PREFIX + "/sketchimage/lifegame.png",
      });
    }
  }

  return (
    <div className={classes.root}>
      <Head>
        <title>BulletHell</title>
        <meta name="description" content="弾幕シューティングをしよう" />
        <link
          rel="icon"
          href={process.env.NEXT_PUBLIC_ASSET_PREFIX + "/favicon.ico"}
        />
      </Head>
      <main>
        <P5Canvas sketch={lifegame} minGridAmount={40}>
          <Grid container alignItems="center" direction="column">
            <Grid item>
              <Paper>
                <SketchList sketches={sketches} />
              </Paper>
            </Grid>
          </Grid>
        </P5Canvas>
      </main>
    </div>
  );
}

import {
  makeStyles,
  createStyles,
  Theme,
  Paper,
  Grid,
} from "@material-ui/core";
import dynamic from "next/dynamic";
import Head from "next/head";
import { SketchList } from "src/components/SketchList";
import lifegame from "src/others/sketches/lifegame";

const P5Canvas = dynamic(() => import("src/components/P5Canvas"), {
  ssr: false,
});

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

  const sketches = [
    {
      sketchName: "Life Game",
      sketchURL: "/p5sketches/lifegame",
      sketchImage:
        process.env.NEXT_PUBLIC_ASSET_PREFIX + "/sketchimage/lifegame.png",
    },
    {
      sketchName: "Langton's Ant",
      sketchURL: "/p5sketches/langtonant",
      sketchImage:
        process.env.NEXT_PUBLIC_ASSET_PREFIX + "/sketchimage/langtonant.png",
    },
    {
      sketchName: "Celebrate",
      sketchURL: "/p5sketches/celebrate",
      sketchImage:
        process.env.NEXT_PUBLIC_ASSET_PREFIX + "/sketchimage/celebrate.png",
    },
  ];

  return (
    <div className={classes.root}>
      <Head>
        <title>p5.js Sketches</title>
        <meta name="description" content="p5.js スケッチの詰め合わせ" />
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
                <h1>p5.js スケッチ詰め合わせ</h1>
                <p>p5.jsにて作成したインタラクティブなスケッチ群です！</p>
                <SketchList sketches={sketches} />
              </Paper>
            </Grid>
          </Grid>
        </P5Canvas>
      </main>
    </div>
  );
}

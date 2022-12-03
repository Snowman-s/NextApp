import { makeStyles, createStyles, Theme } from "@material-ui/core";
import { Stack, List, ListItem, Paper } from "@mui/material";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useState } from "react";
import { BulletP5 } from "src/others/games/bullet-hell/BulletP5";
import a from "src/others/games/bullet-hell/works/a";
import getWorksList from "src/others/games/bullet-hell/works/list";

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
  const [sketch, setSketch] = useState<{
    sketch: (p: BulletP5) => void;
  } | null>(null);

  let sketches: {
    id: string;
    sketchName: string;
    sketchFunc: (p: BulletP5) => void;
  }[] = [];

  let keys = getWorksList().keys();

  if (getWorksList().size > 0) {
    for (let keysItem = keys.next(); !keysItem.done; keysItem = keys.next()) {
      var elm = getWorksList().get(keysItem.value);
      sketches.push({
        id: keysItem.value as string,
        sketchName: elm.name,
        sketchFunc: elm.work,
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
      <Stack direction={{ xs: "column", sm: "row" }}>
        <Paper>
          <List>
            {sketches.map((sketchInfo) => {
              return (
                <ListItem
                  key={sketchInfo.id}
                  button
                  onClick={(event) => {
                    event.preventDefault();
                    setSketch({ sketch: sketchInfo.sketchFunc });
                  }}
                >
                  {sketchInfo.sketchName}
                </ListItem>
              );
            })}
          </List>
        </Paper>
        <P5Canvas sketch={sketch !== null ? sketch.sketch : a}></P5Canvas>
      </Stack>
    </div>
  );
}

import { makeStyles, createStyles, Theme } from "@material-ui/core";
import ArrowForward from "@mui/icons-material/ArrowForward";
import {
  Stack,
  List,
  ListItem,
  Paper,
  ListItemIcon,
  ListItemText,
  Tabs,
  Tab,
  Box,
} from "@mui/material";
import Head from "next/head";
import { useRef as createRef, useState } from "react";
import P5Canvas from "src/components/P5Canvas";
import getWorksList from "src/others/games/bullet-hell/works/list";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: "fixed",
      left: 0,
      up: 0,
      "& h1": {
        padding: theme.spacing(3),
        color: theme.palette.primary.dark,
      },
    },
  })
);

const sketches = getWorksList();

export default function Home() {
  const classes = useStyles();
  const [tab, setTab] = useState(0);
  const [sketch, setSketch] = useState(sketches[0].data[0]);

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
        <Box>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs onChange={(_, v: number) => { setTab(v); setSketch(sketches[v].data[0]); }} variant="scrollable">
              {sketches.map((tabs, index) => (
                <Tab value={index} key={index} label={tabs.tabName} />
              ))}
            </Tabs>
          </Box>
          {sketches.map((tabs, thisTabIndex) =>
          (
            <div hidden={tab !== thisTabIndex} key={`paper-${thisTabIndex}`}>
              <Paper>
                <List>
                  {tabs.data.map((work, workIndex) => {
                    return (
                      <ListItem
                        key={`${thisTabIndex}-${workIndex}`}
                        onClick={(event) => {
                          event.preventDefault();
                          setSketch(work);
                        }}
                        button
                      >
                        {work === sketch ? (
                          <ListItemIcon>
                            <ArrowForward />
                          </ListItemIcon>
                        ) : (
                          <></>
                        )}
                        <ListItemText
                          inset={work !== sketch}
                          primary={work.name}
                        />
                      </ListItem>
                    );
                  })}
                </List>
              </Paper>
            </div>
          ))}
        </Box>
        <P5Canvas sketch={sketch.work}></P5Canvas>
      </Stack>
    </div>
  );
}

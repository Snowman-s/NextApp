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
  ListItemButton,
} from "@mui/material";
import ArrowForward from "@mui/icons-material/ArrowForward";
import Head from "next/head";
import { useState } from "react";
import P5Canvas from "src/components/P5Canvas";
import getWorksList from "src/others/games/bullet-hell/works/list";
import CustomBar from "src/components/CustomBar";
import { CustomP5 } from "src/others/CustomP5";

const sketches = getWorksList();

export default function Home() {
  const [tab, setTab] = useState(0);
  const [sketch, setSketch] = useState(sketches[0].data[0]);

  return (
    <div>
      <Head>
        <title>BulletHell</title>
        <meta name="description" content="弾幕シューティングをしよう" />
        <link
          rel="icon"
          href={process.env.NEXT_PUBLIC_ASSET_PREFIX + "/favicon.ico"}
        />
      </Head>
      <CustomBar />
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
                      <ListItemButton
                        key={`${thisTabIndex}-${workIndex}`}
                        onClick={(event) => {
                          event.preventDefault();
                          setSketch(work);
                        }}
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
                      </ListItemButton>
                    );
                  })}
                </List>
              </Paper>
            </div>
          ))}
        </Box>
        <P5Canvas sketch={sketch.work as (p: CustomP5) => void}></P5Canvas>
      </Stack>
    </div>
  );
}

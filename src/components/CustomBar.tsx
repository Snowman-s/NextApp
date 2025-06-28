import { Menu, OutboundOutlined } from '@mui/icons-material';
import { Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import React, { useState } from 'react';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';

const pageNaviData:
  {
    category: string,
    pages: {
      name: string,
      link: string,
      external?: boolean
    }[]
  }[] = [
    {
      category: "トップページ",
      pages: [{ name: "トップページ", link: "/" }]
    },
    {
      category: "ゲーム",
      pages: [{
        name: "リバーシ",
        link: "/games/reversi"
      }, {
        name: "弾幕集",
        link: "/games/bullet-hell"
      }]
    },
    {
      category: "p5.js",
      pages: [{
        name: "トップページ",
        link: "/p5sketches"
      }, {
        name: "ライフゲーム",
        link: "/p5sketches/lifegame"
      }, {
        name: "ラングトンの蟻",
        link: "/p5sketches/langtonant"
      }, {
        name: "せれぶれいと",
        link: "/p5sketches/celebrate"
      }]
    },
    {
      category: "ツール",
      pages: [{
        name: "カラデシュ言語エディター",
        link: "/utils/kaladesh-lang"
      }, {
        name: "計算機変換",
        link: "/utils/computation-system"
      }, {
        name: "ただの電卓",
        link: "/utils/calculator"
      }]
    },
    {
      category: "ガラクタ",
      pages: [
        {
          name: "言語集",
          link: "/words"
        }
      ]
    },
    {
      category: "外部サイト",
      pages: [
        {
          name: "Twitter",
          link: "https://x.com/SnowEsamosc",
          external: true
        },
        {
          name: "GitHub",
          link: "https://github.com/Snowman-s",
          external: true
        },
        {
          name: "Qiita",
          link: "https://qiita.com/Snowman-s",
          external: true
        },
        {
          name: "Note",
          link: "https://note.com/snowesamosc",
          external: true
        },
        {
          name: "Booth",
          link: "https://snowman-s.booth.pm/",
          external: true
        }
      ]
    }
  ]

export default function CustomBar(props: { noScroll?: boolean, style?: React.CSSProperties }) {
  const [open, setOpen] = useState(false);

  const pageNaviList = (
    <List>
      {pageNaviData.map((category, idx) => (
        <React.Fragment key={category.category}>
          <ListItem>
            <ListItemText primary={category.category} primaryTypographyProps={{ fontWeight: 'bold' }} />
          </ListItem>
          {category.pages.map((page) => (
            <ListItem key={page.link} disablePadding>
              <ListItemButton component="a" href={page.link} onClick={() => setOpen(false)}>
                {page.external ? <OutboundOutlined /> : <></>}
                <ListItemText primary={page.name} />
              </ListItemButton>
            </ListItem>
          ))}
          {idx < pageNaviData.length - 1 && <ListItem />}
        </React.Fragment>
      ))}
    </List>
  )

  return (
    <>
      <AppBar position={props.noScroll ? "static" : "sticky"} style={props.style ?? {}} color="primary">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            {"SnowEsamoscのページ"}
          </Typography>
          <div style={{ marginLeft: 'auto' }}>
            <IconButton onClick={() => setOpen(true)}>
              <Menu style={{ color: "#dddddd" }} />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          style: {
            position: 'absolute',
            top: 0,
            right: 0,
            height: '100%',
            width: 250,
          }
        }}
      >
        {pageNaviList}
      </Drawer>
    </>
  );
}

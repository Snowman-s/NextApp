import { Typography } from "@material-ui/core";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import { useState } from "react";
import P5Canvas from "src/components/P5Canvas";
import { BulletP5 } from "src/others/games/bullet-hell/BulletP5";
import b1 from "src/others/games/bullet-hell/works/a";
import getWorksList from "src/others/games/bullet-hell/works/list";

export default function Home() {
  var router = useRouter();

  var workStr = router.query.work;

  if (typeof workStr !== "string" && typeof workStr != "undefined") {
    workStr = workStr[0];
  }

  var item = getWorksList().get(workStr);
  var sketch = item.work;

  return (
    <div>
      <Head>
        <title>弾幕 - {item.name}</title>
        <meta name="description" content="弾幕" />
        <link
          rel="icon"
          href={process.env.NEXT_PUBLIC_ASSET_PREFIX + "/favicon.ico"}
        />
      </Head>
      {sketch == undefined ? <></> : <P5Canvas sketch={sketch} />}
    </div>
  );
}

export async function getStaticProps() {
  return { props: {} };
}

export async function getStaticPaths() {
  let keys = getWorksList().keys();

  let paths = [];

  if (getWorksList().size > 0) {
    for (let keysItem = keys.next(); !keysItem.done; keysItem = keys.next()) {
      var elm = keysItem.value;
      paths.push({
        params: {
          work: elm,
        },
      });
    }
  }

  return {
    paths: paths,
    fallback: false,
  };
}

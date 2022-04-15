import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import { useState } from "react";
import P5Canvas from "src/components/P5Canvas";
import { BulletP5 } from "src/others/games/bullet-hell/BulletP5";
import b1 from "src/others/games/bullet-hell/works/b1";
import getWorksList from "src/others/games/bullet-hell/works/list";

export default function Home() {
  var router = useRouter();

  var workStr = router.query.work;

  if (typeof workStr !== "string" && typeof workStr != "undefined") {
    workStr = workStr[0];
  }

  var sketch = getWorksList().get(workStr);

  return (
    <div>
      <Head>
        <title>弾幕ページ</title>
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

import { Grid } from "@material-ui/core";
import Head from "next/head";
import P5Canvas from "src/components/P5Canvas";
import noiseaction from "src/others/games/noiseaction/noiseaction";

export default function Home() {
  return (
    <div>
      <Head>
        <title>ノイズ</title>
        <meta name="description" content="ノイズに飲まれるアクションゲーム！" />
        <link
          rel="icon"
          href={process.env.NEXT_PUBLIC_ASSET_PREFIX + "/favicon.ico"}
        />
      </Head>
      <P5Canvas sketch={noiseaction} />
    </div>
  );
}

import {
  Paper,
} from "@mui/material";
import dynamic from "next/dynamic";
import Head from "next/head";
import CustomBar from "src/components/CustomBar";
import { SketchList } from "src/components/SketchList";
import lifegame from "src/others/sketches/lifegame";

const P5Canvas = dynamic(() => import("src/components/P5Canvas"), {
  ssr: false,
});

export default function Home() {

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
    <div>
      <Head>
        <title>p5.js Sketches</title>
        <meta name="description" content="p5.js スケッチの詰め合わせ" />
        <link
          rel="icon"
          href={process.env.NEXT_PUBLIC_ASSET_PREFIX + "/favicon.ico"}
        />
      </Head>
      <CustomBar />
      <main>
        <P5Canvas sketch={lifegame} minGridAmount={40}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div>
              <Paper>
                <h1 style={{ padding: 3 }}>p5.js スケッチ詰め合わせ</h1>
                <p style={{ padding: 5 }}>p5.jsにて作成したインタラクティブなスケッチ群です！</p>
                <SketchList sketches={sketches} />
              </Paper>
            </div>
          </div>
        </P5Canvas>
      </main>
    </div>
  );
}

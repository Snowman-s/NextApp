import { Grid } from "@material-ui/core"
import Head from "next/head"
import P5Canvas from "src/components/P5Canvas"
import undefinedcardgame from "src/others/games/undefinedcardgame/undefinedcardgame"

export default function Home() {
  return (
    <div>
      <Head>
        <title>Langton&#39;s Ant</title>
        <meta name="description" content="ラングトンのアリシミュレーション by p5.js" />
        <link rel="icon" href={process.env.NEXT_PUBLIC_ASSET_PREFIX + "/favicon.ico"} />
      </Head>
      <P5Canvas sketch={undefinedcardgame}/> 
    </div>
  )
}
  
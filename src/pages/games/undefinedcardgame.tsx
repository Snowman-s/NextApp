import Head from "next/head";
import P5Canvas from "src/components/P5Canvas";
import undefinedcardgame from "src/others/games/undefinedcardgame/undefinedcardgame";

export default function Home() {
  return (
    <div>
      <Head>
        <title>あんのうん</title>
        <meta name="description" content="意味不明カードゲーム！" />
        <link
          rel="icon"
          href={process.env.NEXT_PUBLIC_ASSET_PREFIX + "/favicon.ico"}
        />
      </Head>
      <P5Canvas sketch={undefinedcardgame} />
    </div>
  );
}

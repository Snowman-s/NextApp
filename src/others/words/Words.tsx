import { JSX } from "react";

export type FirstChar = string;
export type WordItem = { name: string; howread: string; describe: JSX.Element };

export function Words() {
  var wordList: WordItem[] = [
    {
      name: "アイデンティティー",
      howread: "あいでんてぃてぃー",
      describe: (
        <>
          人が存在するために必要不可欠な要素。
          <br />
          私は、「自分」という自体は存在せず、いくらかの「他人と違うこと」の積み重ねによって語られるということによって
          <b>概念上</b>存在すると思っている。
          <br />
          この「他人と違うこと」がアイデンティティーである、ということに違いない。
        </>
      ),
    },
    {
      name: "I wanna ...",
      howread: "あいわな",
      describe: (
        <>
          「I Wanna Be The Guy」やその二次創作たち。
          <br />
          めちゃくちゃ難しいが達成したときの喜びは尋常ではない。
          <br />
          最近はあまりやっていない。
        </>
      ),
    },
    {
      name: "鬱展開",
      howread: "うつてんかい",
      describe: (
        <>
          ストーリーの展開を形容したもの。
          <br />
          鬱展開は自分が思い入れを持つように丁寧に描写されたキャラクターに対して行ってほしい。
          <br />
          感情移入する前に殺されてしまうのはふつうに心が痛む。
        </>
      ),
    },
    {
      name: "お絵かき",
      howread: "おえかき",
      describe: (
        <>
          アートを作り出すこと。機械に描いてもらうことはよくやっている。稀に、自分で書くこともある。
          <br />
          よく考えてみたら、何をもって「それ」を絵と呼ぶのだろう？となった。
          <br />
          や、まぁ定義なんてしなくても幸福な気持ちを生み出すならそれでいいですね。
        </>
      ),
    },
    {
      name: "Alter Ego",
      howread: "おるたーえご",
      describe: (
        <>
          スマートフォンのゲーム。システムはクッキークリッカー。
          <br />
          ストーリーがかなり痛烈に自分に刺さった。
          <br />
          これを通して私は『ドグラ・マグラ』や『変身』を知った。
        </>
      ),
    },
    {
      name: "カラオケ",
      howread: "からおけ",
      describe: <>楽しい。でも下手。</>,
    },
    {
      name: "かわいい",
      howread: "かわいい",
      describe: (
        <>
          非常にいとおしいものを表現するのに最も適切な語彙。大切なエネルギー源でもある。
          <br />
          私は「キュート」と「セクシー」は反発する概念である派なので、
          比較的小さいものがかわいいと思うことが多い。
        </>
      ),
    },
    {
      name: "黒歴史",
      howread: "くろれきし",
      describe: (
        <>
          忘れ去りたいけどそうできないもの。
          <br />
          もっぱら人の気分を不意に損ねてしまったものばかり。
          <br />
          たまに漏れ出す。
        </>
      ),
    },
    {
      name: "ゲーム作り",
      howread: "げーむづくり",
      describe: (
        <>
          理想が高いからか何か分からないけど、作るのに飽きたゲームは実際に完成させたゲームの10倍はある。と思う。
        </>
      ),
    },
    {
      name: "三角関数",
      howread: "さんかくかんすう",
      describe: (
        <>
          斜辺の長さが1の直角三角形について...みたいなことはどうでもよく、
          <br />
          極座標を直交座標に変換するのに使う。あと単純に波を生成する関数としても使う。
          <b>滑らかで好き。</b>
          <br />
          三角関数くんとお友達になれたらうれしい。
        </>
      ),
    },
    {
      name: "自己分析",
      howread: "じこぶんせき",
      describe: (
        <>
          自分が何者かを意識するのは辛い。
          <br />
          一方で、そのような自分をよく見ることへの防衛反応に負けているのでは、という説もある。
        </>
      ),
    },
    {
      name: "視線",
      howread: "しせん",
      describe: (
        <>
          私を苦しめる想像上の、架空の、存在。
          <br />
          孤独でいることはあまり考えなくなってしまったから、私は他の人間との関わり無しでは生きられないと思う。
        </>
      ),
    },
    {
      name: "Java",
      howread: "じゃば",
      describe: (
        <>
          最もポピュラーなプログラミング言語の一つ。
          <br />
          これを通じて私はリファレンスを読むことの大事さを知った。
          <br />
          今もCTFをやる際に使うことがある。明らかに向いてはいない。
        </>
      ),
    },
    {
      name: "JMind",
      howread: "じぇいまいんど",
      describe: (
        <>
          日本語プログラミング言語、Mindを、JVM上で動くようにした自作言語。
          <br />
          Mind自体によって書いた。かなり苦行だった。
          <br />
          「.class」ファイルについて少し詳しくなれた気がする。
        </>
      ),
    },
    {
      name: "Steam",
      howread: "すちーむ",
      describe: (
        <>
          ゲームを配信しているサイト、またはソフト？
          <br />
          とてもよくないが、つい、遊んでしまう。
        </>
      ),
    },
    {
      name: "躁",
      howread: "そう",
      describe: (
        <>
          自分のエスをスーパーエゴの中に閉じ込められない病気。
          <br />
          こうなっている時は大抵何かやらかす...または、やらかしたことが目につきやすい。
        </>
      ),
    },
    {
      name: "他責",
      howread: "たせき",
      describe: (
        <>
          最近は自責よりも高等な行いである説が浮上している。
          <br />
          表面だけの自責まがいの行いよりは、ちゃんと考えて問題を特定しようとしているから。
          <br />
          あなたの事ですよ。私さん？
        </>
      ),
    },
    {
      name: "楽しい",
      howread: "たのしい",
      describe: (
        <>
          周りから何も聞こえなくなった状態。
          <br />
          遊んで楽しんでくるくるくるくる
        </>
      ),
    },
    {
      name: "弾幕シューティング",
      howread: "だんまくしゅーてぃんぐ",
      describe: (
        <>
          弾を避けるデジタルゲーム。通常のシューティングより弾数が多く、当たり判定も小さい。
          <br />
          <b> 私の重要なルーツ。</b>
          最近はあまりやっていないが緩くつながっている感覚がある。
          <br />
          三角関数などもこれの作成を通じて知った 。
        </>
      ),
    },
    {
      name: "Twitter",
      howread: "ついったー",
      describe: <>短文投稿SNSサービス。私の一部はここで生きている。</>,
    },
    {
      name: "つぶやきProcessing",
      howread: "つぶやきぷろせっしんぐ",
      describe: (
        <>
          Twitterの、１ツイートにProcessingやp5.jsのコードを詰め込み、それを共有する創作活動。私もしている。
          <br />
          １ツイートだとは思えない作品群がTwitterに並ぶ。<b>こわい。</b>
          <br />
          私のアイデンティティの重要なコア。これを抜き去ったら多くの殻が崩れる気がする。
        </>
      ),
    },
    {
      name: "辛いこと",
      howread: "つらいこと",
      describe: (
        <>
          私の場合、精神的に辛いこと、それ自体がアイデンティティーに繋がると感じ、
          <br />
          苦しみをむしろ楽しんでいる節がある可能性が高い。
        </>
      ),
    },
    {
      name: "東方Project",
      howread: "とうほうぷろじぇくと",
      describe: (
        <>
          弾幕シューティングゲームの１シリーズ。もう少し小さかった頃はいっぱいやっていた。
          <br />
          進行度はそこそこ。Hard位の難易度が楽しい。
          <br />
          <b> システムがかなり好き。</b>天空璋から追うのをやめてしまった。
        </>
      ),
    },
    {
      name: "『ドグラ・マグラ』",
      howread: "どぐらまぐら",
      describe: (
        <>
          日本の三大奇書の一つ。推理小説、ということになっている。
          <br />
          これを読んだ後には心に空洞が出来る感覚があり、後の行動に影響を受けやすくなる...気がする。
        </>
      ),
    },
    {
      name: "何者か",
      howread: "なにものか",
      describe: (
        <>
          アイデンティティーを確立した存在。もっぱら「何者かになりたい」っという風に用いられる。私も良くそう思う。
          <br />
          「結局他人に認められたいってことだよね？」と言っている人がいたけど、実際その通りだと思った。
        </>
      ),
    },
    {
      name: "パソコン",
      howread: "ぱそこん",
      describe: (
        <>
          <b>親友。</b>その割には割とハードタスクをさせたり乱雑に扱ったりする。
          <br />
          日々の活動に欠かせない。
        </>
      ),
    },
    {
      name: "p5.js",
      howread: "ぴーごじぇーえす",
      describe: (
        <>
          Processingの親戚。最近はこれをよく使う。Webページ上でも手軽にキャンバスを操作出来て素敵。
        </>
      ),
    },
    {
      name: "for文",
      howread: "ふぉあぶん",
      describe: (
        <>
          プログラミング言語における文の一種。構造化プログラミングでは重要な役割があるらしい。
          <br />
          私のProcessingの出力は対称形が多い。きっと私が、小さいものが集まって大きなものに見せるのが好きだからだと思う。
          <br />
          よってこの文はめちゃくちゃ重要。<b>とっても好き。</b>
        </>
      ),
    },
    {
      name: "Processing",
      howread: "ぷろせっしんぐ",
      describe: (
        <>
          つぶやきProcessingにとって無くてはならない存在。感謝。
          <br />
          私をよく助けてくれる、つまり、私の感情をたくさん受け取ってくれる。
        </>
      ),
    },
    {
      name: "『変身』",
      howread: "へんしん",
      describe: (
        <>
          小説。主人公が唐突に虫になる。
          <br />
          『ドグラ・マグラ』を読んだ後にこれを読んだので頭が吹っ飛んだ。
          <br />
          これを読む前と読んだ後の自分の間には大きな溝がある。
        </>
      ),
    },
    {
      name: "放射状",
      howread: "ほうしゃじょう",
      describe: (
        <>
          対称的な形状の一つ。私は延々と極座標を使って放射状の作品を作っている気がする。
          <br />
          好きなんだもん。ねぇ。
        </>
      ),
    },
    {
      name: "遊戯王",
      howread: "ゆうぎおう",
      describe: (
        <>
          なぜか始めてしまったトレーディングカードゲーム。後悔はしていない。
          <br />
          カード相互作用によって起きるパズル的な要素が好きなので、カジュアルプレイを好む。
          <br />
          最近はMagic: The Gathering にも浮気している。
        </>
      ),
    },
    {
      name: "Lobotomy Corporation",
      howread: "ろぼとみーこーぽれーしょん",
      describe: (
        <>
          端的に言えばSCP管理ゲーム。より端的に言えば主人公の自分探しとそれに付き合わされる多くの被害者の物語。
          <br />
          <b>世界観と音楽がめちゃくちゃ好き。</b>特にSecond
          Warningの曲は最高。Youtubeでも聞ける。
          <br />
          好きなアブノーマリティ(幻想体)は蒼星様。安寧を...。
        </>
      ),
    },
    {
      name: "world.execute(me);",
      howread: "わーるどえくせきゅーとみー",
      describe: (
        <>
          「Lobotomy Corporation」の続編、「Library of Ruina」
          にてMiliさんを知った私は、他の作品にも手を出してみるのであった。
          <br />
          この曲は私の好みにドンピシャだった。いっぱい他の人にも聞いてほしい。
        </>
      ),
    },
  ];

  var ret = new Map<FirstChar, Set<WordItem>>();
  wordList.forEach((word) => {
    var firstChar = getFirstChar(word);
    if (!ret.has(firstChar)) {
      ret.set(firstChar, new Set());
    }
    ret.get(firstChar)!.add(word);
  });

  return ret;
}

function getFirstChar(item: WordItem) {
  let firstChar = item.howread[0];
  if ("ぁ" <= firstChar && firstChar <= "お") {
    return "あ";
  } else if ("か" <= firstChar && firstChar <= "ご") {
    return "か";
  } else if ("さ" <= firstChar && firstChar <= "ぞ") {
    return "さ";
  } else if ("た" <= firstChar && firstChar <= "ど") {
    return "た";
  } else if ("な" <= firstChar && firstChar <= "の") {
    return "な";
  } else if ("は" <= firstChar && firstChar <= "ぽ") {
    return "は";
  } else if ("ま" <= firstChar && firstChar <= "も") {
    return "ま";
  } else if ("ゃ" <= firstChar && firstChar <= "よ") {
    return "や";
  } else if ("ら" <= firstChar && firstChar <= "ろ") {
    return "ら";
  }
  return firstChar;
}

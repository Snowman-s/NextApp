import Head from "next/head";
import { Button, Link } from "@mui/material";
import CustomBar from "src/components/CustomBar";

export default function Home() {
  const helpArray: {
    name: string;
    IMP: ("WS" | "Tab" | "LF")[];
    discription: string;
    commands: [
      name: string,
      command: ("WS" | "Tab" | "LF")[],
      discription: string,
      param?: string
    ][];
  }[] = [
      {
        name: "Stack",
        IMP: ["WS"],
        discription:
          "スタックを操作するコマンド群です。ここでは、スタックの要素は最も後に積まれた要素から順番に番号付けされているものとして定義します。",
        commands: [
          ["Push", ["WS"], "<数値>をスタックに積みます。", "<数値>"],
          ["Dup", ["LF", "WS"], "スタックの1番目の要素を複製します。"],
          [
            "Copy",
            ["Tab", "WS"],
            "スタックの、<数値>番目の要素を複製しスタックに積みます。",
            "<数値>",
          ],
          [
            "Swap",
            ["LF", "Tab"],
            "スタックの1番目の要素と2番目の要素を入れ替えます。",
          ],
          ["Discard", ["LF", "LF"], "スタックの1番目の要素を捨てます。"],
          [
            "Slide",
            ["Tab", "LF"],
            "スタックの、<数値>番目の要素を捨てます。",
            "<数値>",
          ],
        ],
      },
      {
        name: "Arithmetic",
        IMP: ["Tab", "WS"],
        discription:
          "数値の計算をするコマンド群です。スタックの2番目に積んだ要素が演算子の左に、1番目に積んだ要素が演算子の右にあるものとして計算します。例えば、[a, b]の順に数値をスタックに積んだ後、Subtractコマンドを実行するとスタックに a - b の値が積まれます。",
        commands: [
          ["Add", ["WS", "WS"], "加算"],
          ["Subtract", ["WS", "Tab"], "減算"],
          ["Multiply", ["Tab", "LF"], "乗算"],
          ["Divide", ["Tab", "WS"], "整数での除算"],
          ["Modulo", ["Tab", "Tab"], "剰余"],
          [
            "KaladeshArithmetic",
            ["LF"],
            "コンピューターが耐えきれない位に本当にすごい演算",
          ],
        ],
      },
      {
        name: "Heap",
        IMP: ["Tab", "Tab"],
        discription:
          "ヒープを操作するためのコマンド群です。Storeコマンドを使用するためには、[ヒープのキーとなる数値、ヒープに積みたい値] の順に数値をスタックに積み、Storeコマンドを呼び出します。Retrieveコマンドを使用するためには、ヒープのキーとなる数値をスタックに積み、Retrieveコマンドを呼び出します。",
        commands: [
          ["Store", ["WS"], "指定したデータをヒープの指定した位置に格納します。"],
          [
            "Retrieve",
            ["Tab"],
            "ヒープの指定した位置から数値を読み込みスタックに積みます。",
          ],
        ],
      },
      {
        name: "Flow Control",
        IMP: ["LF"],
        discription:
          "制御フローに関するコマンド群です。Labelコマンドのみコンパイル時に処理されます。(Labelコマンドより先にCallやJumpコマンドを使用することができます。)",
        commands: [
          [
            "Label",
            ["WS", "WS"],
            "この位置を <ラベル>としてマークします。",
            "<ラベル>",
          ],
          [
            "Call",
            ["WS", "Tab"],
            "<ラベル> をサブルーチンとして呼び出します。(Return と組み合わせて使用します。)",
            "<ラベル>",
          ],
          ["Jump", ["WS", "LF"], "<ラベル> の位置に実行を移します。"],
          [
            "JumpIfZero",
            ["Tab", "WS"],
            "スタックから要素を1つ取り出し、それが0であるなら<ラベル> の位置に実行を移します。",
            "<ラベル>",
          ],
          [
            "JumpIfNegative",
            ["Tab", "Tab"],
            "スタックから要素を1つ取り出し、それが負の値であるなら<ラベル> の位置に実行を移します。",
            "<ラベル>",
          ],
          [
            "Return",
            ["Tab", "LF"],
            "現在のサブルーチンを終了し、呼び出し元に制御を戻します。(Call と組み合わせて使用します。)",
          ],
          ["End", ["LF", "LF"], "プログラムの実行を即座に終了します。"],
        ],
      },
      {
        name: "IO",
        IMP: ["Tab", "LF"],
        discription: "入出力に関するコマンド群です。",
        commands: [
          [
            "OutputCharacter",
            ["WS", "WS"],
            "スタックから要素を1つ文字コードとして取り出し、その文字を表示します。",
          ],
          [
            "OutputNumber",
            ["WS", "Tab"],
            "スタックから要素を1つ取り出し、それを数値として表示します。",
          ],
          ["InputCharacter", ["Tab", "WS"], "未実装。"],
          ["InputNumber", ["Tab", "Tab"], "未実装。"],
        ],
      },
    ];

  const transpile = function (v: "WS" | "Tab" | "LF") {
    switch (v) {
      case "WS":
        return "[すごい!]";
      case "Tab":
        return "[カラデシュ!]";
      case "LF":
        return "[本当にすごいんだ!]";
      default:
        const _c: never = v;
        break;
    }
  };

  const css = `
      table {
        border-collapse: collapse;
      }
      td {
        border: 2px solid black
      }
      th {
        border: 2px solid black
      }
      td {
        padding: 5px;
        background-color: #EEEEEE;
      }
      hr {
        margin-top: 20px;
        margin-bottom: 20px;
      }
    `;

  return (
    <div>
      <Head>
        <title>カラデシュ言語のヘルプ</title>
        <meta name="description" content="カラデシュ言語のヘルプ" />
        <link
          rel="icon"
          href={process.env.NEXT_PUBLIC_ASSET_PREFIX + "/favicon.ico"}
        />
        <style>{css}</style>
      </Head>
      <CustomBar />
      <div style={{ padding: "10px" }}>
        <h1>Help</h1>
        <p>
          この言語で認められるトークンは、「すごい!」「カラデシュ!」「本当にすごいんだ!」のいずれかのみです。それ以外の文字(改行なども含む)はコメント扱いとなり、実行結果には何の影響も及ぼしません。
        </p>
        <p>
          この言語では、以下に示すコマンドの羅列を一つずつ実行していく形態をとります。コマンドを書くには、まずそのコマンドに対応したIMP(Instruction
          Modification Parameter)を記述し、その後にコマンドを記述してください。
          <br />
          例えば、Dupコマンドの記述: すごい!本当にすごいんだ!すごい!
        </p>
        <p>
          また、実行時にはスタック、及びヒープ領域が空の状態で用意されます。これを元にして処理を実行します。
          <br />
          但し、この言語は整数しか扱うことが出来ず、従ってスタックやヒープに積むことができるのも整数のみです。
        </p>
        <p>
          いくつかのコマンドは引数を要求します。引数はコマンドに続けて記述しなければなりません。引数には&lt;数値&gt;&lt;ラベル&gt;の2種類が存在します。
        </p>
        <p>
          &lt;数値&gt;引数は、2進数で記述されます。最初に符号が記述されます([すごい!]=正,[カラデシュ!]=負)。その次からは、[すごい!]と[カラデシュ!]を並べます。この時、[すごい!]はその桁が0ビットであることを表し、[カラデシュ!]は1であることを表します。最後に、[本当にすごいんだ!]を記述して終了しなければなりません。
          <br />
          例えば、-5: カラデシュ!カラデシュ!すごい!カラデシュ!本当にすごいんだ!
        </p>
        <p>
          &lt;ラベル&gt;引数は、単に[すごい!]と[カラデシュ!]の羅列です。最後に、[本当にすごいんだ!]を記述して終了しなければなりません。
          <br />
          例えば: すごい!カラデシュ!すごい!カラデシュ!本当にすごいんだ! など
        </p>
        <p>
          Labelコマンドで宣言するラベルはそれぞれ異なる列でなければなりません。また、Labelコマンド以外のコマンドで存在しないラベルを指定した場合にはコンパイルエラーとなります。
        </p>
        <p>
          ※<b>アヴィシュカーモード</b>では、「カラデシュ!」の代わりに「アヴィシュカー!」を使用します。
        </p>
        {helpArray.map((elm, index) => (
          <div key={index}>
            <h2>{`${elm.name} (IMP:${elm.IMP.map(transpile).reduce(
              (a, b) => a + b,
              ""
            )})`}</h2>
            <p>{elm.discription}</p>
            <table>
              <thead>
                <tr>
                  <th>名前</th>
                  <th>コマンド</th>
                  <th>引数</th>
                  <th>説明</th>
                </tr>
              </thead>
              <tbody>
                {elm.commands.map((cmd, index2) => (
                  <tr key={index.toString() + "-" + index2.toString()}>
                    <td>{cmd[0]}</td>
                    <td>{cmd[1].map(transpile)}</td>
                    <td>{cmd[3] == undefined ? "-" : cmd[3]}</td>
                    <td>{cmd[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}

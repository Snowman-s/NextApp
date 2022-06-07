import Head from "next/head";
import { List } from "@material-ui/core";
import { Words } from "src/others/words/Words";
import a from "src/others/games/bullet-hell/works/a";

export default function Home() {
  let words = Words();

  let toArray = function <T>(what: IterableIterator<T>): T[] {
    let ret: T[] = [];
    for (let i = what.next(); !i.done; i = what.next()) {
      ret.push(i.value);
    }
    return ret;
  };

  let compareAsString = function <T>(func: (arg: T) => string) {
    return (a: T, b: T) => {
      let newA = func(a);
      let newB = func(b);
      return newA > newB ? 1 : newA == newB ? 0 : -1;
    };
  };

  return (
    <div>
      <Head>
        <title>用語集</title>
        <meta name="description" content="私のルーツやらコアやら" />
        <link
          rel="icon"
          href={process.env.NEXT_PUBLIC_ASSET_PREFIX + "/favicon.ico"}
        />
      </Head>
      <div style={{ padding: "10px" }}>
        <h1>用語集</h1>
        <p>私のルーツやコアや趣味など</p>
        <List>
          {toArray(words.entries())
            .sort(compareAsString((wordSet) => wordSet[0]))
            .map((word) => (
              <li key={word[0] + "li"}>
                <h1 key={word[0] + "h1"}>{word[0] + "："}</h1>
                <hr key={word[0] + "hr"} />
                {toArray(word[1].values())
                  .sort(compareAsString((word) => word.howread))
                  .map((item) => (
                    <div key={item.name}>
                      <h3>{`${item.name} - ${item.howread}`}</h3>
                      {item.describe}
                      <hr key={word[1] + "hr"} />
                    </div>
                  ))}
              </li>
            ))}
        </List>
      </div>
    </div>
  );
}

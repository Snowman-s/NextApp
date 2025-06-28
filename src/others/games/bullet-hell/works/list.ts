import { BulletP5 } from "../BulletP5";
import a from "./base/a";
import b from "./base/b";
import c from "./base/c";
import d from "./base/d";
import e from "./base/e";
import f from "./base/f";
import a2 from "./lasers/a";
import b2 from "./lasers/b";
import c2 from "./lasers/c";
import d2 from "./lasers/d";
import e2 from "./lasers/e";
import f2 from "./lasers/f";
import a3 from "./mirror/a";
import b3 from "./mirror/b";
import c3 from "./mirror/c";

export default function getWorksList() {
  var insertingTab: { data: { work: (p: BulletP5) => void; name: string }[], tabName: string } | null = null;
  var tabs: { data: { work: (p: BulletP5) => void; name: string }[], tabName: string }[] = [];

  const newTab = function (tabName: string) {
    insertingTab = { tabName, data: [] };
    tabs.push(insertingTab);
  }
  const addMap = function (
    work: (p: BulletP5) => void,
    name?: string
  ) {
    insertingTab!.data.push({ work, name: name! });
  };

  newTab("基本セット");
  addMap(a, "斥力");
  addMap(b, "花火の打ち上げ");
  addMap(c, "押し寄せる双葉");
  addMap(d, "一人相撲");
  addMap(e, "銀河系");
  addMap(f, "死霊の散歩");

  newTab("レーザー集");
  addMap(c2, "信仰心");
  addMap(a2, "身から出る錆");
  addMap(b2, "モーセの奇跡");
  addMap(d2, "流星のレクイエム");
  addMap(e2, "川流しの花");
  addMap(f2, "慈悲の圧迫");

  newTab("鏡術");
  addMap(a3, "反鏡飛翔法");
  addMap(b3, "鏡鳴転身");
  addMap(c3, "端の鏡界線");

  return tabs;
}

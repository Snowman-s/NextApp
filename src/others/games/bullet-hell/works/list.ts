import { BulletP5 } from "../BulletP5";
import a from "./a";
import b from "./b";
import c from "./c";
import d from "./d";
import e from "./e";
import f from "./f";
import a2 from "./a2";
import b2 from "./b2";
import c2 from "./c2";

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
    insertingTab.data.push({ work, name });
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

  return tabs;
}

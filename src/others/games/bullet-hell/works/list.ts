import { BulletP5 } from "../BulletP5";
import a from "./a";
import b from "./b";
import c from "./c";
import d from "./d";

export default function getWorksList() {
  var map = new Map<string, { work: (p: BulletP5) => void; name: string }>();

  const addMap = function (
    id: string,
    work: (p: BulletP5) => void,
    name?: string
  ) {
    map.set(id, { work: work, name: name == undefined ? id : name });
  };

  addMap("a", a, "斥力");
  addMap("b", b, "花火の打ち上げ");
  addMap("c", c, "押し寄せる双葉");
  addMap("d", d, "一人相撲");

  return map;
}

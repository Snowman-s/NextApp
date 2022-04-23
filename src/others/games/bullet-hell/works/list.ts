import { BulletP5 } from "../BulletP5";
import a from "./a";
import b from "./b";
import c from "./c";

export default function getWorksList() {
  var map = new Map<string, (p: BulletP5) => void>();

  map.set("a", a);
  map.set("b", b);
  map.set("c", c);

  return map;
}

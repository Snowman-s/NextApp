import { BulletP5 } from "../BulletP5";
import a from "./a";

export default function getWorksList() {
  var map = new Map<string, (p: BulletP5) => void>();

  map.set("a", a);

  return map;
}

import { BulletP5 } from "../BulletP5";
import b1 from "./b1";

export default function getWorksList() {
  var map = new Map<string, (p: BulletP5) => void>();

  map.set("b1", b1);

  return map;
}

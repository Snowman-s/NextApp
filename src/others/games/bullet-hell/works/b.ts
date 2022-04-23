import { BulletP5 } from "../BulletP5";
import setup from "../setup";

export default function b(p: BulletP5) {
  setup(p, 15);

  p.shoot = () => {
    let f = p.spentSeconds();

    p.freq(30, () => {
      let x = 100 + p.random(200);
      let y = 100 + p.random(100);

      let i = p.random(p.TAU);
      for (let s = 2.5; s < 2.5 + f / 2; s += 0.5) {
        p.allWay(x, y, 10, s, 10, i);
      }
    });
  };
}

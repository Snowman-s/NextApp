import { BulletP5 } from "../../BulletP5";
import setup from "../../setup";

export default function (p: BulletP5) {
  setup(p, 20);

  p.shoot = () => {
    let f = p.frameCount;

    let freq = p.remainSeconds() <= 5 ? 5 :
      p.remainSeconds() <= 10 ? 2 :
        p.remainSeconds() <= 15 ? 3 : 6

    p.freq(freq, () => {
      let x = 1200 * (p.sin(f / 30) + 1) % 400

      if (5 < p.remainSeconds()) {
        p.allWay(x, 200, 10, 5, 3, f / 60);
      } else {
        p.allWay(x, 200, 10, 5, 6, f / 60);
        p.allWay(x, 200, 7, 4, 6, f / 60);
        p.allWay(x, 200, 5, 3, 6, f / 60);
      }
    })
  };
}

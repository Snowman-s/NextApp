import { BulletP5, Laser } from "../../BulletP5";
import setup from "../../setup";

export default function (p: BulletP5) {
  setup(p, 15);

  p.shoot = () => {
    p.freq(30, () => {
      let lasers: Laser[] = []
      let s = p.spentSeconds();
      for (let i = 0; i < s * 3; i++) {
        lasers.push(p.createLaser(200, 200, i / s / 3 * p.TAU + p.frameCount, 3, 5, 0))
      }
      let f = p.frameCount;
      p.registerRoutine(lasers, l => { l.length = p.min(200, (p.frameCount - f) * 3); });
    })
  };
}

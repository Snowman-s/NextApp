import { BulletP5 } from "../../BulletP5";
import setup from "../../setup";

export default function c(p: BulletP5) {
  setup(p, 15);

  p.shoot = () => {
    p.freq(30, () => {
      let iStart = p.frameCount * 1.7;
      for (
        let i = iStart;
        i < p.TAU + iStart;
        i += p.PI / (1 + p.spentSeconds() * 2.5)
      ) {
        let s = (1.1 + p.cos(i * 2 + p.frameCount / 57)) * 4;

        p.createBullet(200, 100, s * p.cos(i), s * p.sin(i), 20,);
      }
    });
  };
}

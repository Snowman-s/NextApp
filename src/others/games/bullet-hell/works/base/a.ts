import { BulletP5 } from "../../BulletP5";
import setup from "../../setup";

export default function a(p: BulletP5) {
  setup(p, 15);

  p.shoot = () => {
    let f = p.frameCount;

    p.allWay(200, 200, 10, 10, 10, p.sin(f / 60) / 2);

    if (p.remainSeconds() < 10) {
      p.freq(3, () => p.nWay(200, 200, 8, 5, 10, f / 5, 0.03));
    }
  };
}

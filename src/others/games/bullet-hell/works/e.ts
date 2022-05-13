import { BulletP5 } from "../BulletP5";
import setup from "../setup";

export default function e(p: BulletP5) {
  setup(p, 15);

  p.shoot = () => {
    p.freq(30, () => {
      p.registerRoutine(
        p.allWay(200, 200, 10, 2, p.int(p.spentSeconds() * 1.2 + 3), 0),
        (b) => {
          b.speedX += (p.player.x - 200) / 3000;
          b.speedY += (p.player.y - 200) / 3000;
        }
      );
    });
  };
}

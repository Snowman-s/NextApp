import { BulletP5 } from "../../BulletP5";
import setup from "../../setup";

export default function c(p: BulletP5) {
  setup(p, 16);

  p.shoot = () => {
    p.freq(5, () => {
      p.allWay(
        200,
        300,
        20,
        3,
        30,
        p.frameCount,
        (15 - p.frameCount / 60) * 20 + 150
      );
    });
    p.freq(70, () =>
      p.allWay(
        p.player.x,
        p.player.y,
        10,
        -5,
        p.int(p.spentSeconds() / 7) * 2 + 2,
        p.random(p.TAU),
        200
      )
    );
  };
}

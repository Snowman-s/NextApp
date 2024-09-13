import { BulletP5, Laser } from "../../BulletP5";
import setup from "../../setup";

export default function (p: BulletP5) {
  let laser: Laser | null = null;

  setup(p, 15);

  p.shoot = () => {
    let f = p.frameCount;

    if (p.frameCount == 1) {
      p.allWay(200, 300, 20, .2, 50, 0, 0);
      p.registerRoutine([laser = p.createLaser(200, 300, 0, 0, 5, 1e3)], (b => b.angle += .01));
    };
    p.freq(40, () => {
      let n = 10 - p.remainSeconds() / 2 | 0;
      p.registerRoutine(
        p.allWay(p.player.x, p.player.y, 10, .3, n, f / 60, 120),
        (b => {
          if (laser != null && p.checkLaserHit(laser, b.x, b.y, b.size)) {
            p.createBullet(b.x, b.y, b.speedX, b.speedY, b.size / 2);
            p.kill(b);
          }
        })
      );
      p.registerRoutine(
        p.allWay(p.player.x, p.player.y, 10, .6, n, f / 60 + p.TAU / n / 2, 100),
        (b => {
          if (laser != null && p.checkLaserHit(laser, b.x, b.y, b.size)) {
            p.createBullet(b.x, b.y, b.speedX, b.speedY, b.size / 2);
            p.kill(b);
          }
        })
      );
    });
  };
}

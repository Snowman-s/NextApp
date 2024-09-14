import { Bullet, BulletP5, Laser } from "../../BulletP5";
import setup from "../../setup";

export default function (p: BulletP5) {
  setup(p, 15);

  p.shoot = () => {
    p.freq(60, () => {
      let lasers: (Laser & { seed: number })[] = []
      let x = p.frameCount * 5 % 400;
      for (let i = 0; i < p.TAU; i += p.TAU / 3) {
        let laser = p.createLaser(x, 0, i, 0, 3, 0);
        let laser2 = Object.assign(laser, { seed: p.frameCount })
        lasers.push(laser2);
      }
      p.registerRoutine(lasers, l => {
        l.y += 3;
        l.angle += 0.01;
        l.length = p.frameCount / 2 * p.sin(p.frameCount / 60 + l.seed);
      });
    })
    p.freq(30, () => {
      let x = p.frameCount ** 2 % 400;
      let bullet = p.createBullet(x, 0, 0, 3, 20);
      const lockFrameCount = p.frameCount;
      p.registerRoutine([bullet], l => {
        l.x += p.cos(p.frameCount / 30 + lockFrameCount) / 3;
      });
    })
  };
}

import { BulletP5, Laser } from "../../BulletP5";
import setup from "../../setup";

export default function (p: BulletP5) {
  setup(p, 15);

  p.shoot = () => {
    if (p.frameCount == 1) {
      let lasers: Laser[] = []
      for (let y = 0; y <= 600; y += 20) {
        lasers.push(p.createLaser(0, y, 0, 0, 20, 0));
        lasers.push(p.createLaser(400, y, 0, 0, 20, 0));
      }
      p.registerRoutine(lasers, (laser) => {
        laser.length = p.frameCount / 2 * p.sin((laser.x == 400 ? 0 : p.PI / 2) + (laser.y / 9 + p.frameCount) / 30);
      });
    };

    p.freq(30, () => {
      let delta = 600 / (p.spentSeconds() / 2 + 6)
      for (let x = -p.random(delta); x <= 400; x += delta) {
        p.createBullet(x, 0, 0, 3, 7);
      }
    });
  };
}

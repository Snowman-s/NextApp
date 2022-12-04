import { Bullet, BulletP5 } from "../BulletP5";
import setup from "../setup";

export default function f(p: BulletP5) {
  setup(p, 15);

  p.shoot = () => {
    p.freq(p.remainSeconds() < 6 ? 3 : 7, () => {
      let tempBullets: Bullet[] = [];

      for (let y = 0; y < 400; y += 99) {
        let x = (p.frameCount * 2 + y) % 400;
        let i = x / 30 + y;
        let newBullet = {
          x: x,
          y: y + 50 * p.cos(i),
          speedX: p.cos(i) / 2,
          speedY: p.sin(i) / 2,
          deleted: false,
          size: 10,
        };
        tempBullets.push(newBullet);
        p.bullets.push(newBullet);
      }

      p.registerRoutine(
        tempBullets,
        (b) => {
          b.speedX *= 5;
          b.speedY *= 5;
        },
        40,
        true
      );
    });
  };
}

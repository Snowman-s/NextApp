import { Bullet, BulletP5 } from "../../BulletP5";
import setup from "../../setup";

export default function f(p: BulletP5) {
  setup(p, 15);

  p.shoot = () => {
    p.freq(p.remainSeconds() < 6 ? 3 : 7, () => {
      let tempBullets: Bullet[] = [];

      for (let y = 0; y < 400; y += 99) {
        let x = (p.frameCount * 2 + y) % 400;
        let i = x / 30 + y;
        let newBullet = p.createBullet(
          x,
          y + 50 * p.cos(i),
          p.cos(i) / 2,
          p.sin(i) / 2,
          10,
        );
        tempBullets.push(newBullet);
      }

      p.registerRoutine(
        tempBullets,
        (b) => {
          b.speedX *= 5;
          b.speedY *= 5;
        },
        {
          spaceFrame: 40,
          onlyOnce: true
        }
      );
    });
  };
}

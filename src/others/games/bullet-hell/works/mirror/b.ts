import { Bullet, BulletImg, BulletP5 } from "../../BulletP5";
import setup from "../../setup";

export default function (p: BulletP5) {
  setup(p, 15);

  let origin: Bullet;

  p.shoot = () => {
    let f = p.frameCount;
    if (p.frameCount == 1) {
      origin = p.createBullet(200, 200, 0, 0, 20);
    }

    if (origin.x < 0 || 400 < origin.x) {
      origin.x = 400 - origin.x
    } else if (origin.y < 0 || 600 < origin.y) {
      origin.y = 600 - origin.y
    }

    p.freq(15, () => {
      let n = p.remainSeconds() <= 5 ? 4 :
        p.remainSeconds() <= 10 ? 2 : 1
      let bullets = p.allWay(origin.x, origin.y, 10, 3, n, f / 60);
      p.registerRoutine(bullets, (bullet) => {
        if (bullet.x < 0 || 400 < bullet.x) {
          p.createBullet(400 - bullet.x, bullet.y, bullet.speedX, bullet.speedY, bullet.size, "Black")
          p.kill(bullet);
        } else if (bullet.y < 0 || 600 < bullet.y) {
          p.createBullet(bullet.x, 600 - bullet.y, bullet.speedX, bullet.speedY, bullet.size, "Black")
          p.kill(bullet);
        }
      })
    })

    p.freq(60, () => {
      origin.speedX = p.random() * 4 - 2
      origin.speedY = p.random() * 4 - 2
    })
  };
}

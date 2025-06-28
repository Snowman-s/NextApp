import { Bullet, BulletP5 } from "../../BulletP5";
import setup from "../../setup";

export default function (p: BulletP5) {
  setup(p, 15);

  p.shoot = () => {
    p.freq(5 * 60, () => {
      let bullets: Bullet[] = []
      let n = (15 - p.remainSeconds()) / 15 * 16 + 8
      for (let i = 0; i < n; i++) {
        let I = i / n * p.TAU
        let r = 3 / p.max(p.abs(p.cos(I + p.frameCount)), p.abs(p.sin(I + p.frameCount)))
        const bullet = p.createBullet(200, 300, r * p.cos(I), r * p.sin(I), 20)

        bullets.push(bullet)
      }

      p.registerRoutine(bullets, (bullet) => {
        if (bullet.x < 0 || 400 < bullet.x) {
          bullet.speedX = -bullet.speedX
        } else if (bullet.y < 0 || 600 < bullet.y) {
          bullet.speedY = -bullet.speedY
        }
      })
    })
  };
}

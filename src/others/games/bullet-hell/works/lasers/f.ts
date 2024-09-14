import { Bullet, BulletP5, Laser } from "../../BulletP5";
import setup from "../../setup";

export default function (p: BulletP5) {
  setup(p, 15);

  p.shoot = () => {
    p.freq(200, () => {
      let laser = p.createLaser(0, 300, p.PI / 2, 0, 5, 600);
      p.registerRoutine([laser], l => l.x++)
      if (5 <= p.remainSeconds()) p.registerRoutine([laser], l => {
        p.nWay(l.x, l.y, 10, 3, 10, 0, p.PI / 10)
        for (let t = 0; t < 600; t += 60) {
          p.createBullet(l.x, t, 1, 0, 20);
        }
        p.kill(l);
      }, { waitFrame: 60 })
      laser = p.createLaser(400, 300, p.PI / 2, 0, 5, 600);
      p.registerRoutine([laser], l => l.x--)
      if (5 <= p.remainSeconds()) p.registerRoutine([laser], l => {
        p.nWay(l.x, l.y, 10, 3, 10, -p.PI, p.PI / 10)
        for (let t = 0; t < 600; t += 60) {
          p.createBullet(l.x, t, -1, 0, 20);
        }
        p.kill(l);
      }, { waitFrame: 60 })
      if (p.remainSeconds() <= 8) {
        laser = p.createLaser(200, 0, 0, 0, 5, 600);
        p.registerRoutine([laser], l => l.y++)
        if (5 <= p.remainSeconds()) p.registerRoutine([laser], l => {
          p.nWay(l.x, l.y, 10, 3, 10, p.PI / 2, p.PI / 10)
          for (let t = 0; t < 600; t += 60) {
            p.createBullet(t, l.y, 0, 1, 20);
          }
          p.kill(l);
        }, { waitFrame: 60 })
        laser = p.createLaser(200, 600, 0, 0, 5, 600);
        p.registerRoutine([laser], l => l.y--)
        if (5 <= p.remainSeconds()) p.registerRoutine([laser], l => {
          p.nWay(l.x, l.y, 10, 3, 10, -p.PI / 2, p.PI / 10)
          for (let t = 0; t < 600; t += 60) {
            p.createBullet(t, l.y, 0, -1, 20);
          }
          p.kill(l);
        }, { waitFrame: 60 })
      }
    })
  };
}

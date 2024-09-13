import { BulletP5, Laser } from "../../BulletP5";
import setup from "../../setup";

export default function (p: BulletP5) {
  setup(p, 15);

  let parentSpeed = -6
  let sinAngle = p.sin(-p.PI / 2 + p.PI / 6)
  let parentTouchDownFrame = 600 / (parentSpeed * sinAngle)

  p.shoot = () => {
    p.freq(60, () => {
      let s = p.int(p.frameCount / 60) % 2;
      let lasers: (Laser & {
        child: Laser;
      })[] = [];
      let xspace = 6 < p.remainSeconds() && p.remainSeconds() < 10 ? 100 : 200
      for (let x = -500 - p.frameCount % 100; x < 900; x += xspace) {
        let angle = -p.PI / 2 + (p.PI / 6 * (s == 0 ? 1 : -1));
        let laser = p.createLaser(x, 0, angle, parentSpeed, 3, 100, true);
        let hasChildLaser = Object.assign(laser, { child: p.createLaser(x, 0, angle, parentSpeed, 3, 0, true) });
        lasers.push(hasChildLaser);
        if (p.remainSeconds() < 6) {
          let angle = p.PI / 2 + (p.PI / 6 * (s == 0 ? 1 : -1));
          let laser = p.createLaser(x, 600, angle, parentSpeed, 3, 100, true);
          let hasChildLaser = Object.assign(laser, { child: p.createLaser(x, 600, angle, parentSpeed, 3, 0, true) });
          lasers.push(hasChildLaser);
        }
      }
      p.registerRoutine(lasers, l => {
        l.child.speed = parentSpeed;
        l.child.length = 100;
        l.child.angle = -l.angle
      }, { waitFrame: parentTouchDownFrame, onlyOnce: true });
    })
  };
}

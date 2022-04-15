import { BulletP5 } from "../BulletP5";
import setup from "../setup";

export default function b1(p: BulletP5) {
  setup(p, 200);

  p.shoot = () => {
    for (let i = 0; i < p.TAU; i += p.PI / 5) {
      p.bullets.push({
        x: 200,
        y: 200,
        speedX: 9 * p.cos(i),
        speedY: 9 * p.sin(i),
        size: 10,
      });
    }
  };
}

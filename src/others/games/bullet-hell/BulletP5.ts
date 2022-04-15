import p5 from "p5";

export class BulletP5Props {
  code: (p5: BulletP5) => void;
}

export class BulletP5 extends p5 {
  shoot?: () => void;
  bullets?: {
    x: number;
    y: number;
    speedX: number;
    speedY: number;
    size: number;
  }[];
}

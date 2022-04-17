import p5 from "p5";

export type Bullet = {
  x: number;
  y: number;
  speedX: number;
  speedY: number;
  size: number;
};

export class BulletP5Props {
  code: (p5: BulletP5) => void;
}

export class BulletP5 extends p5 {
  shoot?: () => void;
  bullets?: Bullet[];
  remainSeconds?: () => number;
  nWay?: (
    x: number,
    y: number,
    size: number,
    speed: number,
    N: number,
    middleAngle: number,
    spaceAngle: number,
    addToBulletsList?: boolean
  ) => Bullet[];
  allWay?: (
    x: number,
    y: number,
    size: number,
    speed: number,
    N: number,
    firstAngle: number,
    addToBulletsList?: boolean
  ) => Bullet[];
  freq?: (spaceFrame: number, func: () => void) => void;
}

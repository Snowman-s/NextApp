import p5 from "p5";

export type Bullet = {
  x: number;
  y: number;
  speedX: number;
  speedY: number;
  size: number;
  deleted: boolean;

  type: "Bullet";
};

export type Laser = {
  x: number;
  y: number;
  angle: number;
  speed: number;
  width: number;
  length: number;
  deleted: boolean;

  type: "Laser";
}

export type BulletKind = Bullet | Laser;

export class BulletP5Props {
  code: (p5: BulletP5) => void;
}

export class BulletP5 extends p5 {
  shoot?: () => void;
  bullets?: Bullet[];
  lasers?: Laser[];
  remainSeconds?: () => number;
  spentSeconds?: () => number;
  player?: { x: number; y: number };
  createBullet?: (
    x: number,
    y: number,
    speedX: number,
    speedY: number,
    size: number
  ) => Bullet;
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
    startRadius?: number,
    addToBulletsList?: boolean
  ) => Bullet[];
  createLaser?: (
    x: number,
    y: number,
    angle: number,
    speed: number,
    width: number,
    length: number,
  ) => Laser;
  checkLaserHit?: (
    l: Laser,
    targetX: number,
    targetY: number,
    targetSize: number,
  ) => boolean;
  freq?: (spaceFrame: number, func: () => void) => void;
  kill?: (o: BulletKind) => void;
  registerRoutine?: <T extends BulletKind>(
    bullets: T[],
    func: (b: T) => void,
    spaceFrame?: number,
    onlyOnce?: boolean
  ) => void;
}

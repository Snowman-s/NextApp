import p5 from "p5";

export type BulletImg = "White" | "Black";

export type Bullet = {
  x: number;
  y: number;
  speedX: number;
  speedY: number;
  size: number;
  deleted: boolean;
  img: BulletImg;

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

  /**
   * 指定したポジションからLengthだけ伸びるならtrue, 中央から両方に伸びるならFalse。
   */
  justStartFromX: boolean,

  type: "Laser";
}

export type BulletKind = Bullet | Laser;

export type BulletP5Props = {
  code: (p5: BulletP5) => void;
}

export class BulletP5MaybeUninitilized extends p5 {
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
    size: number,
    img?: BulletImg
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
    justStartFromX?: boolean,
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
    extraArg?: {
      waitFrame?: number,
      spaceFrame?: number,
      onlyOnce?: boolean
    }
  ) => void;
}

export type BulletP5 = Required<InstanceType<typeof BulletP5MaybeUninitilized>>;

import p5 from "p5";
import { Bullet, BulletKind, BulletP5, Laser } from "./BulletP5";

export default function setup(p: BulletP5, limitSeconds = 10) {
  let canvas: p5.Renderer;

  const speed = 5;
  const playerSize = 9;
  const dashCooldownFrame = 60;
  const dashContinueFrame = 10;

  let keys: {
    u: boolean;
    d: boolean;
    l: boolean;
    r: boolean;
    z: boolean;
    capture: boolean;
    e: boolean;
  };

  let death = false;
  let frameByDeath = -1;
  let frameByDash = -1;

  let maxTime = limitSeconds * 60;
  let remainTime = limitSeconds * 60;

  let dashUsed = false;

  let stgWidth = 400;

  p.bullets = [];

  p.setup = function () {
    canvas = p.createCanvas(600, 600);
    p.rectMode(p.CENTER);
    init();
  };

  p.draw = () => {
    p.background(0);

    if (!gameOver()) p.shoot();

    checkDash();
    movePlayer();
    processRegisteredRoutine();
    moveBullets();
    hitCheck();
    deleteOutBullets();
    if (remainTime >= 0) remainTime--;
    if (remainTime == -1) {
      p.bullets = [];
      p.lasers = [];
    }
    renderPlayerBackgrounds();
    renderPlayer();
    renderBullets();

    renderTime();

    if (gameOver()) fadeOut();

    renderHowToPlay();

    if (keys.capture) {
      p.save("screen-shot.jpg");
      keys.capture = false;
    }
  };

  p.remainSeconds = () => {
    return p.int(remainTime / 60);
  };

  p.spentSeconds = () => {
    return p.int((maxTime - remainTime) / 60);
  };

  //ダミー
  p.shoot = () => {
  };

  p.checkLaserHit = (l, x, y, size) => {
    let dX = l.x - x;
    let dY = l.y - y;
    let c = p.cos(l.angle);
    let s = p.sin(l.angle);
    let deltaW = s * dX - c * dY;
    let deltaL = c * dX + s * dY;

    let willHitOnWidth = p.abs(deltaW) <= (l.width + size) / 2;
    let willHitOnLength = l.justStartFromX ? 0 <= -deltaL && -deltaL <= (l.length + size) : p.abs(deltaL) <= (l.length + size) / 2;
    return (willHitOnWidth && willHitOnLength);
  }

  function init() {
    p.bullets = [];
    p.lasers = [];
    p.player = { x: 200, y: 500 };
    p.frameCount = 0;

    keys = {
      u: false,
      d: false,
      l: false,
      r: false,
      z: false,
      capture: keys == undefined ? false : keys.capture,
      e: false,
    };

    death = false;
    frameByDeath = -1;

    dashUsed = false;

    remainTime = maxTime;
  }

  function checkDash() {
    if (frameByDash > -1) frameByDash--;

    if (frameByDash == -1) {
      if (keys.z) {
        dashUsed = true;
        frameByDash = dashCooldownFrame;
      }
    }
  }

  function isDashActive() {
    return frameByDash > dashCooldownFrame - dashContinueFrame;
  }

  function movePlayer() {
    var vec = { x: 0, y: 0 };
    if (keys.u) vec.y -= 1;
    if (keys.l) vec.x -= 1;
    if (keys.r) vec.x += 1;
    if (keys.d) vec.y += 1;
    if (vec.x != 0 && vec.y != 0) {
      vec.x /= p.sqrt(2);
      vec.y /= p.sqrt(2);
    }

    let actuallySpeed = speed * (isDashActive() ? 2 : 1);

    vec.x *= actuallySpeed;
    vec.y *= actuallySpeed;

    p.player.x += vec.x;
    p.player.y += vec.y;

    p.player.x = p.max(p.player.x, playerSize / 2);
    p.player.y = p.max(p.player.y, playerSize / 2);
    p.player.x = p.min(p.player.x, stgWidth - playerSize / 2);
    p.player.y = p.min(p.player.y, p.height - playerSize / 2);
  }

  function moveBullets() {
    p.bullets.forEach((b) => {
      b.x += b.speedX;
      b.y += b.speedY;
    });
    p.lasers.forEach((b) => {
      b.x += b.speed * p.cos(b.angle);
      b.y += b.speed * p.sin(b.angle);
    });
  }

  function renderPlayer() {
    if (death) return;

    p.push();
    p.noStroke();

    if (isDashActive()) p.fill(255, 255, 0);
    else p.fill(0, 255, 255);

    p.square(p.player.x, p.player.y, playerSize);
    p.pop();
  }

  function renderPlayerBackgrounds() {
    if (death) return;
    if (frameByDash < 0) return;

    p.push();
    p.stroke(0, 255, 255);
    p.noFill();

    p.arc(
      p.player.x,
      p.player.y,
      playerSize * 3,
      playerSize * 3,
      -p.PI / 2,
      -p.PI / 2 + (frameByDash / dashCooldownFrame) * p.TAU
    );

    p.pop();
  }

  function renderBullets() {
    p.push();
    p.noStroke();
    p.bullets.forEach((b) => {
      p.square(b.x, b.y, b.size);
    });
    p.lasers.forEach((l) => {
      p.push();
      p.translate(l.x, l.y);
      p.rotate(l.angle);
      if (l.justStartFromX) {
        p.rect(l.length / 2, 0, l.length, l.width);
      } else {
        p.rect(0, 0, l.length, l.width);
      }
      p.pop();
    });
    p.pop();
  }

  function renderTime() {
    p.push();
    p.fill(255);
    p.textSize(50);

    var remainTimeAsSecond = p.max(p.int(remainTime / 60), 0);

    p.text(p.str(remainTimeAsSecond), stgWidth - 80, 50);
    p.pop();
  }

  function hitCheck() {
    if (death) return;
    if (isDashActive()) return;

    p.bullets.forEach((b) => {
      if (p.dist(p.player.x, p.player.y, b.x, b.y) * 2 < playerSize + b.size) {
        death = true;
        frameByDeath = 0;
      }
    });
    p.lasers.forEach((l) => {
      if (p.checkLaserHit(l, p.player.x, p.player.y, playerSize)) {
        death = true;
        frameByDeath = 0;
      }
    });
  }

  p.keyPressed = () => {
    switch (p.keyCode) {
      case p.UP_ARROW:
        keys.u = true;
        break;
      case p.DOWN_ARROW:
        keys.d = true;
        break;
      case p.LEFT_ARROW:
        keys.l = true;
        break;
      case p.RIGHT_ARROW:
        keys.r = true;
        break;
      case p.ENTER:
        keys.e = true;
        break;
      case p.CONTROL:
        keys.capture = true;
        break;
      default:
        break;
    }
    switch (p.key) {
      case "z":
        keys.z = true;
    }
  };

  p.keyReleased = () => {
    switch (p.keyCode) {
      case p.UP_ARROW:
        keys.u = false;
        break;
      case p.DOWN_ARROW:
        keys.d = false;
        break;
      case p.LEFT_ARROW:
        keys.l = false;
        break;
      case p.RIGHT_ARROW:
        keys.r = false;
        break;
      case p.ENTER:
        keys.e = false;
        break;
      case p.CONTROL:
        keys.capture = false;
        break;
      default:
        break;
    }
    switch (p.key) {
      case "z":
        keys.z = false;
    }
  };

  p.kill = (bulletKind) => {
    switch (bulletKind.type) {
      case "Bullet":
        p.bullets = p.bullets.filter(b => b != bulletKind);
        bulletKind.deleted = true;
        return;
      case "Laser":
        p.lasers = p.lasers.filter(b => b != bulletKind);
        bulletKind.deleted = true;
        return;
    }
  }

  function deleteOutBullets() {
    p.bullets = p.bullets.filter((bullet) => {
      const tmp =
        -100 < bullet.x &&
        bullet.x < stgWidth + 100 &&
        -100 < bullet.y &&
        bullet.y < p.height + 100;
      bullet.deleted = !tmp;
      return tmp;
    });
  }

  function fadeOut() {
    frameByDeath++;
    p.background(0, (frameByDeath / 50) * 255);

    if (!death) {
      p.push();
      p.textSize(50);
      p.fill(255);
      p.text((dashUsed ? "" : "☆") + "Clear!", 0, p.height / 2);
      p.pop();
    }

    if (frameByDeath >= 70) {
      if (death) {
        init();
      } else {
        p.push();
        p.textSize(30);
        p.fill(255);
        p.text("Press Enter Key to restart.", 0, p.height / 2 + 30);
        p.pop();
        if (keys.e) {
          init();
        }
      }
    }
  }

  function renderHowToPlay() {
    p.push();
    p.rectMode(p.CORNER);
    p.stroke(255);
    p.fill(0);
    p.rect(stgWidth, 0, p.width - stgWidth, p.height);
    p.fill(255);
    p.textSize(30);
    p.text("How To Play", stgWidth, 30);
    p.textSize(15);
    p.text("↑↓→← : Move", stgWidth, 60);
    p.text("z : Dash", stgWidth, 90);
    p.text("Ctl : Capture Game Screen", stgWidth, 120);
    p.pop();
  }

  function gameOver() {
    return death || remainTime == -1;
  }

  p.createBullet = (x: number, y: number, speedX: number, speedY: number, size: number) => {
    const bullet: Bullet = {
      x,
      y,
      speedX,
      speedY,
      size,
      deleted: false,
      type: "Bullet"
    }
    p.bullets.push(bullet);
    return bullet;
  }

  p.createLaser = (x, y, angle, speed, width, length, justStartFromX = false) => {
    const laser: Laser = {
      x,
      y,
      angle,
      speed,
      width,
      length,
      deleted: false,
      justStartFromX,
      type: "Laser"
    }
    p.lasers.push(laser);
    return laser;
  }

  p.nWay = (
    x: number,
    y: number,
    size: number,
    speed: number,
    N: number,
    middleAngle: number,
    spaceAngle: number
  ) => {
    var bullets: Bullet[] = [];
    for (let i = 0; i < N; i++) {
      var angle = middleAngle + spaceAngle * (i - (N - 1) / 2);
      bullets.push(p.createBullet(
        x,
        y,
        speed * p.cos(angle),
        speed * p.sin(angle),
        size,
      ));
    }
    return bullets;
  };

  p.allWay = (x, y, size, speed, N, firstAngle, startRadius = 0) => {
    var bullets: Bullet[] = [];
    for (let i = 0; i < N; i++) {
      var angle = firstAngle + i * (p.TAU / N);
      var c = p.cos(angle);
      var s = p.sin(angle);
      bullets.push(p.createBullet(
        x + startRadius * c,
        y + startRadius * s,
        speed * c,
        speed * s,
        size,
      ));
    }

    return bullets;
  };

  p.freq = (spaceFrame: number, func: () => void) => {
    if ((p.frameCount - 1) % spaceFrame == 0) {
      func();
    }
  };

  let registeredRoutines: {
    bullets: BulletKind[];
    spaceFrame: number;
    countStartframe: number;
    onlyOnce: boolean;
    func: (b: BulletKind) => void;
  }[] = [];

  p.registerRoutine = <T extends BulletKind>(
    bullets: T[],
    func: (b: T) => void,
    {
      waitFrame = 0,
      spaceFrame = 1,
      onlyOnce = false
    } = {}
  ) => {
    registeredRoutines.push({
      bullets,
      spaceFrame,
      countStartframe: p.frameCount + waitFrame,
      onlyOnce,
      func,
    });
  };

  function processRegisteredRoutine() {
    const willBeRemoved = [];

    registeredRoutines
      .filter((info) => p.frameCount - info.countStartframe > info.spaceFrame)
      .forEach((info) => {
        info.bullets = info.bullets.filter((b) => !b.deleted);
        info.bullets.forEach((b) => info.func(b));

        info.countStartframe += info.spaceFrame;
        if (info.onlyOnce) willBeRemoved.push(info);
      });

    registeredRoutines = registeredRoutines.filter(
      (info) => info.bullets.length != 0 && willBeRemoved.indexOf(info) === -1
    );
  }
}

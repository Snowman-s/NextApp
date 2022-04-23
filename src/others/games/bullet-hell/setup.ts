import p5 from "p5";
import { Bullet, BulletP5 } from "./BulletP5";

export default function setup(p: BulletP5, limitSeconds = 10) {
  let canvas: p5.Renderer;

  const speed = 5;
  const playerSize = 9;

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
    moveBullets();
    hitCheck();
    deleteOutBullets();
    if (remainTime >= 0) remainTime--;
    if (remainTime == -1) p.bullets = [];
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
    if (p.frameCount % 30 != 0) return;
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

  function init() {
    p.bullets = [];
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
        frameByDash = 60;
      }
    }
  }

  function isDashActive() {
    return frameByDash > 50;
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

  function renderBullets() {
    p.push();
    p.bullets.forEach((b) => {
      p.noStroke();
      p.square(b.x, b.y, b.size);
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
    if (isDashActive()) return;

    p.bullets.forEach((b) => {
      if (p.dist(p.player.x, p.player.y, b.x, b.y) * 2 < playerSize + b.size) {
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

  function deleteOutBullets() {
    p.bullets = p.bullets.filter((bullet) => {
      return (
        -100 < bullet.x &&
        bullet.x < stgWidth + 100 &&
        -100 < bullet.y &&
        bullet.y < p.height + 100
      );
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

  p.nWay = (
    x: number,
    y: number,
    size: number,
    speed: number,
    N: number,
    middleAngle: number,
    spaceAngle: number,
    addToBulletsList = true
  ) => {
    var bullets: Bullet[] = [];
    for (let i = 0; i < N; i++) {
      var angle = middleAngle + spaceAngle * (i - (N - 1) / 2);
      bullets.push({
        x: x,
        y: y,
        size: size,
        speedX: speed * p.cos(angle),
        speedY: speed * p.sin(angle),
      });
    }

    if (addToBulletsList) p.bullets.push(...bullets);

    return bullets;
  };

  p.allWay = (
    x: number,
    y: number,
    size: number,
    speed: number,
    N: number,
    firstAngle: number,
    addToBulletsList = true
  ) => {
    var bullets: Bullet[] = [];
    for (let i = 0; i < N; i++) {
      var angle = firstAngle + i * (p.TAU / N);
      bullets.push({
        x: x,
        y: y,
        size: size,
        speedX: speed * p.cos(angle),
        speedY: speed * p.sin(angle),
      });
    }

    if (addToBulletsList) p.bullets.push(...bullets);

    return bullets;
  };

  p.freq = (spaceFrame: number, func: () => void) => {
    if (p.frameCount % spaceFrame == 0) {
      func();
    }
  };
}

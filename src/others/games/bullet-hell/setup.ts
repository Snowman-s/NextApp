import p5 from "p5";
import { BulletP5 } from "./BulletP5";

export default function setup(p: BulletP5, limitTime = 600) {
  let canvas: p5.Renderer;
  let player = { x: 0, y: 0 };

  const speed = 5;
  const playerSize = 9;

  let keys: {
    u: boolean;
    d: boolean;
    l: boolean;
    r: boolean;
  } = { u: false, d: false, l: false, r: false };

  let death = false;
  let frameByDeath = -1;

  let maxTime = limitTime;
  let remainTime = limitTime;

  p.bullets = [];

  p.setup = () => {
    canvas = p.createCanvas(400, 600);
    p.rectMode(p.CENTER);

    init();
  };

  p.draw = () => {
    p.background(0);

    if (!death) p.shoot();

    movePlayer();
    moveBullets();
    hitCheck();
    deleteOutBullets();
    renderPlayer();
    renderBullets();

    renderTime();

    if (death) fadeOut();
  };

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
    player = { x: 200, y: 500 };
    p.frameCount = 0;

    keys = { u: false, d: false, l: false, r: false };

    death = false;
    frameByDeath = -1;

    remainTime = maxTime;
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
    vec.x *= speed;
    vec.y *= speed;

    player.x += vec.x;
    player.y += vec.y;

    player.x = p.max(player.x, playerSize / 2);
    player.y = p.max(player.y, playerSize / 2);
    player.x = p.min(player.x, p.width - playerSize / 2);
    player.y = p.min(player.y, p.height - playerSize / 2);
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
    p.fill(255, 255, 0);
    p.square(player.x, player.y, playerSize);
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
    p.text(p.str(p.int(remainTime / 50)), p.width - 80, 50);
    p.pop();
  }

  function hitCheck() {
    p.bullets.forEach((b) => {
      if (p.dist(player.x, player.y, b.x, b.y) * 2 < playerSize + b.size) {
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
      default:
        break;
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
      default:
        break;
    }
  };

  function deleteOutBullets() {
    p.bullets = p.bullets.filter((bullet) => {
      return (
        -100 < bullet.x &&
        bullet.x < p.width + 100 &&
        -100 < bullet.y &&
        bullet.y < p.height + 100
      );
    });
  }

  function fadeOut() {
    frameByDeath++;
    p.background(0, (frameByDeath / 50) * 255);

    if (frameByDeath >= 70) {
      init();
    }
  }
}

import { CustomP5 } from "src/others/CustomP5";
import IRectCollision from "./IRectCollision";
import Stage from "./Stage";

export default class Step implements IRectCollision {
  private color = { r: 255, g: 255, b: 255, a: 255 };

  constructor(
    private x: number,
    private y: number,
    private speed: number,
    private width: number,
    private height: number
  ) {}

  getPosition() {
    return { x: this.x, y: this.y };
  }

  getSpeed() {
    return this.speed;
  }

  getLarge() {
    return { width: this.width, height: this.height };
  }

  setPosition(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  setLarge(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  setSpeed(speed: number) {
    this.speed = speed;
  }

  setColor(r: number, g: number, b: number, a: number) {
    this.color = { r: r, g: g, b: b, a: a };
  }

  //IRectCollision

  getCenterX(): number {
    return this.x;
  }

  getCenterY(): number {
    return this.y;
  }

  getWidth(): number {
    return this.width;
  }

  getHeight(): number {
    return this.height;
  }

  getColor() {
    return this.color;
  }

  update(p5: CustomP5) {
    let deltaSeconds = p5.deltaTime / 1000;

    this.x += deltaSeconds * this.speed;

    if (this.speed < 0) {
      let overflow = -(this.x - this.getLarge().width / 2);
      if (overflow > 0) {
        this.x += overflow;
        this.speed = -this.speed;
      }
    } else {
      //speed > 0
      let overflow = this.x + this.getLarge().width / 2 - Stage.stageSize;
      if (overflow > 0) {
        this.x -= overflow;
        this.speed = -this.speed;
      }
    }
  }

  render(p5: CustomP5) {
    p5.push();
    p5.noStroke();
    p5.fill(this.color.r, this.color.g, this.color.b, this.color.a);
    p5.rectMode(p5.CENTER);
    p5.rect(this.x, this.y, this.width, this.height);
    p5.pop();
  }
}

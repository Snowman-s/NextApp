import { CustomP5 } from "src/others/CustomP5";
import Stage from "./Stage";

export default class Light {
  constructor(private x: number, private y: number, private size: number) {}

  getPosition() {
    return { x: this.x, y: this.y };
  }

  getSize() {
    return this.size;
  }

  setPosition(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  setSize(size: number) {
    this.size = size;
  }

  update(p5: CustomP5) {}

  render(p5: CustomP5) {
    p5.push();
    p5.blendMode(p5.ADD);
    p5.fill(255, 10);
    p5.noStroke();
    for (let d = 0; d < this.size; d += this.size / 20) {
      p5.circle(this.x, this.y, d);
    }
    p5.pop();
  }
}

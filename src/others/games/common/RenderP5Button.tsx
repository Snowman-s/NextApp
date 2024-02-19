import { CustomP5 } from "../../CustomP5";
import AbstractP5Button from "./AbstractP5Button";

export default class RenderP5Button extends AbstractP5Button {
  protected isInBounds(x: number, y: number) {
    return (
      this.x < x &&
      x < this.x + this.width &&
      this.y < y &&
      y < this.y + this.height
    );
  }

  private x = 0;
  private y = 0;
  private width = 0;
  private height = 0;
  private fillColor: any = null;
  private strokeColor: any = null;

  private render: (button: RenderP5Button, p: CustomP5) => void = null;

  /**
   * (x,y)が原点に対応する座標系になります。
   */
  setRender(render: (button: RenderP5Button, p: CustomP5) => void) {
    this.render = render;
  }

  setGeometry(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  getGeometry() {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
    };
  }

  setStrokeColor(strokeColor: any) {
    this.strokeColor = strokeColor;
  }

  setFillColor(fillColor: any) {
    this.fillColor = fillColor;
  }

  draw(p: CustomP5) {
    p.push();
    p.fill(this.fillColor ?? p.color(0));
    p.stroke(this.strokeColor ?? p.color(0));
    p.rect(this.x, this.y, this.width, this.height);
    p.pop();

    p.push();
    p.translate(this.x, this.y);
    if (this.render == this.render) {
      this.render(this, p);
    }
    p.pop();
  }
}

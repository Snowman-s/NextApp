import { CustomP5 } from "../../CustomP5";
import AbstractP5Button from "./AbstractP5Button";
import P5Component from "./P5Component";

export default class TextP5Button extends AbstractP5Button {
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
  private text = "";
  private fillColor: any = null;
  private strokeColor: any = null;
  private textColor: any = null;

  setGeometry(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  setStrokeColor(strokeColor: any) {
    this.strokeColor = strokeColor;
  }

  setFillColor(fillColor: any) {
    this.fillColor = fillColor;
  }

  setTextColor(textColor: any) {
    this.textColor = textColor;
  }

  setText(text: string) {
    this.text = text;
  }

  draw(p: CustomP5) {
    //文字の大きさ調整
    const len = this.text
      .split("\n")
      .map((str) => str.length)
      .reduce((a, b) => p.max(a, b));
    const textSize = p.min(this.width / len, this.height);

    p.push();
    p.fill(this.fillColor ?? p.color(0));
    p.stroke(this.strokeColor ?? p.color(0));
    p.rect(this.x, this.y, this.width, this.height);
    p.noStroke();
    p.fill(this.textColor ?? p.color(0));
    p.textSize(textSize);
    p.textAlign(p.CENTER);
    p.text(this.text, this.x, this.y, this.width, this.height);
    p.pop();
  }
}

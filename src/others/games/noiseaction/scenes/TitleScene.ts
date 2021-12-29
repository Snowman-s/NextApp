import { CustomP5 } from "src/others/CustomP5";
import IScene from "./IScene";

export default class TitleScene implements IScene {
  private aspectRatio: number;

  init(p5: CustomP5): void {
    this.aspectRatio = p5.width / p5.height;
  }

  update(p5: CustomP5): void {}
  render(p5: CustomP5): void {
    p5.textAlign(p5.CENTER);
    p5.fill(255);
    p5.textSize(p5.min(p5.width / 5, p5.height / 2));
    p5.text("Noise", 0, 0, p5.width, p5.height / 2);
  }
}

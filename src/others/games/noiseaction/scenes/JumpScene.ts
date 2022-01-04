import { CustomP5 } from "src/others/CustomP5";
import Stage from "../jumpscene/Stage";
import IScene from "./IScene";

export default class JumpScene implements IScene {
  leftSideX = 0;
  upSideY = 0;
  stageRenderSize = 0;

  init(p5: CustomP5): void {
    Stage.getInstance().init(p5);
    this.onResized(p5);
  }

  update(p5: CustomP5): void {
    Stage.getInstance().update(p5);
  }

  render(p5: CustomP5): void {
    p5.push();
    p5.stroke(255);
    p5.fill(0);
    p5.square(this.leftSideX, this.upSideY, this.stageRenderSize);
    p5.pop();

    p5.push();
    p5.translate(this.leftSideX, this.upSideY);
    p5.scale(this.stageRenderSize / Stage.stageSize);
    Stage.getInstance().render(p5);
    p5.pop();
  }

  onResized(p5: CustomP5): void {
    this.stageRenderSize = p5.min(p5.width * 0.8, p5.height * 0.8);

    this.leftSideX = (p5.width - this.stageRenderSize) / 2;
    this.upSideY = (p5.height - this.stageRenderSize) / 2;
  }
}

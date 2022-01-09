import p5 from "p5";
import { CustomP5 } from "src/others/CustomP5";
import IRectCollision from "./IRectCollision";
import Player from "./Player";
import Step from "./Step";

export default class Stage {
  private constructor() {}

  private static readonly instance = new Stage();

  public static getInstance() {
    return this.instance;
  }

  /**
   * ステージに存在する各オブジェクトは、ステージの幅、高さがこの値であるものとして自分の位置を保持してください。
   */
  public static readonly stageSize = 500;

  private player: Player;
  private steps: Step[] = [];

  private lastStepCreateY: number;

  init(p5: CustomP5) {
    const stageSize = Stage.stageSize;

    let firstStepY = (stageSize / 5) * 4;

    this.player = new Player(
      stageSize / 2,
      (stageSize / 5) * 3,
      (stageSize / 50) * 3
    );
    this.player.setGravityAccel(stageSize);
    this.player.setMaxSpeedY((stageSize / 5) * 9);

    this.steps.splice(0);
    this.steps.push(new Step(stageSize / 2, firstStepY, 0, stageSize, 9));

    this.lastStepCreateY = firstStepY;

    this.createNewSteps(p5);
  }

  update(p5: CustomP5) {
    this.player.update(p5);
    this.steps.forEach((s) => {
      s.update(p5);
    });

    this.moveCamera(p5);
  }

  private moveCamera(p5: CustomP5) {
    let focusY = 250;
    let deltaY = focusY - this.player.getPosition().y;

    //カメラは上にしか動かないので
    if (deltaY > 0) {
      this.player.setPosition({
        x: this.player.getPosition().x,
        y: this.player.getPosition().y + deltaY,
      });
      this.steps.forEach((s) => {
        s.setPosition(s.getPosition().x, s.getPosition().y + deltaY);
      });

      this.steps = this.steps.filter((step) => {
        let topY = step.getCenterY() - step.getHeight() / 2;

        return topY < Stage.stageSize;
      });

      //動いた場合の足場を補完する
      this.lastStepCreateY += deltaY;
      this.createNewSteps(p5);
    }
  }

  private createNewSteps(p5: CustomP5) {
    for (
      let y = this.lastStepCreateY - Stage.stageSize / 3;
      y > -Stage.stageSize;
      y -= Stage.stageSize / 3
    ) {
      let stepWidth = Stage.stageSize * 0.05 + p5.random(Stage.stageSize * 0.8);
      let stepSpeed = p5.random(Stage.stageSize / 5);
      let newStep = new Step(
        stepWidth / 2 + p5.random(Stage.stageSize - stepWidth),
        y,
        stepSpeed,
        stepWidth,
        Stage.stageSize / 50
      );
      this.steps.push(newStep);

      this.lastStepCreateY = y;
    }

    //色を設定しよう
    this.steps.forEach((step) => {
      step.setColor(
        255,
        255,
        255,
        255 -
          (255 * p5.abs(Stage.stageSize / 2 - step.getCenterY())) /
            (Stage.stageSize / 2)
      );
    });
  }

  /**
   * 各x, yが"0～500"の部分に描画します。
   */
  render(p5: CustomP5) {
    this.player.render(p5);
    this.steps.forEach((s) => {
      s.render(p5);
    });
  }

  getAllCollision(): IRectCollision[] {
    return [...this.steps];
  }

  isGameover() {
    return this.player.getPosition().y > Stage.stageSize;
  }
}

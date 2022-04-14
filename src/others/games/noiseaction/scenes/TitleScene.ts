import { CustomP5 } from "src/others/CustomP5";
import NoiseEffect from "../../p5Components/NoiseEffect";
import P5Component from "../../p5Components/P5Component";
import P5Typography from "../../p5Components/P5Typography";
import IScene from "./IScene";
import JumpScene from "./JumpScene";
import SceneManager from "./SceneManager";
import RenderP5Button from "../../p5Components/RenderP5Button";

export default class TitleScene implements IScene {
  private title: P5Typography;
  private startButton: RenderP5Button;
  private noise: NoiseEffect;

  init(p5: CustomP5): void {
    this.onResized(p5);
  }

  private getComponents(): P5Component[] {
    return [this.title, this.startButton, this.noise];
  }

  update(p5: CustomP5): void {
    this.getComponents().forEach((c) => {
      c.update(p5);
    });
  }

  render(p5: CustomP5): void {
    this.getComponents().forEach((c) => {
      c.draw(p5);
    });
  }

  onResized(p5: CustomP5): void {
    this.title = new P5Typography();
    this.title.setText("Noise");
    this.title.setGeometry(0, 0, p5.width, p5.height / 2);
    this.title.setTextColor(255);

    this.startButton = new RenderP5Button();
    this.startButton.setStrokeColor(255);
    const size = p5.min(p5.width / 3, p5.height / 4);
    this.startButton.setGeometry(
      p5.width / 2 - size / 2,
      p5.height / 2,
      size,
      size
    );
    this.startButton.setRender((button, p5) => {
      const { x, y, width, height } = button.getGeometry();

      const widthMergin = width / 5;
      const heightMergin = height / 5;

      p5.noStroke();
      p5.fill(255);
      p5.triangle(
        widthMergin,
        heightMergin,
        width - widthMergin,
        height / 2,
        widthMergin,
        height - heightMergin
      );
    });
    this.startButton.setOnClick(() => {
      SceneManager.getInstance().reserveNextScene(new JumpScene());
    });

    this.noise = new NoiseEffect();
  }
}

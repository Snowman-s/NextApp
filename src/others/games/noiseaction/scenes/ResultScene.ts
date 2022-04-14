import { CustomP5 } from "src/others/CustomP5";
import P5Component from "../../p5Components/P5Component";
import P5Typography from "../../p5Components/P5Typography";
import IScene from "./IScene";
import JumpScene from "./JumpScene";
import SceneManager from "./SceneManager";
import TitleScene from "./TitleScene";
import RenderP5Button from "../../p5Components/RenderP5Button";

export default class ResultScene implements IScene {
  private title: P5Typography;
  private toTitleButton: RenderP5Button;
  private retryButton: RenderP5Button;

  init(p5: CustomP5): void {
    this.onResized(p5);
  }

  private getComponents(): P5Component[] {
    return [this.title, this.toTitleButton, this.retryButton];
  }

  update(p5: CustomP5): void {
    this.getComponents().forEach((c) => {
      c.update(p5);
    });
  }

  render(p5: CustomP5): void {
    p5.push();
    p5.fill(0, 100);
    p5.rect(0, 0, p5.width, p5.height);
    p5.pop();

    this.getComponents().forEach((c) => {
      c.draw(p5);
    });
  }

  onResized(p5: CustomP5): void {
    this.title = new P5Typography();
    this.title.setText("GameOver");
    this.title.setFillColor(p5.color(0, 0));
    this.title.setGeometry(0, 0, p5.width, p5.height / 2);
    this.title.setTextColor(255);

    this.retryButton = new RenderP5Button();
    this.retryButton.setStrokeColor(255);
    const toRetryButtonSize = p5.min(p5.width / 5, p5.height / 6);
    this.retryButton.setGeometry(
      (p5.width - toRetryButtonSize) / 2,
      p5.height / 2,
      toRetryButtonSize,
      toRetryButtonSize
    );
    this.retryButton.setRender((button, p5) => {
      const { x, y, width, height } = button.getGeometry();

      p5.fill(255);
      p5.noStroke();
      p5.arc(
        width / 2,
        height / 2,
        width * 0.8,
        height * 0.8,
        -p5.PI / 2,
        p5.PI * 1.25,
        p5.PIE
      );

      p5.fill(0);
      p5.arc(
        width / 2,
        height / 2,
        width * 0.6,
        height * 0.6,
        -p5.PI / 2,
        p5.PI * 1.25,
        p5.PIE
      );

      p5.fill(255);
      p5.triangle(
        width / 2 + width * 0.35 * p5.cos(p5.PI * 1.3),
        height / 2 + height * 0.35 * p5.sin(p5.PI * 1.3),
        width / 2 + width * 0.45 * p5.cos(p5.PI * 1.2),
        height / 2 + height * 0.45 * p5.sin(p5.PI * 1.2),
        width / 2 + width * 0.25 * p5.cos(p5.PI * 1.2),
        height / 2 + height * 0.25 * p5.sin(p5.PI * 1.2)
      );
    });
    this.retryButton.setOnClick(() => {
      SceneManager.getInstance().reserveNextScene(new JumpScene());
    });

    this.toTitleButton = new RenderP5Button();
    this.toTitleButton.setStrokeColor(255);
    const toTitleButtonSize = p5.min(p5.width / 5, p5.height / 6);
    this.toTitleButton.setGeometry(
      (p5.width - toTitleButtonSize) / 2,
      (p5.height / 4) * 3,
      toTitleButtonSize,
      toTitleButtonSize
    );
    this.toTitleButton.setRender((button, p5) => {
      const { x, y, width, height } = button.getGeometry();

      const x_margin = width / 5,
        y_margin = height / 10;
      p5.stroke(255);
      p5.fill(0);
      p5.rect(x_margin, y_margin, width - x_margin * 2, height - y_margin * 2);
      p5.fill(255);
      p5.quad(
        x_margin,
        y_margin,
        x_margin,
        height - y_margin,
        width * 0.6,
        height * 1.1,
        width * 0.6,
        y_margin * 2 + height * 0.1
      );
    });
    this.toTitleButton.setOnClick(() => {
      SceneManager.getInstance().reserveNextScene(new TitleScene());
    });
  }
}

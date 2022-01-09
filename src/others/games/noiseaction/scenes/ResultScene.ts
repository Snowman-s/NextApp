import { CustomP5 } from "src/others/CustomP5";
import P5Button from "../../p5Components/P5Button";
import P5Component from "../../p5Components/P5Component";
import P5Typography from "../../p5Components/P5Typography";
import IScene from "./IScene";
import JumpScene from "./JumpScene";
import SceneManager from "./SceneManager";
import TitleScene from "./TitleScene";

export default class ResultScene implements IScene {
  private title: P5Typography;
  private toTitleButton: P5Button;
  private retryButton: P5Button;

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

    this.retryButton = new P5Button();
    this.retryButton.setText("Retry");
    this.retryButton.setStrokeColor(255);
    this.retryButton.setGeometry(
      (p5.width - p5.width / 5) / 2,
      p5.height / 2,
      p5.width / 5,
      p5.height / 6
    );
    this.retryButton.setTextColor(255);
    this.retryButton.setOnClick(() => {
      SceneManager.getInstance().reserveNextScene(new JumpScene());
    });

    this.toTitleButton = new P5Button();
    this.toTitleButton.setText("Back to Title...");
    this.toTitleButton.setStrokeColor(255);
    this.toTitleButton.setGeometry(
      (p5.width - p5.width / 5) / 2,
      (p5.height / 4) * 3,
      p5.width / 5,
      p5.height / 6
    );
    this.toTitleButton.setTextColor(255);
    this.toTitleButton.setOnClick(() => {
      SceneManager.getInstance().reserveNextScene(new TitleScene());
    });
  }
}

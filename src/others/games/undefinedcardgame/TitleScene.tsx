import { CustomP5 } from "src/others/CustomP5";
import P5Button from "../p5Components/TextP5Button";
import P5Typography from "../p5Components/P5Typography";
import Scene from "./Scene";
import calcCenterSquare from "./Utility";
import CardScene from "./CardScene";

export default class TitleScene extends Scene {
  startButton: P5Button;
  titleText: P5Typography;

  c: { x: number; y: number; size: number };

  scaleToWorldX(normalizedX: number) {
    return normalizedX * this.c.size;
  }

  scaleToWorldY(normalizedY: number) {
    return normalizedY * this.c.size;
  }

  convertToWorldX(normalizedX: number) {
    return this.c.x + normalizedX * this.c.size;
  }

  convertToWorldY(normalizedY: number) {
    return this.c.y + normalizedY * this.c.size;
  }

  init(p5: CustomP5): void {
    this.startButton = new P5Button();
    this.c = calcCenterSquare(p5);
    this.startButton.setGeometry(
      this.convertToWorldX(0.2),
      this.convertToWorldY(0.6),
      this.scaleToWorldX(0.6),
      this.scaleToWorldY(0.2)
    );
    this.startButton.setOnClick(() => {
      this.requireScene(new CardScene());
    });
    this.startButton.setFillColor(p5.color(0));
    this.startButton.setStrokeColor(p5.color(255));
    this.startButton.setTextColor(p5.color(255));
    this.startButton.setText("Start!");

    this.titleText = new P5Typography();
    this.titleText.setGeometry(
      this.convertToWorldX(0.2),
      this.convertToWorldY(0.1),
      this.scaleToWorldX(0.6),
      this.scaleToWorldY(0.2)
    );
    this.titleText.setFillColor(p5.color(0));
    this.titleText.setStrokeColor(p5.color(0));
    this.titleText.setTextColor(p5.color(255));
    this.titleText.setText("あんのうん");
  }

  update(p5: CustomP5): void {
    this.startButton.update(p5);
    this.titleText.update(p5);
  }

  draw(p5: CustomP5): void {
    p5.background(128);

    p5.push();
    p5.noStroke();
    p5.fill(0);
    p5.square(this.c.x, this.c.y, this.c.size);
    p5.pop();

    this.startButton.draw(p5);
    this.titleText.draw(p5);
  }
}

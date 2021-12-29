import p5 from "p5";

import { CustomP5 } from "src/others/CustomP5";
import P5Component from "./P5Component";

export default class NoiseEffect implements P5Component {
  private graphic: p5.Graphics;
  private lastReloded = 0;

  update(p: CustomP5): void {
    if (this.graphic == undefined) {
      this.graphic = p.createGraphics(500, 500);
    }

    if (p.frameCount - this.lastReloded > 2) {
      this.graphic.clear();
      this.graphic.noStroke();

      for (let i = 0; i < 20; i++) {
        this.graphic.fill(0, p.random(255));
        this.graphic.rect(
          p.random(500),
          p.random(500),
          p.random(200),
          p.random(200)
        );
      }
      this.lastReloded = p.frameCount;
    }
  }

  draw(p: CustomP5): void {
    if (this.graphic == undefined) return;

    p.image(this.graphic, 0, 0, p.width, p.height);
  }
}

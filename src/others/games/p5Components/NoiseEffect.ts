import { CustomP5 } from "src/others/CustomP5";
import P5Component from "./P5Component";

export default class NoiseEffect implements P5Component {
  private lastReloded = 0;

  private readonly width = 500;
  private readonly height = 500;

  private rects: [
    src: {
      x: number;
      y: number;
      width: number;
      height: number;
    },
    dist: {
      x: number;
      y: number;
      width: number;
      height: number;
    }
  ][] = [];

  update(p: CustomP5): void {
    if (p.frameCount - this.lastReloded > 2) {
      this.rects.splice(0);
      for (let i = 0; i < 20; i++) {
        const parameters = [
          this.width,
          this.height,
          this.width / 10,
          this.height / 10,
          this.width,
          this.height,
          this.width / 10,
          this.height / 10,
        ];
        for (let index = 0; index < parameters.length; index++) {
          parameters[index] = p.random(parameters[index]);
        }
        this.rects.push([
          {
            x: parameters[0],
            y: parameters[1],
            width: parameters[2],
            height: parameters[3],
          },
          {
            x: parameters[4],
            y: parameters[5],
            width: parameters[6],
            height: parameters[7],
          },
        ]);
      }
      this.lastReloded = p.frameCount;
    }
  }

  draw(p: CustomP5): void {
    p.push();

    p.noStroke();
    this.rects.forEach((r) => {
      p.rect(
        (r[1].x * p.width) / this.width,
        (r[1].y * p.height) / this.height,
        (r[1].width * p.width) / this.width,
        (r[1].y * p.height) / this.height
      );
    });

    p.pop();
  }
}

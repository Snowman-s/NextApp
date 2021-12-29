import p5 from "p5";
import { CustomP5 } from "src/others/CustomP5";

export default function noiseaction(p: CustomP5) {
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
  };

  p.draw = () => {};
}

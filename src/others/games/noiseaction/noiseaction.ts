import p5 from "p5";
import { CustomP5 } from "src/others/CustomP5";
import SceneManager from "./scenes/SceneManager";
import TitleScene from "./scenes/TitleScene";

export default function noiseaction(p: CustomP5) {
  let canvas: p5.Renderer;

  p.setup = () => {
    canvas = p.createCanvas(window.innerWidth, window.innerHeight);
    SceneManager.getInstance().reserveNextScene(new TitleScene());
  };

  p.draw = () => {
    p.resizeCanvas(window.innerWidth, window.innerHeight);

    SceneManager.getInstance().update(p);
    SceneManager.getInstance().render(p);
  };
}

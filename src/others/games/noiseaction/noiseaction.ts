import p5 from "p5";
import { CustomP5 } from "src/others/CustomP5";
import Inputs from "./Inputs";
import SceneManager from "./scenes/SceneManager";
import TitleScene from "./scenes/TitleScene";

export default function noiseaction(p: CustomP5) {
  let canvas: p5.Renderer;

  Inputs.getInstance().init(p);

  p.setup = () => {
    canvas = p.createCanvas(window.innerWidth, window.innerHeight);
    SceneManager.getInstance().reserveNextScene(new TitleScene());
  };

  p.draw = () => {
    if (window.innerWidth != p.width || window.innerHeight != p.height) {
      p.resizeCanvas(window.innerWidth, window.innerHeight);
      SceneManager.getInstance().onResized(p);
    }

    SceneManager.getInstance().update(p);
    SceneManager.getInstance().render(p);
  };
}

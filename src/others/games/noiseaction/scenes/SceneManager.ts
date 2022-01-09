import { CustomP5 } from "src/others/CustomP5";
import Scene from "./IScene";
import IScene from "./IScene";

export default class SceneManager {
  private constructor() {}

  private static readonly instance = new SceneManager();

  static getInstance() {
    return this.instance;
  }

  private readonly loadedScenes: IScene[] = [];

  public update(p5: CustomP5) {
    this.loadedScenes.forEach((s) => {
      s.update(p5);
    });

    this.reservedAction.forEach((a) => {
      a(p5);
    });

    this.reservedAction.splice(0);
  }

  public render(p5: CustomP5) {
    p5.background(0);

    this.loadedScenes.forEach((s) => {
      p5.push();
      s.render(p5);
      p5.pop();
    });
  }

  private readonly reservedAction: ((p5: CustomP5) => void)[] = [];

  public reserveNextScene(scene: IScene, replaceAll = true) {
    this.reservedAction.push((p5: CustomP5) => {
      scene.init(p5);

      if (replaceAll) {
        this.loadedScenes.splice(0);
      }

      this.loadedScenes.push(scene);
    });
  }

  public onResized(p5: CustomP5) {
    this.loadedScenes.reverse().forEach((s) => {
      s.onResized(p5);
    });
  }

  public isTopScene(scene: Scene) {
    return this.loadedScenes[this.loadedScenes.length - 1] === scene;
  }
}

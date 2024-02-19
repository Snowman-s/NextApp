import { CustomP5 } from "src/others/CustomP5";

export interface Scene {
  update(p: CustomP5): void,
  render(p: CustomP5): void,
  onTrasition?(p: CustomP5)
}

export class SceneManager {
  // Singleton
  private constructor() { }
  private static instance = new SceneManager();
  public static getInstance() {
    return this.instance;
  }

  public initilize(initialScene: Scene) {
    this.sceneStack = [initialScene];
  }

  public reserveNextScene(scene: Scene, clear?: boolean) {
    if (this.nextScene == null) {
      this.nextScene = { scene, clear };
    }
  }

  private nextScene: { scene: Scene, clear?: boolean } | null = null;

  private sceneStack: Scene[] = [];

  public update(p: CustomP5) {
    const nowScene = this.sceneStack[this.sceneStack.length - 1];

    nowScene.update(p);

    if (this.nextScene != null) {
      if (this.nextScene.clear) {
        this.sceneStack = [this.nextScene.scene];
      } else {
        this.sceneStack.push(this.nextScene.scene);
      }
      this.nextScene = null;
    }

    this.sceneStack[this.sceneStack.length - 1].onTrasition?.(p);
  }

  public render(p: CustomP5) {
    this.sceneStack.forEach(scene => {
      p.push();
      scene.render(p);
      p.pop();
    })
  }
}

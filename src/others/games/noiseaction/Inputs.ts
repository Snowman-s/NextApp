import { CustomP5 } from "src/others/CustomP5";

export default class Inputs {
  private constructor() {}

  private static readonly instance = new Inputs();

  public static getInstance() {
    return this.instance;
  }

  private keys: Set<number | string> = new Set();
  private leftKey: number | string;
  private rightKey: number | string;
  private upKey: number | string;

  public init(p5: CustomP5) {
    p5.keyPressed = () => {
      this.keys.add(p5.key);
      this.keys.add(p5.keyCode);
    };
    p5.keyReleased = () => {
      this.keys.delete(p5.key);
      this.keys.delete(p5.keyCode);
    };

    this.leftKey = "a";
    this.rightKey = "d";
    this.upKey = "w";
  }

  private isThatKeyPressing(that: number | string) {
    let b = false;
    this.keys.forEach((k) => {
      b ||= k == that;
    });
    return b;
  }

  public isLeftInputExists() {
    return this.isThatKeyPressing(this.leftKey);
  }

  public isRightInputExists() {
    return this.isThatKeyPressing(this.rightKey);
  }

  public isUpInputExists() {
    return this.isThatKeyPressing(this.upKey);
  }
}

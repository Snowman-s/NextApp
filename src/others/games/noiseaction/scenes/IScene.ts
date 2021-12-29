import { CustomP5 } from "src/others/CustomP5";

export default interface Scene {
  init(p5: CustomP5): void;
  update(p5: CustomP5): void;
  render(p5: CustomP5): void;

  onResized(p5: CustomP5): void;
}

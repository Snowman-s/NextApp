import { CustomP5 } from "src/others/CustomP5";

export default interface P5Component {
  update(p: CustomP5): void;

  draw(p: CustomP5): void;
}

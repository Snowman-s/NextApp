import { CustomP5 } from "../../CustomP5";
import P5Component from "./P5Component";

export default abstract class AbstractP5Button implements P5Component {
  private pressed = false;

  update(p: CustomP5) {
    if (p.mouseIsPressed) {
      const mouseX = p.mouseX;
      const mouseY = p.mouseY;

      if (this.isInBounds(mouseX, mouseY)) {
        this.pressed = true;
      }
    } else {
      if (this.pressed) {
        const mouseX = p.mouseX;
        const mouseY = p.mouseY;

        if (this.isInBounds(mouseX, mouseY)) {
          this.onClick();
        }
      }

      this.pressed = false;
    }
  }
  abstract draw(p: CustomP5): void;
  private onClick: () => void;

  protected abstract isInBounds(x: number, y: number): boolean;

  setOnClick(onClick: () => void) {
    this.onClick = onClick;
  }
}

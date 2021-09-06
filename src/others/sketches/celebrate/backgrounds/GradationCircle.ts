import { CustomP5 } from "src/others/CustomP5";
import RendererComponent from "../RendererComponent";

export default class GradationCircle implements RendererComponent {
    render(p: CustomP5): void {
        p.push();
        p.colorMode(p.HSB, 1);
        //p.blendMode(p.ADD);
        p.noStroke();
        for (let radius = 60; radius > 0; radius--) {
            p.fill(0.1, radius / 60, 1);
            p.ellipse(p.width / 2, p.height / 2, p.width * radius / 40, p.height * radius / 40)
        }
        p.pop();
    }

    update(p: CustomP5): void {
    }
}
import { randomInt } from "crypto";
import { CustomP5 } from "src/others/CustomP5";
import RendererComponent from "../RendererComponent";

export default class FountainStringEffects implements RendererComponent {
    happiness: number = 50;
    text: string = "";
    frameCount: number = 0;

    noiseSeed: number = 0;

    constructor(happiness: number, text: string) {
        this.happiness = happiness;
        this.text = text;
    }

    setup(p: CustomP5): void {
        this.noiseSeed = p.random(200);
    }

    render(p: CustomP5): void {
        const textSize = p.min(p.width / this.text.length, p.height);

        p.push();
        p.textSize(textSize);
        for (let n = 0; n < this.text.length; n++) {
            const theChar = this.text.charCodeAt(n);
            const fromX = p.width / 2;
            const fromY = p.height;
            const targetX = p.width / 2 + (n - this.text.length / 2) * textSize;
            const targetY = p.height / 2 - textSize / 2;
            const centerLineX = p.map(p.noise(this.noiseSeed, n) / 2 + 0.5, 0, 1, fromX, targetX);

            const x = targetX < fromX ? p.max(targetX, p.width / 2 + this.frameCount * (n - this.text.length / 2)) :
                p.min(targetX, p.width / 2 + this.frameCount * (n - this.text.length / 2));

            const A = (targetY - fromY) / ((targetX - centerLineX) * (targetX - centerLineX) - (fromX - centerLineX) * (fromX - centerLineX))
            const q = targetY - A * (targetX - centerLineX) * (targetX - centerLineX)

            const y = (n - this.text.length / 2 == 0) ? targetY : A * (x - centerLineX) * (x - centerLineX) + q;

            p.fill("#FFC0CB");
            p.text(p.char(theChar), x, y, p.width);
            p.fill("#000000");
            p.text(p.char(theChar), x - textSize / 40, y - textSize / 40, p.width);
        }
        p.pop();
    }

    update(p: CustomP5): void {
        this.frameCount++;
    }
}

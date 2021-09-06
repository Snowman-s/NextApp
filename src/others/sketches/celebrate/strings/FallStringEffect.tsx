import { CustomP5 } from "src/others/CustomP5";
import RendererComponent from "../RendererComponent";

export default class FallStringEffects implements RendererComponent{
    happiness:number = 50;
    text:string = "";
    frameCount:number = 0;
    
    constructor(happiness:number, text:string) {
        this.happiness = happiness;
        this.text = text;
    }

    render(p: CustomP5): void {
        const textSize = p.min(p.width/this.text.length, p.height); 

        p.push();
        p.textSize(textSize);
        for (let n = 0; n < this.text.length; n++) {
            const theChar = this.text.charCodeAt(n);
            const x = p.width / 2 + (n - this.text.length / 2) * textSize;
            const y = p.min(p.height/2 - textSize/2, this.frameCount * 30 * p.noise(n) - textSize * 2);
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
import { CustomP5 } from "src/others/CustomP5";
import RendererComponent from "../RendererComponent";

export default class Crapping implements RendererComponent{
    private frameCount = 0;
    private happiness = 50;

    constructor(happiness:number){
        this.happiness = happiness;
    }

    setup(p:CustomP5):void {
        
    }

    render(p: CustomP5): void {
        p.push();
        const textSize = p.int(p.min(p.width * .1, p.height));
        p.textSize(textSize);
        const mergin = textSize/6;
        for (let x = 0, maxX = p.int(this.happiness/10); x < maxX; x++) {
            p.push();
            p.translate(x / maxX * p.width, p.height-mergin);
            p.rotate(p.sin(this.frameCount/9 + x)/20);
            p.scale(p.sin(this.frameCount/9 + x)/20 + 1);

            p.text("👏", 0, 0);
            p.pop();
        }
        p.pop();
    }

    update(_p: CustomP5): void {
        this.frameCount++;
    }
}
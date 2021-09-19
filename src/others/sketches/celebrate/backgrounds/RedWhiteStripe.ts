import { CustomP5 } from "src/others/CustomP5";
import RendererComponent from "../RendererComponent";

export default class RedWhiteStripe implements RendererComponent {
    private happiness = 50;

    constructor(happiness:number){
        this.happiness = happiness;
    }

    setup(p:CustomP5):void {

    }

    render(p: CustomP5): void {
        p.push();
        for(let w=0, maxW = this.happiness/3 + 5, n=0; w<maxW; w++){
            const actualyWidth = p.width / maxW;
            const actualyX = w / maxW * p.width;

            const color = n%2==0?230:0;
            p.noStroke();
            p.fill(230, color, color);
            p.rect(actualyX, 0, actualyWidth, p.height);
            n++;
        }
        p.pop();
    }

    update(p: CustomP5): void {
    }
}
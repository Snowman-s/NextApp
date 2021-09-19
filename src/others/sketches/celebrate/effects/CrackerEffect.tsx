import { CustomP5 } from "src/others/CustomP5";
import RendererComponent from "../RendererComponent";

export default class CrackerEffect implements RendererComponent{
    private frameCount = 0;
    private happiness = 50;

    constructor(happiness:number){
        this.happiness = happiness;
    }

    setup(p:CustomP5):void {
        
    }

    render(p: CustomP5): void {
        p.push();
        p.colorMode(p.HSB, 2);
        p.noStroke();
        
        const repeatFrame = this.frameCount % 200;
        for (let angle = 0, maxAngle = p.int(this.happiness/3+3); angle < maxAngle; angle++) {
            const radAngle = angle / maxAngle * p.TAU;
            const cos = p.cos(radAngle)
            const sin = p.sin(radAngle)            

            for(let n=-300;n<0;n+=5){
                const radius = p.max(0,n + repeatFrame * p.max(150,300-repeatFrame) / 200 * (8));
                p.fill(radAngle / p.PI, 2, 2,(600-radius)/300);
                p.circle(p.width / 2 + radius * cos, p.height / 2 + radius * sin, (150+n)/20);
            }
        }
        p.pop();
    }

    update(_p: CustomP5): void {
        this.frameCount++;
    }
}
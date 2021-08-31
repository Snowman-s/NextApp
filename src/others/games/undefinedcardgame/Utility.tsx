import { CustomP5 } from "src/others/CustomP5";

export default function calcCenterSquare(p5:CustomP5){
    let x:number;
    let y:number;
    let size:number;

    if(p5.width < p5.height){
        size = p5.width;

        x = 0;
        y = p5.height / 2 - size / 2;
    } else {
        size = p5.height;

        x = p5.width / 2 - size / 2;
        y = 0;
    }

    return {x:x, y:y, size:size}
}
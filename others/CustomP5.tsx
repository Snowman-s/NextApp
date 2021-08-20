import p5 from "p5"

export class CustomP5Props {
    [key:string]:any
    sketch:(p5:CustomP5)=>void
}

export class CustomP5 extends p5{
    onPropsUpdate?:(props:CustomP5Props)=>void
}

import p5 from "p5"
import React from "react"

export class CustomP5Props {
    [key:string]:any
    sketch:(p5:CustomP5)=>void
    children?:React.ReactNode
    restartRequire?:boolean = false
    onRestartEnd?:()=>void
    saveRequire?:boolean = false
    onSaveEnd?:()=>void
}

export class CustomP5 extends p5{
    onPropsUpdate?:(props:CustomP5Props)=>void
    onSave?:()=>void
    onRestart?:()=>void
}

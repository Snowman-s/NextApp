import {CustomP5} from 'src/others/CustomP5'

export default function lifegame(p: CustomP5) {
    let minGridAmount = 20
    let gridWidth:number = 0

    let gridHorizontalNum:number
    let gridVerticalNum:number

    let data:number[][]
    let datacopy:number[][]

    let saturation:number = 255
    let bornCondition:number[] = [3]
    let deadCondition:number[] = [0, 1, 4, 5, 6, 7, 8]

    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight)
        initialize()
    }

    p.draw = () => {
        p.background(0)
        p.noStroke()

        if(p.frameCount % 40 == 0) updateGrid()

        for (let w = 0; w < data.length; w++) {
            for (let h = 0; h < data[w].length; h++) {
                if(data[w][h] == 1){
                    p.fill(p.noise(w,h) * 255, saturation, 255)
                    p.square(w * gridWidth, h * gridWidth, gridWidth)
                }
            }
        }
    }

    p.onRestart = () =>{
        initialize()
    }

    p.onSave = () => {
        p.save("life_game")
    }

    p.onPropsUpdate = (props:any)=>{
        saturation = props.saturation ?? saturation
        bornCondition = props.bornCondition ?? bornCondition
        deadCondition = props.deadCondition ?? deadCondition
        if(props.minGridAmount != null && minGridAmount != props.minGridAmount){
            minGridAmount = props.minGridAmount
            initialize()
        }
    }

    function initialize(){
        p.colorMode(p.HSB, 255)

        gridWidth = p.min(p.int(p.width / minGridAmount), p.int(p.height / minGridAmount))

        gridHorizontalNum = p.int(p.width / gridWidth)
        gridVerticalNum = p.int(p.height / gridWidth)

        data = new Array(gridHorizontalNum)
        datacopy = new Array(gridHorizontalNum)

        //配列の初期化
        for (let w = 0; w < data.length; w++) {
            data[w] = new Array(gridVerticalNum);
            datacopy[w] = new Array(gridVerticalNum);
        }

        gridRandomise()        
    }

    //グリッドの更新
    function updateGrid() {
        for (let w = 0; w < data.length; w++) 
        for (let h = 0; h < data[w].length; h++) {
            let neighbor:number = 0
            for (let dx = -1; dx <= 1; dx++) 
            for (let dy = -1; dy <= 1; dy++){
                //自分自身は勘定しない
                if(dx==0 && dy==0) continue

                let lookAtX:number = w + dx
                let lookAtY:number = h + dy

                if(lookAtX < 0 ||
                    lookAtX >= gridHorizontalNum ||
                    lookAtY < 0 ||
                    lookAtY >= gridVerticalNum) continue

                let lookAtGridFlag:number = data[lookAtX][lookAtY]
                if(lookAtGridFlag == 1){
                    neighbor++
                }
            }

            if(data[w][h] == 0 && bornCondition.includes(neighbor)){
                datacopy[w][h] = 1
            } else if(data[w][h] == 1 && deadCondition.includes(neighbor)){
                datacopy[w][h] = 0
            } else {
                datacopy[w][h] = data[w][h]
            }
        }

        // 新しく配列を生成しなくていいようにスワップする。
        const buf = data
        data = datacopy
        datacopy = buf
    }

    function gridRandomise() {
        for (let w = 0; w < data.length; w++) 
        for (let h = 0; h < data[w].length; h++) {
            data[w][h] = p.random() < 0.5 ? 1 : 0
        }
    }
}
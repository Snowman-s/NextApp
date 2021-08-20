import {CustomP5} from 'src/others/CustomP5'

export default function lifegame(p: CustomP5) {
    const GRID_WIDTH = 50

    let gridHorizontalNum:number
    let gridVerticalNum:number

    let data:number[][]
    let datacopy:number[][]

    let fillColor:number = 255

    p.setup = () => {
        p.createCanvas(screen.width, screen.height)

        gridHorizontalNum = p.int(p.width / GRID_WIDTH)
        gridVerticalNum = p.int(p.height / GRID_WIDTH)

        data = new Array(gridHorizontalNum)
        datacopy = new Array(gridHorizontalNum)

        //配列の初期化
        for (let w = 0; w < data.length; w++) {
            data[w] = new Array(gridVerticalNum);
            datacopy[w] = new Array(gridVerticalNum);
        }

        gridRandomise()
    }

    p.draw = () => {
        p.background(0)
        p.fill(fillColor)
        p.noStroke()

        if(p.frameCount % 40 == 0) updateGrid()

        for (let w = 0; w < data.length; w++) {
            for (let h = 0; h < data[w].length; h++) {
                if(data[w][h] == 1)
                    p.square(w * GRID_WIDTH, h * GRID_WIDTH, GRID_WIDTH)
            }
        }
    }

    p.onPropsUpdate = (props:any)=>{
        if(props.fillColor){
            fillColor = props.fillColor
        } else {
            fillColor = 255
        }
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

            if(neighbor == 3){
                datacopy[w][h] = 1
            } else if(data[w][h] == 1 && (neighbor == 2 || neighbor == 3)){
                datacopy[w][h] = 1
            } else {
                datacopy[w][h] = 0
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
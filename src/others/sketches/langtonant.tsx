import {CustomP5} from 'src/others/CustomP5'

export default function langtonant(p: CustomP5) {
    let minGridAmount = 20
    let gridWidth:number = 0

    let gridHorizontalNum:number
    let gridVerticalNum:number

    let ants: {
        x:number, y: number, degDirection: number;
    }[]

    let data:number[][]
    let datacopy:number[][]

    let saturation:number = 255
    let speed:number = 2
    let antAmount:number = 1
    let antVisible:boolean = true

    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight)
        initialize()
        
        p.colorMode(p.HSB, 255)
        p.noStroke()
    }

    p.draw = () => {
        p.background(0)

        if(p.frameCount % speed == 0) updateGrid()

        for (let w = 0; w < data.length; w++) {
            for (let h = 0; h < data[w].length; h++) {
                if(data[w][h] == 1){
                    p.fill(p.noise(w,h) * 255, saturation, 255)
                    p.square(w * gridWidth, h * gridWidth, gridWidth)
                }
            }
        }

        if(antVisible){
            ants.forEach(ant =>{
                p.push();
                p.fill(0, 255, 255);
                p.translate(ant.x * gridWidth + gridWidth / 2, ant.y * gridWidth + gridWidth / 2);
                p.rotate(p.radians(ant.degDirection + 90));
                const triWidth = gridWidth / 5 * 2;
                const triHeight = gridWidth / 5 * 4;
                p.triangle(triWidth/2, triHeight/2, -triWidth/2, triHeight/2, 0, -triHeight/2);
                p.pop();
            });
        }
    }

    p.onRestart = () =>{
        initialize()
    }

    p.onSave = () => {
        p.save("langtonant")
    }

    p.onPropsUpdate = (props:any)=>{
        saturation = props.saturation
        speed = props.speed
        antVisible = props.antVisible
        if(minGridAmount != props.minGridAmount){
            minGridAmount = props.minGridAmount
            initialize()
        }
        if(antAmount > props.antAmount){
            for (let i = 0; i < antAmount - props.antAmount; i++) {
                ants.pop();                
            }
            antAmount = props.antAmount
        } else if (antAmount < props.antAmount) {
            for (let i = 0; i < props.antAmount - antAmount; i++) {
                ants.push(createNewAnt());
            }
            antAmount = props.antAmount
        }
    }

    function initialize(){
        gridWidth = p.min(p.int(p.width / minGridAmount), p.int(p.height / minGridAmount))

        gridHorizontalNum = p.int(p.width / gridWidth)
        gridVerticalNum = p.int(p.height / gridWidth)

        data = new Array(gridHorizontalNum)
        datacopy = new Array(gridHorizontalNum)

        //配列の初期化
        for (let w = 0; w < data.length; w++) {
            data[w] = new Array(gridVerticalNum);
            datacopy[w] = new Array(gridVerticalNum);
            for (let h = 0; h < data[w].length; h++) {
                data[w][h] = 0;
                datacopy[w][h] = 0;
            }
        }

        ants = []
        for (let i = 0; i < antAmount; i++) {
            ants.push(createNewAnt())            
        }
    }

    function createNewAnt() :{x:number, y: number, degDirection: number;}{
        return {x:p.int(p.random(gridHorizontalNum)), 
            y:p.int(p.random(gridVerticalNum)), 
            degDirection:90*p.int(p.random(4))}
    }

    //グリッドの更新
    function updateGrid() {
        for (let x = 0; x < data.length; x++) 
        for (let y = 0; y < data[x].length; y++){
            const antsFilltered = ants.filter(ant => ant.x == x && ant.y == y)
            antsFilltered.forEach(
                ant => { 
                    if(data[x][y] == 0){
                        ant.degDirection -= 90;
                    } else {
                        ant.degDirection += 90;
                    }    
                }
            )
            if(antsFilltered.length > 0){
                if(data[x][y] == 0){
                    datacopy[x][y] = 1;
                } else {
                    datacopy[x][y] = 0;
                }    
            } else  {
                datacopy[x][y] = data[x][y]
            }
        }

        ants.forEach(ant =>{
            ant.x += p.int(p.cos(p.radians(ant.degDirection)));
            ant.y += p.int(p.sin(p.radians(ant.degDirection)));

            if(ant.x < 0){
                ant.x = gridHorizontalNum;
            } else if(ant.x >= gridHorizontalNum){
                ant.x = 0;
            }
            if(ant.y < 0){
                ant.y = gridVerticalNum;
            } else if(ant.y >= gridVerticalNum){
                ant.y = 0;
            }
        });

        // 新しく配列を生成しなくていいようにスワップする。
        const buf = data
        data = datacopy
        datacopy = buf
    }
}
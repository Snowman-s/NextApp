import p5 from 'p5'

export default function mysketch(p: p5) {
    p.setup = () => {
        p.createCanvas(500, 500)
        p.background(0)
    }
    p.draw = () => {
        p.ellipse(50, 50, 80, 80)
    }
}
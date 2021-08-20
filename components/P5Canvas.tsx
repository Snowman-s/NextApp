import CustomP5, { CustomP5Props } from 'others/CustomP5'
import React from 'react'

export default class P5Canvas extends React.Component<CustomP5Props, {p5obj:CustomP5}>{  
    myRef:React.RefObject<HTMLDivElement>

    constructor(props:{sketch:any}){
        super(props)

        this.myRef = React.createRef()
    }
    
    async componentDidMount(){
        const p5 = await import("p5")
        const p5obj = new p5.default(this.props.sketch, this.myRef.current) as CustomP5
        this.setState({p5obj:p5obj})
    }

    async componentDidUpdate(prevProps: any){
        if(prevProps.sketch !== this.props.sketch){
            this.state.p5obj.remove()
            const p5 = await import("p5")
            const p5obj = new p5.default(this.props.sketch, this.myRef.current) as CustomP5
            this.setState({p5obj:p5obj})
        }
        this.state.p5obj.onPropsUpdate?.(this.props)
    }
    
    render(){
        return (
            <div ref={this.myRef}>

            </div>
        )
    }
}

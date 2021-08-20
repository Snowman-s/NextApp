import React from 'react'

export default class P5Canvas extends React.Component<{sketch:any}>{  
    myRef:React.RefObject<any>

    constructor(props:{sketch:any}){
        super(props)

        this.myRef = React.createRef()
    }
    
    async componentDidMount(){
        const p5 = await import("p5")
        new p5.default(this.props.sketch, this.myRef.current)
    }
    
    render(){
        return (
            <div ref={this.myRef}>

            </div>
        )
    }
}

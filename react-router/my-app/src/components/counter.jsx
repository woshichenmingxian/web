import React, { Component } from 'react';
import ReactDOM from 'react-dom'

export default  class Counter extends Component{
    constructor(props){
        super(props)
        this.state={counter:0}

    }
    add=()=>{
        //setState是异步
        this.setState((preSate,props)=>({counter:props.time+preSate.counter}))
        this.setState((preSate,props)=>({counter:props.time+preSate.counter}))
        //相等于一下
        // this.setState((preSate,props)=>({counter:props.time+preSate.counter}),()=>{
        //     this.setState((preSate,props)=>({counter:props.time+preSate.counter}))
        // })
        /**
         * setState
         * 
         */
        // function SetState(newState){
        //     let Obj=Object.assign({},this.state,newState)
        //     this.state=Obj;
        //     this.render()
        // }
    }
    render(){
        return(
            <div>
                <h1>{this.state.counter}</h1>
                <button onClick={this.add}>+</button>
            </div>
        )
    }
}
// ReactDOM.render(<Counter time={1}/>,document.getElementById('root'))
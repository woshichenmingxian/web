import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class Toggle extends Component{
    constructor(){
        super();
        this.state={
            isShow:true
        };
    }
    toggleFuc=()=>{
        this.setState(newState=>({isShow:!newState.isShow}))
    }
    render(){
        return(
            <button onClick={this.toggleFuc}>
                {this.state.isShow?`开`:`关`}
            </button>
        )
    }
}
ReactDOM.render(<Toggle></Toggle>,document.getElementById('root'))
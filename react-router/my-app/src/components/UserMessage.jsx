import React,{Component} from 'react'


export default class UserMessage extends Component{
    constructor(props){
        super(props)
    }
    pushList=()=>{
        this.props.history.push('/user/id/56')
    }
    render(){
        return(
            <div onClick={this.pushList}>这是信息</div>
        )
    }
} 
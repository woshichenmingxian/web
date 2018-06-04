import React,{Component} from 'react'


export default class UserId extends Component{
    constructor(props){
        super(props);
        this.state={id:""}   
    }
    componentDidMount(){
        this.setState({id:this.props.match.params.id}) 
        console.log(this.props)
    }
    pushList=()=>{
        this.props.history.push('/user/list')
    }
    render(){
        return(
            <div onClick={this.pushList}>{this.state.id}</div>
        )
    }
} 
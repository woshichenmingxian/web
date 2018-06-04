import React,{Component} from 'react';
import PropTypes from 'prop-types'
export default class Link extends Component{
    constructor(props,context){
        super(props)
    }
    /**
     * 接收HashRouter传入值
     * @param history 进行hash更新
     * @param location
     */ 
    static contextTypes={
        history:PropTypes.object,
        location:PropTypes.object
    }
    componentDidMount(props,context){
    }
    render(){
        return(
            <a onClick={()=>{this.context.history.push(this.props.to)}}>{this.props.children}</a>
        )
    }
} 
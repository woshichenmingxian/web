import React, { Component } from 'react'
import PropTypes from 'prop-types'
export default class Redirect extends Component{
    constructor(props){
        super(props)
        this.state={}
    }
    static contextTypes={
        history:PropTypes.object
    }
    /**
     * 路由跳转中间站
     */
    componentWillMount(){
        this.context.history.push(this.props.to)
    }
    render(){
        return null
    }
}
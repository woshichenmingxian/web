import React, { Component  } from 'react'
import PropTypes from 'prop-types'
/**
 * 路由实现原理
 * @param {默认设置{pathname:'/home},路由条件跳转有state带入，需要合并入} location
 * 
 * @param {组件包含所以的子元素} this.props.children：
 */ 
export default class HashRouter extends Component{
    //传值旗下的子组件定义属性
    static childContextTypes={
        location:PropTypes.object,
        history:PropTypes.object
    }
    constructor(props,context){
        super(props)
        this.state={location:{pathname:window.location.hash.slice(1) || '/'}}
    }
    /**
     * 设定传值旗下的组件的值，页面跳转通过history.push，替换hash值，进行组件匹配
     * @param {setState({location:{...that.state.location,state}})，state:路由条件跳转,带入的 state:{from:'/prefile'},合并入location中} location
     * @param {路由跳转方法} history.push
     * @param {path:一般为路由hash,也可为{pathname:"/login", state:{...}}}  push(path)
     * 
     */

    getChildContext(){
        let that=this;
        return{
            location:this.state.location,
            history:{
                push(path){
                    if(typeof path == 'object'){
                        //state 保存状态
                        let {pathname,state}=path
                        that.setState({location:{...that.state.location,state}},()=>{
                            window.location.hash=pathname
                        })
                    }else{
                        window.location.hash=path
                    }
                    
                }
            }
        }
    }
    /**
     * 设定默认hash值，并监听hash变化，进行组件setState会触发render重新渲染（return this.props.children）
     */
    componentDidMount(){
        //监听hash之变化
        let render=()=>{
            this.setState({location:{...this.state.location,pathname:window.location.hash.slice(1) || '/'}})
        }
        window.location.hash=window.location.hash || '/';
        //监听hash之变化 获取this.context
        window.addEventListener('hashchange',render)
    }
    //渲染Router后面的div部分
    render(){
        return this.props.children
    }
}
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import pathToRegexp from 'path-to-regexp' //匹配hash正则插件返回hash正则：pathToRegexp(hash,Array,{end:Boolean})
export default class Route extends Component{
    constructor(props){
        super(props)
        // let {path}=props;//user/detail/:id
        // this.keys=[];
        // this.regexp=pathToRegexp(path,this.keys,{end:false});
        
    }
    /**
     * @param {*获取HashRouter传值} location 
     * @param {*获取HashRouter传值} history 
     */ 
    static contextTypes={
        location:PropTypes.object,
        history:PropTypes.object
    }
    componentDidMount(){
   
    }
    /**
     * @param {重组props，传入将要渲染组件} props
     * @param {路由switch条件匹配,进行router优化} result
     * @param {路由条件渲染（登录后才跳入）具体components/isLogin/pretect} render
     * @param {当前路由高亮，具体components/isLogin/MenuLink} children
     * @param {匹配与path，组件Component} Component
     */ 
    render(){
        // debugger
        let {path,component:Component,render,children}=this.props;
        let {location}=this.context;
        let props={
            location,
            history:this.context.history
        }
        //switch匹配
        this.keys=[];
        this.regexp=pathToRegexp(path,this.keys,{end:false});//=>this.keys=[{name:id,...},...]
        this.keys=this.keys.map(key=>key.name)//=>[id,...]
        let result=location.pathname.match(this.regexp);//=>["/Profile", index: 0, input: "/Profile", groups: undefined]

        if(result){
            let [url,...vales]=result;
            props.match={ 
                url,
                path,
                params:this.keys.reduce((memo,key,index)=>{
                    memo[key]=vales[index];
                    return memo
                },{})
            }
            //路由条件渲染
            if(render){
                return render(props)
            }
            //路由匹配
            else if(Component){
                return <Component {...props} />
            }
            //路由高亮渲染
            else if(children){
                return children(props)
            }
            
        }else{
             //路由高亮渲染
            if(children){
                return children(props)
            }else{
                return null
            }
            
        }

        // if((location && path===location.pathname) || location.pathname.startsWith(path)){
        //     return <Component location={this.context.location} history={this.context.history}/>    
        // }
        // return null
    }
}
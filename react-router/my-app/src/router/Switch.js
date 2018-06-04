import {Component} from 'react'
import PropTypes from 'prop-types'
import pathToRegexp from 'path-to-regexp' //匹配hash正则插件返回hash正则：pathToRegexp(hash,Array,{end:Boolean})
export default class UserList extends Component{
    /**
     * @param {获取父级传入属性} location
     */
    static contextTypes={
        location:PropTypes.object
    }
    /**
     * 进行路由选择匹配
     * @param {所以的子组件(Route)} this.props.children
     * @param {取匹配的pathname，进行路由匹配} this.context.location;
     */
    render(){
        let children=this.props.children;
        let {pathname}=this.context.location;
        for(let i =0;i<children.length;i++){
            let child=children[i];
            let {path}=child.props;
            if(pathToRegexp(path,[],{end:false}).test(pathname)){
                return child
            }
        }
        return null
    }
} 
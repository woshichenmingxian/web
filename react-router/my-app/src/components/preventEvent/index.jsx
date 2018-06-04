import React from 'react'
import ReactDOM from 'react-dom'
/**
 * 阻止默认事件与原始写法一致
 * @param  props 
 *  
 */
class Prevent extends React.Component{
    //事件处理函数 event并非原始对象 是react生成的不会有兼容问题
    handleSubmit=(event)=>{
        event.preventDefault()
    }
    render(){
        return(
            <from >
                用户名：<input type="text"/>
                密码：<input type="text"/>
                <input type="submit"/>
                <a href="#" onClick={this.handleSubmit}>diandian</a>
            </from>
        )
    }
}
ReactDOM.render(<Prevent/>,document.getElementById('root'))
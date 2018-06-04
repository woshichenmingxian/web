// import React from 'react';
// import ReactDOM from 'react-dom';
// // import './index.css';
// // import App from './App';
// // import registerServiceWorker from './registerServiceWorker';
// /**
//  * 原始写法
//  * @param  props 
//  *  
//  */

// // ReactDOM.render(<App />, document.getElementById('root'));
// // registerServiceWorker();

// /**
//  * 函数就是一个合法组件
//  * @param  props 
//  *  
//  */
// function Welcome(props){
//     return(
//         Array.from(["chen","ming","xian"]).map((key)=>{
//            return <div>hello,world {key}</div> 
//         })
        
//     )
// }
// // ReactDOM.render(<Welcome/>, document.getElementById('root'));

// /**
//  * props整合传值
//  * @param  props
//  * ...es6连接符 
//  *  
//  */
// function Comment(props){
//     return(
//         <div>
//             <p>{props.name}</p>
//             <p>{props.act}</p>
//             <p>{props.text}</p>
//         </div> 
//     )
// }
// let data={
//     name:"chenmingxian",
//     act:"look moves",
//     text:"man"
// }
// ReactDOM.render(<Comment {...data}/>, document.getElementById('root'));

// import './components/preventEvent/index.jsx'//阻止冒泡
// import './components/toggle.jsx'//事件切换
// import './components/clock.jsx'//render刷新
// import './components/counter.jsx'//props与state串联
// import './components/condition.jsx'//组件之间条件render
// import './components/alert/modal.jsx'//this.props.children

import React,{component} from 'react'
import ReactDOM from 'react-dom'
/**
 * 路由
 * @param HashRouter ==> 通过路径 哈希变量实现的
 * @param BrowseRouter ==> 通过 html5 的 history API
 */
import {HashRouter as Router,Route} from 'react-router-dom'
// import {HashRouter as Router,Route} from './router/index'
/**
 * 路由
 * @param router:路由容器
 * @param route:路由规则 
 */ 
let Home=(props)=>{
    console.log(props)
    return(
        <div>首页</div>
    )
    
}
let User=()=><div>用户管理</div>
let Profile=()=><div>个人设置</div>
//渲染router 会先location.hash，然后跟path进行匹配，如果匹配成功则显示component组件，匹配不上不显示
ReactDOM.render(
    <Router>
        <div>
            <Route path="/home" component={Home} />
            <Route path="/user" component={User} />
            <Route path="/" component={Profile} />
        </div>
    </Router>,
    document.querySelector('#root') 
)
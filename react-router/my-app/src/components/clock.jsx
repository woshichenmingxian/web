import React,{Component} from 'react'
import {HashRouter as Router,Route,Link,Switch} from '../router'
// import {HashRouter as Router,Route,Link,Switch} from 'react-router-dom'
import '../style/user.css'
import UserMessage from './UserMessage.jsx'
import UserList from './UserList.jsx'
import UserId from './UserId.jsx'
export default class Clock extends Component{
    constructor(props){
        super(props)
        this.state={data:new Date()}
    }
    //组件挂载完成 当react吧虚拟dom转成真是懂么
    /**
     * this处理：
     * bind:this.tick.bind(this)
     * 函数式调用 this.tick()
     * 函数定义时，属性初始化 tick=()=>{}  
     * 构造函数，函数bind:this.tick=this.tick.bind(this)  
     */
    componentDidMount(){
        console.log('user')
        // this.timer=setInterval(()=>this.tick(),1000)
    }
    //组件销毁时，会调用次方法 进行资源释放和清里
    componentWillUnmount(){
        clearInterval(this.timer)
    }
    tick(){
        this.setState({data:new Date()})
    }
    
    render(){
        return(
            <div className="user-list">
                {/* <h1>hello,It's time:</h1>
                <h2>{this.state.data.toLocaleTimeString()}</h2> */}
                <div className="list-component">
                    <ul>
                        <li><Link to="/user/list" >用户列表</Link></li>
                        <li><Link to="/user/message">用户信息</Link></li>
                    </ul>
                </div>
                <div className="list-router">
                {/* <Router> */}
                <Switch>
                    <Route path="/user/list" component={UserList}/>
                    <Route path="/user/message" component={UserMessage}/>
                    <Route path="/user/id/:id" component={UserId}/>
                </Switch>
                {/* </Router> */}
                    
                </div>
            </div>
        )
    }
}
// ReactDOM.render(<Clock />,document.getElementById('root'))
/**
 * class组件渲染
 * 1.Clock传递给ReactDOM.render方法
 * 2.封装props属性对象
 * 3.找到Clock组件，实例化Clock组件：new Clock(props)
 * 4.调用Clock组件中render方法，返回render元素
 * 5.把此react元素渲染页面，转化为真实DOM
 * 6.当渲染完成，调用didMount方法，创建timer定时器
 * 7.触发state，state改变会触发render方法重新渲染
 */

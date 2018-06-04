import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import CheckLogin from './CheckLogin'
// function CheckLogin(props){
//     return(props.isLogin?(<div>你好！登录成功</div>):(<div>请登录</div>))
// }

export default  class Login extends Component{
    constructor(props){
        super(props)
        this.state={
            isLogin:false,
            btnText:'请登录'
        }
    }
    login=()=>{
        this.setState((preState)=>({
            isLogin:!preState.isLogin,
            btnText:!preState.isLogin?`退出`:`请登录`
        }))
    }
    render(){
        return(
            <div>
                <CheckLogin isLogin={this.state.isLogin}></CheckLogin>
                <button onClick={this.login}>{this.state.btnText}</button>
            </div>
        )
    }
}

// ReactDOM.render(<Login></Login>,document.getElementById('root'))
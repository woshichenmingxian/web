import React, { Component } from 'react'

export default class Login extends Component{
    login=()=>{
        console.log(this.props)
        localStorage.setItem('isLogin',true);
        this.props.history.push(this.props.location.state.from)
    }
    render(){
        return(
            <div>
                <button onClick={this.login}>登录</button>
            </div>
        )
    }
}
import React, { Component } from 'react';
export default (props)=>{
    return(props.isLogin?(<div>你好！登录成功</div>):(<div>请登录</div>))
}
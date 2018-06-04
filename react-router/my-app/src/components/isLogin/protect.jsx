import React, { Component } from 'react'
import { Route,Redirect } from '../../router';

export default function({component:Component,...rest}){
    return <Route {...rest} render={props=>(
        localStorage.getItem('isLogin')=="true"?<Component {...props} />:<Redirect  to={{pathname:"/login", state:{from:props.location.pathname}}}/>)}></Route>
}
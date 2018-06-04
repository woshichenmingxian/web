import React, { Component } from 'react'
import ReactDOM from 'react-dom'
// import {HashRouter as Router,Route,Switch} from 'react-router-dom'
import {Route,Switch} from '../router'
import '../style/base.css'
import App from '../App.js'
import User from './clock.jsx'
import Home from './counter.jsx'
import Profile from './condition.jsx'
import Protect from './isLogin/protect.jsx'
import Login from './isLogin/Login.jsx'
export default class TRouter extends Component{
    render(){
        return(
            <App>
                <Switch>
                    <Route path="/home" component={Home} />
                    <Route path="/user" component={User} />
                    <Route path="/login" component={Login} />
                    <Protect path="/Profile" component={Profile} />
                </Switch>
                
            </App>
        )
    }
}
ReactDOM.render(<TRouter/>,document.getElementById('root'))
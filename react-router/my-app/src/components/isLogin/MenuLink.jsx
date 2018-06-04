import React,{Component} from 'react'
import { Route, Link } from '../../router';
import './MenuLink.css'
export default ({to,children})=>{
    return <Route path={to} children={props=>(
        <div className={props.match?"active":""}>
            <Link to={to}>{children}</Link>
        </div>
    )}></Route>
}


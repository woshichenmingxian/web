import React, { Component } from 'react';
// import {HashRouter as Router,Route,Link} from 'react-router-dom'
import {HashRouter as Router,Route,Link} from './router'
import './App.css';
import MenuLink from './components/isLogin/MenuLink.jsx'
export default class App extends Component {
  constructor(props){
    super(props)
  }
  componentWillMount(){

  }
  render() {
    return (
      <Router>
        <div className="main">
          <nav className="header">
            <div className="header-list">
              <MenuLink to="/home">首页</MenuLink>
              {/* <Link to="/home">首页</Link> */}
            </div>
            <div className="header-list">
              <MenuLink to="/user">用户</MenuLink>
              {/* <Link to="/user">用户</Link> */}
            </div>
            <div className="header-list">
              <MenuLink to="/Profile">个人中心</MenuLink>
            {/* <Link to="/Profile">个人中心</Link> */}
            </div>
          </nav>
          <div className="conctainer">
            {this.props.children}
          </div>
        </div> 
      </Router>
    );
  }
}



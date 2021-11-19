import React from 'react'
import { Switch, Route, Redirect } from "react-router-dom"
import Login from './routes/Login/index'
import Home from './routes/Home/index'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import './App.css';

class App extends React.Component {
  render() {
    return (
      // 最外部的Route不进行任何路由匹配，仅仅传递location
      <Route render={({ location }) => {
        console.log(location)
        return (
          < TransitionGroup key={location.key}>
            <CSSTransition classNames='fade' timeout={300}>
              <Switch>
                <Route path='/login' exact component={Login} />
                {/* <Route path='/home' component={Home} /> */}
                <Home />
                <Redirect to='/login' />
              </Switch>
            </CSSTransition>
          </TransitionGroup >
        )
      }} />
    )
  }
}
export default App;

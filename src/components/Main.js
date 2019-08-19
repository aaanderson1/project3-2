import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import Messages from './Messages'

const Main = () => (
  <main>
    <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/login' component={Login}/>
      <Route path='/messages' component={Messages}/>
    </Switch>
    </BrowserRouter>
  </main>
)

export default Main

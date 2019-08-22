import React from 'react'
import Main from './Main'
import Navbar from "./Navbar"
import Jumbotron from "./Jumbotron"
import InspirationModal from './InspirationModal'
import Sharemodal from './Sharemodal'



const App = () => (
  <div>
    <Navbar
        />
    <Jumbotron
        />
    <InspirationModal
        />
    <Sharemodal
        />
    <Main />
  </div>
)

export default App

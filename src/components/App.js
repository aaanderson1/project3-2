import React from 'react'
import Main from './Main'
import Navbar from "./Navbar"
import Jumbotron from "./Jumbotron"
import InspirationModal from './InspirationModal'
import Footer from './Footer'



const App = () => (
  <div>
      <Navbar />
    <Jumbotron
        />
    <InspirationModal
        />
    <Main />
    <Footer />
  </div>
)

export default App

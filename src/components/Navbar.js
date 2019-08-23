//sets up the reusable Navbar component
import "./navbar.scss";
import React from "react";
import "materialize-css/dist/css/materialize.min.css";
import { Navbar } from 'react-bootstrap';




function Navbarrender() {
  return (
<Navbar className="navbarcolor">
  <img src="https://i.pinimg.com/originals/20/c7/bc/20c7bcfe40f464961ed209e3deadf8b6.png" className="navbarlogo" height="100px" width="100px"></img>
</Navbar>
  );
}

export default Navbarrender;





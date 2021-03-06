import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import "./InspirationModal.scss";
import Quote from './quote';
import {Row} from "react-materialize";



class Modal extends Component {
  componentDidMount() {
    const options = {
      onOpenStart: () => {
        console.log("Open Start");
      },
      onOpenEnd: () => {
        console.log("Open End");
      },
      onCloseStart: () => {
        console.log("Close Start");
      },
      onCloseEnd: () => {
        console.log("Close End");
      },
      inDuration: 250,
      outDuration: 250,
      opacity: 0.5,
      dismissible: false,
      startingTop: "4%",
      endingTop: "10%"
    };
    M.Modal.init(this.Modal, options);
    // If you want to work on instance of the Modal then you can use the below code snippet 
    // let instance = M.Modal.getInstance(this.Modal);
    // instance.open();
    // instance.close();
    // instance.destroy();
  }

  render() {
    return (
      <Row>
        <a
          className="waves-effect waves-light btn modal-trigger inspirationModalBTN"
          data-target="modal1"
        >
          NEED INSPIRATION?
        </a>

        <div
          ref={Modal => {
            this.Modal = Modal;
          }}
          id="modal1"
          className="modal"
        >
          {/* If you want Bottom Sheet Modal then add 
        bottom-sheet class */}
          <div className="modal-content">
            <h4 className="modalHead">Generate a Quote Below!</h4>
            <h5 className="modalSubhead">Keep the conversation going with a selection of funny and inspirational sayings:</h5>
            <Quote />
          </div>
          <div class="modal-footer">
            <a href="#" class="modal-close waves-effect waves-red btn-flat">
              Close
            </a>
          </div>
          </div>
        </Row>
    );
  }
}

export default Modal;
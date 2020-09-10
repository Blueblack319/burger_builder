import React, { Component } from "react";

import Aux from "../../../hoc/Aux/Aux";
import Backdrop from "../Backdrop/Backdrop";

import classes from "./Modal.module.css";

class Modal extends Component {
  shouldComponentUpdate = (nextProps, nextState) => {
    return nextProps.ordered !== this.props.ordered;
  };

  componentDidUpdate = () => {
    console.log("[Modal.js] componentDidUpdate");
  };

  render() {
    return (
      <Aux>
        <Backdrop show={this.props.ordered} clicked={this.props.cancleOrder} />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.ordered
              ? "translateY(0)"
              : "translateY(-100vh)",
            opacity: this.props.ordered ? "1" : "0",
            zIndex: this.props.ordered ? "500" : "-1",
          }}
        >
          {this.props.children}
        </div>
      </Aux>
    );
  }
}

export default Modal;

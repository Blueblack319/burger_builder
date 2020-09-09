import React from "react";

import Aux from "../../../hoc/Aux/Aux";
import Backdrop from "../Backdrop/Backdrop";

import classes from "./Modal.module.css";

const Modal = (props) => {
  return (
    <Aux>
      <Backdrop show={props.ordered} clicked={props.cancleOrder} />
      <div
        className={classes.Modal}
        style={{
          tranform: props.ordered ? "translateY(0)" : "translateY(-100vh)",
          opacity: props.ordered ? "1" : "0",
        }}
      >
        {props.children}
      </div>
    </Aux>
  );
};

export default Modal;

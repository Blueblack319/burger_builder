import React from "react";

import classes from "./Modal.module.css";

const Modal = (props) => {
  return (
    <div
      className={classes.Modal}
      style={{
        tranform: props.ordered ? "translateY(0)" : "translateY(-100vh)",
        opacity: props.ordered ? "1" : "0",
      }}
    >
      {props.children}
    </div>
  );
};

export default Modal;

import React from "react";

<<<<<<< HEAD
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";

import classes from "./CheckoutSummary.module.css";

=======
import classes from "./CheckoutSummary.module.css";

import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";

>>>>>>> course
const CheckoutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes well!!</h1>
<<<<<<< HEAD
      <div style={{ width: "100%", height: "100%", margin: "auto" }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button btnType="Danger" clicked>
        CANCLE
      </Button>
      <Button btnType="Success" clicked>
=======
      <Burger ingredients={props.ingredients} />
      <Button btnType="Danger" clicked={props.checkoutCancled}>
        CANCLE
      </Button>
      <Button btnType="Success" clicked={props.checkoutContinued}>
>>>>>>> course
        CONTINUE
      </Button>
    </div>
  );
};

export default CheckoutSummary;

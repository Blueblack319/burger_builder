import React from "react";

import Aux from "../../../hoc/Aux/Aux";
import Button from "../../UI/Button/Button";

const OrderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map((igKey) => {
    return (
      <li key={igKey}>
        <span>{igKey}</span>: {props.ingredients[igKey]}
      </li>
    );
  });
  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>Continue to Checkout?</p>
      <p>
        <strong>Total Price: {props.price}$</strong>
      </p>
      <Button btnType="Danger" clicked={props.orderCancled}>
        Cancle
      </Button>
      <Button btnType="Success" clicked={props.orderContinued}>
        Continue
      </Button>
    </Aux>
  );
};

export default OrderSummary;

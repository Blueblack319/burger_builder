import React, { useState } from "react";

import classes from "./ContactData.module.css";

import axios from "../../../axios-orders";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Form/Input/Input";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";

import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions/index";
import { updatedObject, checkValidity } from "../../../shared/utility";

const ContactData = (props) => {
  const [orderForm, setOrderForm] = useState({
    name: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your name",
      },
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      value: "",
    },
    steet: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Street",
      },
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      value: "",
    },
    zipCode: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "ZIP Code",
      },
      validation: {
        required: true,
        minLength: 5,
        maxLength: 5,
      },
      valid: false,
      touched: false,
      value: "",
    },
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Your E-mail",
      },
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      value: "",
    },
    deliveryMethod: {
      elementType: "select",
      elementConfig: {
        options: [
          { value: "fastest", displayValue: "Fastest" },
          { value: "cheapest", displayValue: "Cheapest" },
        ],
      },
      validation: {},
      valid: true,
      value: "fastest",
    },
  });
  const [formIsValid, setFormIsValid] = useState(false);

  const handleOrderSubmitted = (event) => {
    event.preventDefault();
    const orderData = {};
    for (let orderElementIdentifier in orderForm) {
      orderData[orderElementIdentifier] =
        orderForm[orderElementIdentifier].value;
    }
    const order = {
      ingredients: props.ings,
      price: props.price,
      orderData,
      userId: props.userId,
    };
    props.onBurgerPurchased(order, props.idToken);
  };

  const handleInputChanged = (event, inputIdentifier) => {
    const updatedOrderElement = updatedObject(orderForm[inputIdentifier], {
      value: event.target.value,
      valid: checkValidity(
        event.target.value,
        orderForm[inputIdentifier].validation
      ),
      touched: true,
    });
    const updatedOrderForm = updatedObject(orderForm, {
      [inputIdentifier]: updatedOrderElement,
    });
    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }
    setOrderForm(updatedOrderForm);
    setFormIsValid(formIsValid);
  };

  const formElementArray = [];
  for (let key in orderForm) {
    formElementArray.push({
      id: key,
      config: orderForm[key],
    });
  }
  let form = (
    <form onSubmit={handleOrderSubmitted}>
      {formElementArray.map((formElement) => (
        <Input
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          changed={(event) => handleInputChanged(event, formElement.id)}
          shouldValidate={formElement.config.validation}
          touched={formElement.config.touched}
          invalid={!formElement.config.valid}
        />
      ))}
      <Button btnType="Success" disabled={!formIsValid}>
        Order
      </Button>
    </form>
  );
  if (props.loading) {
    form = <Spinner />;
  }

  return (
    <div className={classes.ContactData}>
      <h4>Enter your Contact Data</h4>
      {form}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilderReducer.ingredients,
    price: state.burgerBuilderReducer.totalPrice,
    loading: state.ordersReducer.loading,
    idToken: state.authReducer.idToken,
    userId: state.authReducer.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onBurgerPurchased: (orderData, idToken) =>
      dispatch(actionCreators.purchaseBurger(orderData, idToken)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));

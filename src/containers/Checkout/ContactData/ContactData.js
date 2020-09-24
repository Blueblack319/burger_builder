import React, { Component } from "react";

import classes from "./ContactData.module.css";

import axios from "../../../axios-orders";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Form/Input/Input";

import { connect } from "react-redux";

class ContactData extends Component {
  state = {
    formIsValid: false,
    loading: false,
  };

  handleOrderSubmitted = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const orderData = {};
    for (let orderElementIdentifier in this.props.orderForm) {
      orderData[orderElementIdentifier] = this.props.orderForm[
        orderElementIdentifier
      ].value;
    }
    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData,
    };

    axios({
      method: "post",
      url: "orders.json",
      data: order,
    })
      .then((response) => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch((error) => this.setState({ loading: false }));
  };

  checkValidity = (value, rules) => {
    let isValid = true;
    // if (rules) {
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    // }
    return isValid;
  };

  handleInputChanged = (event, inputIdentifier) => {
    const updatedOrderForm = { ...this.props.orderForm };
    const updatedOrderElement = { ...updatedOrderForm[inputIdentifier] };
    updatedOrderElement.value = event.target.value;
    updatedOrderElement.valid = this.checkValidity(
      updatedOrderElement.value,
      updatedOrderElement.validation
    );
    updatedOrderElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedOrderElement;
    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({ orderForm: updatedOrderForm, formIsValid });
  };

  render() {
    const formElementArray = [];
    for (let key in this.props.orderForm) {
      formElementArray.push({
        id: key,
        config: this.props.orderForm[key],
      });
    }
    let form = (
      <form onSubmit={this.handleOrderSubmitted}>
        {formElementArray.map((formElement) => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            changed={(event) => this.handleInputChanged(event, formElement.id)}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            invalid={!formElement.config.valid}
          />
        ))}
        <Button btnType="Success" disabled={!this.state.formIsValid}>
          Order
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.orderReducer.ingredients,
    price: state.orderReducer.totalPricprops,
    orderForm: state.orderReducer.orderForm,
  };
};

export default connect(mapStateToProps)(ContactData);

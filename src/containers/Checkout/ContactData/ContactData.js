import React, { Component } from "react";

import classes from "./ContactData.module.css";

import axios from "../../../axios-orders";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Form/Input/Input";

import { connect } from "react-redux";
import actionTypes from "../../../store/actions/actionTypes";

class ContactData extends Component {
  state = {
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
            changed={(event) => this.props.onChangeInput(event, formElement.id)}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            invalid={!formElement.config.valid}
          />
        ))}
        <Button btnType="Success" disabled={!this.props.formIsValid}>
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
    ings: state.burgerBuilderReducer.ingredients,
    price: state.burgerBuilderReducer.totalPrice,
    orderForm: state.orderReducer.orderForm,
    formIsValid: state.orderReducer.formIsValid,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeInput: (event, inputIdentifier) =>
      dispatch({ type: actionTypes.CHANGE_INPUT, event, inputIdentifier }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactData);

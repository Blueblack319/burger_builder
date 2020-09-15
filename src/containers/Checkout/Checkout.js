import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";

class Checkout extends Component {
  state = {
    ingredients: {
      salad: 1,
      bacon: 1,
      meat: 1,
      cheese: 1,
    },
  };

  componentDidMount() {
    const ingredients = { ...this.props.location.state.ingredients };
    this.setState({ ingredients });
  }

  handleCheckoutCancled = () => {
    this.props.history.goBack();
  };

  handleCheckoutContinued = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    console.log(this.props);
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCancled={this.handleCheckoutCancled}
          checkoutContinued={this.handleCheckoutContinued}
        />
        ;
      </div>
    );
  }
}

export default Checkout;

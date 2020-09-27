import React, { Component } from "react";

import Order from "../../components/Order/Order";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/index";

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };

  componentDidMount() {
    this.props.onFetchOrders(this.props.idToken, this.props.userId);
  }

  render() {
    let orders = <Spinner />;
    if (!this.props.loading) {
      orders = this.props.orders.map((order) => {
        return (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={order.price}
          />
        );
      });
    }
    return <div>{orders}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.ordersReducer.orders,
    loading: state.ordersReducer.loading,
    idToken: state.authReducer.idToken,
    userId: state.authReducer.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: (idToken, userId) =>
      dispatch(actionCreators.fetchOrders(idToken, userId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));

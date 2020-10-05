import React, { useEffect } from "react";

import Order from "../../components/Order/Order";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/index";

const Orders = (props) => {
  const { idToken, userId } = props;
  useEffect(() => {
    props.onFetchOrders(idToken, userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idToken, userId]);

  let orders = <Spinner />;
  if (!props.loading) {
    orders = props.orders.map((order) => {
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
};

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

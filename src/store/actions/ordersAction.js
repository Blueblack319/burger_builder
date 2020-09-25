import actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const purchaseBurgerSuccessed = (orderId, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESSED,
    orderId,
    orderData,
  };
};

export const purchaseBurgerFailed = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAILED,
    error,
  };
};

export const purchaseBurgerStarted = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_STARTED,
  };
};

export const purchaseBurger = (order) => {
  return (dispatch) => {
    dispatch(purchaseBurgerStarted());
    axios({
      method: "post",
      url: "orders.json",
      data: order,
    })
      .then((res) => {
        dispatch(purchaseBurgerSuccessed(res.data.name, order));
      })
      .catch((error) => dispatch(purchaseBurgerFailed(error)));
  };
};

export const initPurchase = () => {
  return {
    type: actionTypes.INIT_PURCHASE,
  };
};

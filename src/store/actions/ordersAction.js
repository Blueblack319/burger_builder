import actionTypes from "./actionTypes";
import axios from "../../axios-orders";

const purchaseBurgerSuccessed = (orderId, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESSED,
    orderId,
    orderData,
  };
};

const purchaseBurgerFailed = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAILED,
    error,
  };
};

export const purchaseBurgerStarted = (order) => {
  return (dispatch) => {
    axios({
      method: "post",
      url: "orders.json",
      data: order,
    })
      .then((response) => {
        console.log(response);
        dispatch(purchaseBurgerSuccessed(response.id, order));
      })
      .catch((error) => dispatch(purchaseBurgerFailed(error)));
  };
};

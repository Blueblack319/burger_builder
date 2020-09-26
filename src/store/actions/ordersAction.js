import actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const initPurchase = () => {
  return {
    type: actionTypes.INIT_PURCHASE,
  };
};

const purchaseBurgerSuccessed = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCEEDED,
    id,
    orderData,
  };
};

const purchaseBurgerFailed = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAILED,
    error,
  };
};

const purchaseBurgerStarted = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_STARTED,
  };
};

export const purchaseBurger = (order, idToken) => {
  return (dispatch) => {
    dispatch(purchaseBurgerStarted());
    axios({
      method: "post",
      url: `orders.json?auth=${idToken}`,
      data: order,
    })
      .then((res) => {
        dispatch(purchaseBurgerSuccessed(res.data.name, order));
      })
      .catch((error) => dispatch(purchaseBurgerFailed(error)));
  };
};

const fetchOrdersSucceeded = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCEEDED,
    orders,
  };
};

const fetchOrdersFailed = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAILED,
    error,
  };
};

const fetchOrdersStarted = () => {
  return {
    type: actionTypes.FETCH_ORDERS_STARTED,
  };
};

export const fetchOrders = (idToken) => {
  return (dispatch) => {
    dispatch(fetchOrdersStarted());
    axios({
      method: "get",
      url: `orders.json?auth=${idToken}`,
    })
      .then((res) => {
        const orders = [];
        for (let key in res.data) {
          orders.push({
            ...res.data[key],
            id: key,
          });
        }
        dispatch(fetchOrdersSucceeded(orders));
      })
      .catch((error) => {
        dispatch(fetchOrdersFailed(error));
      });
  };
};

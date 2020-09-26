import actionTypes from "./actionTypes";
import axios from "../../axios-orders";

const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData,
  };
};

const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error,
  };
};

const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const auth = (email, password) => {
  return (dispatch) => {
    dispatch(authStart());
    axios({
      method: "post",
      url: "auth.json",
    })
      .then((res) => {
        const authData = {
          email,
          password,
        };
        dispatch(authSuccess(authData));
      })
      .catch((error) => {
        dispatch(authFail(error));
      });
  };
};

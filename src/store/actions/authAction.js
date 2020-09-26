import actionTypes from "./actionTypes";
import axios from "../../axios-orders";

const API_KEY = "AIzaSyBpOCU_QrvEE_-dIPMC97gFJalvsEFZGGc";

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
    const authData = {
      email,
      password,
      returnSecureToken: true,
    };
    axios({
      method: "post",
      url: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
      data: authData,
    })
      .then((res) => {
        console.log(res);
        dispatch(authSuccess(res.data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(authFail(error));
      });
  };
};

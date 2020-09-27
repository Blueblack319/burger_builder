import actionTypes from "./actionTypes";
import axios from "../../axios-orders";

const API_KEY = "AIzaSyBpOCU_QrvEE_-dIPMC97gFJalvsEFZGGc";

const authSuccess = (idToken, localId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken,
    localId,
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

export const authLogout = () => {
  localStorage.removeItem("idToken");
  localStorage.removeItem("userId");
  localStorage.removeItem("expirationDate");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(authLogout());
    }, expirationTime * 1000);
  };
};

export const auth = (email, password, isSignUp) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email,
      password,
      returnSecureToken: true,
    };
    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
    if (!isSignUp) {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
    }
    axios({
      method: "post",
      url,
      data: authData,
    })
      .then((res) => {
        localStorage.setItem("idToken", res.data.idToken);
        localStorage.setItem("userId", res.data.localId);
        localStorage.setItem(
          "expirationDate",
          new Date(new Date().getTime() + res.data.expiresIn * 1000)
        );
        dispatch(authSuccess(res.data.idToken, res.data.localId));
        dispatch(checkAuthTimeout(res.data.expiresIn));
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          dispatch(authFail(error.response.data.error));
        } else {
          dispatch(authFail(error));
        }
      });
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path,
  };
};

export const checkAuthState = () => {
  return (dispatch) => {
    const idToken = localStorage.getItem("idToken");
    const userId = localStorage.getItem("userId");
    const expirationDate = new Date(localStorage.getItem("expirationDate"));
    if (!idToken) {
      dispatch(authLogout());
    } else {
      if (expirationDate > new Date()) {
        dispatch(authSuccess(idToken, userId));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};

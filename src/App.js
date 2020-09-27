import React, { Component } from "react";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";

import Layout from "./hoc/Layout/Layout";

<<<<<<< HEAD
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Spinner from "./components/UI/Spinner/Spinner";

const BurgerBuilder = lazy(() =>
  import("./containers/BurgerBuilder/BurgerBuilder")
);
const Checkout = lazy(() => import("./containers/Checkout/Checkout"));
=======
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import * as actionCreators from "./store/actions/index";
>>>>>>> course

class App extends Component {
  componentDidMount() {
    this.props.onCheckAuthState();
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/auth" component={Auth} />
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path="/" exact component={BurgerBuilder} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={Auth} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
<<<<<<< HEAD
      <Router>
        <div className="App">
          <Layout />
          <Switch>
            <Redirect from="/" to="/burger-builder" exact />
            <Suspense fallback={<Spinner />}>
              <Route path="/burger-builder" component={BurgerBuilder} />
              <Route path="/checkout" component={Checkout} />
            </Suspense>
          </Switch>
        </div>
      </Router>
=======
      <div className="App">
        <Layout>{routes}</Layout>
      </div>
>>>>>>> course
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.authReducer.idToken != null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCheckAuthState: () => dispatch(actionCreators.checkAuthState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

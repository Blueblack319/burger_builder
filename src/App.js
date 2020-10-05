import React, { useEffect } from "react";
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
import Logout from "./containers/Auth/Logout/Logout";
import * as actionCreators from "./store/actions/index";
>>>>>>> course

const Auth = React.lazy(() => import("./containers/Auth/Auth"));

const Checkout = React.lazy(() => import("./containers/Checkout/Checkout"));

const Orders = React.lazy(() => import("./containers/Orders/Orders"));

const App = (props) => {
  useEffect(() => {
    props.onCheckAuthState();
  }, []);

  let routes = (
    <Switch>
      <Route path="/" exact component={BurgerBuilder} />
      <Route path="/auth" render={() => <Auth />} />
      <Redirect to="/" />
    </Switch>
  );
  if (props.isAuth) {
    routes = (
      <Switch>
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/checkout" render={(props) => <Checkout {...props} />} />
        <Route path="/orders" render={() => <Orders />} />
        <Route path="/logout" component={Logout} />
        <Route path="/auth" render={() => <Auth />} />
        <Redirect to="/" />
      </Switch>
    );
<<<<<<< HEAD
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
=======
>>>>>>> 670d7cb61f6ad5b5bba3fa441f9ce54b7207e46c
  }
  return (
    <div className="App">
      <Layout>
        <React.Suspense fallback={<div>Loading...</div>}>
          {routes}
        </React.Suspense>
      </Layout>
    </div>
  );
};

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

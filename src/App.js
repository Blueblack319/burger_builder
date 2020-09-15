import React, { Component, Suspense, lazy } from "react";
import "./App.css";

import Layout from "./hoc/Layout/Layout";

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

class App extends Component {
  render() {
    return (
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
    );
  }
}

export default App;

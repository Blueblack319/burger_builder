import React, { Component } from "react";

import Aux from "../Aux/Aux";

import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

import { connect } from "react-redux";

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  handleOpenSideDrawer = () => {
    this.setState({ showSideDrawer: true });
  };
  handleCloseSideDrawer = () => {
    this.setState((prevState) => ({
      showSideDrawer: !prevState.showSideDrawer,
    }));
  };

  render() {
    return (
      <Aux>
        <Toolbar
          isAuth={this.props.isAuth}
          openSideDrawer={this.handleOpenSideDrawer}
        />
        <SideDrawer
          opened={this.state.showSideDrawer}
          close={this.handleCloseSideDrawer}
          isAuth={this.props.isAuth}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.authReducer.idToken != null,
  };
};

export default connect(mapStateToProps)(Layout);

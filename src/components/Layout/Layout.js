import React, { Component } from "react";

import Aux from "../../hoc/Aux/Aux";

import classes from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

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
        <Toolbar openSideDrawer={this.handleOpenSideDrawer} />
        <SideDrawer
          opened={this.state.showSideDrawer}
          close={this.handleCloseSideDrawer}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;

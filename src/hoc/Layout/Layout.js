import React, { useState } from "react";

import Aux from "../Aux/Aux";

import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

import { connect } from "react-redux";

const Layout = (props) => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const handleOpenSideDrawer = () => {
    setShowSideDrawer(true);
  };
  const handleCloseSideDrawer = () => {
    setShowSideDrawer((prevState) => !prevState);
  };

  return (
    <Aux>
      <Toolbar isAuth={props.isAuth} openSideDrawer={handleOpenSideDrawer} />
      <SideDrawer
        opened={showSideDrawer}
        close={handleCloseSideDrawer}
        isAuth={props.isAuth}
      />
      <main className={classes.Content}>{props.children}</main>
    </Aux>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.authReducer.idToken != null,
  };
};

export default connect(mapStateToProps)(Layout);

import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Aux from "../../../hoc/Aux/Aux";

import classes from "./SideDrawer.module.css";
import Backdrop from "../../UI/Backdrop/Backdrop";

const SideDrawer = (props) => {
  let sideDrawerClasses = [classes.SideDrawer, classes.Open];

  if (!props.opened) {
    sideDrawerClasses = [classes.SideDrawer, classes.Close];
  }
  return (
    <Aux>
      <Backdrop show={props.opened} clicked={props.close} />
      <div className={sideDrawerClasses.join(" ")}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuth={props.isAuth} />
        </nav>
      </div>
    </Aux>
  );
};

export default SideDrawer;

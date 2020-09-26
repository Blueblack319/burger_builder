import React from "react";

import classes from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../DrawerToggle/DrawerToggle";

const Toolbar = (props) => (
  <header className={classes.Toolbar}>
    <DrawerToggle clicked={props.openSideDrawer} />
    <div className={[classes.Logo, classes.DesktopOnly].join(" ")}>
      <Logo />
    </div>
    <nav className={classes.DesktopOnly}>
      <NavigationItems isAuth={props.isAuth} />
    </nav>
  </header>
);

export default Toolbar;

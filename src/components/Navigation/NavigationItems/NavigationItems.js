import React from "react";

import classes from "./NavigationItems.module.css";

import NavigationItem from "./NavigationItem/NaviagtionItem";

const NavigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" exact>
      Burger Builder
    </NavigationItem>
    <NavigationItem link="/orders">Orders</NavigationItem>
    {!props.isAuth ? (
      <NavigationItem link="/auth">Authentication</NavigationItem>
    ) : (
      <NavigationItem link="/logout">Logout</NavigationItem>
    )}
  </ul>
);

export default NavigationItems;

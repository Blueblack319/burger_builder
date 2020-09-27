import React from "react";

import classes from "./NavigationItems.module.css";

import NavigationItem from "./NavigationItem/NaviagtionItem";

const NavigationItems = (props) => (
  <ul className={classes.NavigationItems}>
<<<<<<< HEAD
    <NavigationItem link="/burger-builder">Burger Builder</NavigationItem>
    <NavigationItem link="/checkout">Checkout</NavigationItem>
=======
    <NavigationItem link="/" exact>
      Burger Builder
    </NavigationItem>
    {props.isAuth ? (
      <NavigationItem link="/orders">Orders</NavigationItem>
    ) : null}
    {!props.isAuth ? (
      <NavigationItem link="/auth">Authentication</NavigationItem>
    ) : (
      <NavigationItem link="/logout">Logout</NavigationItem>
    )}
>>>>>>> course
  </ul>
);

export default NavigationItems;

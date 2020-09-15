import React from "react";

import classes from "./NavigationItems.module.css";

import NavigationItem from "./NavigationItem/NaviagtionItem";

const NavigationItems = () => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/burger-builder">Burger Builder</NavigationItem>
    <NavigationItem link="/checkout">Checkout</NavigationItem>
  </ul>
);

export default NavigationItems;

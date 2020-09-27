import React from "react";
import { NavLink } from "react-router-dom";

import "./NavigationItem.css";

<<<<<<< HEAD
const NavigationItem = (props) => {
  return (
    <li className="NavigationItem">
      <NavLink to={props.link}>{props.children}</NavLink>
    </li>
  );
};
=======
const NavigationItem = (props) => (
  <li className={classes.NavigationItem}>
    {/* <NavLink to={props.link} activeClassName={classes.active} exact> */}
    <NavLink
      to={props.link}
      activeClassName={classes.active}
      exact={props.exact}
    >
      {props.children}
    </NavLink>
  </li>
);
>>>>>>> course

export default NavigationItem;

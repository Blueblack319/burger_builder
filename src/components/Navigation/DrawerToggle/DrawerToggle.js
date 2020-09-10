import React from "react";

import classes from "./DrawerToggle.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Menu = (props) => (
  <div onClick={props.clicked} className={classes.Menu}>
    <FontAwesomeIcon icon={faBars} size="2x" />
  </div>
);

export default Menu;

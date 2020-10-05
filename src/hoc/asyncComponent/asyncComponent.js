import React, { useEffect, useState } from "react";

const asyncComponent = (importComponent) => {
  return (props) => {
    const [component, setComponent] = useState(null);
    // state = {
    //   component: null,
    // };
    useEffect(() => {
      importComponent().then((cmp) => setComponent(cmp.default));
    }, []);
    // componentDidMount() {
    //   importComponent().then((cmp) =>
    //     this.setState({ component: cmp.default })
    //   );
    // }

    const C = component;
    return C ? <C {...props} /> : null;
  };
};

export default asyncComponent;

import React from "react";
import "./App.css";

<<<<<<< HEAD
import Layout from "./hoc/Layout/Layout";
=======
import Layout from "./containers/Layout/Layout";
>>>>>>> 95c2bdfe99b2c30e4fdb9a9f4faf337855903721
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";

function App() {
  return (
    <div className="App">
      <Layout>
        <BurgerBuilder />
      </Layout>
    </div>
  );
}

export default App;

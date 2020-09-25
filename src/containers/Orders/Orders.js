import React, { Component } from "react";

import Order from "../../components/Order/Order";
import axios from "../../axios-orders";

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };

  componentDidMount() {
    axios({
      method: "get",
      url: "orders.json",
    })
      .then((res) => {
        const orders = [];
        for (let key in res.data) {
          orders.push({
            id: key,
            ...res.data[key],
          });
        }
        this.setState({ loading: false, orders });
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
  }

  render() {
    const orders = this.state.orders.map((order) => {
      return (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={order.price}
        />
      );
    });
    return <div>{orders}</div>;
  }
}

export default Orders;

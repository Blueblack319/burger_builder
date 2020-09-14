import React, { Component } from "react";
import Modal from "../../components/UI/Modal/Modal";

import Aux from "../Aux/Aux";

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: false,
    };

    componentDidMount = () => {
      axios.interceptors.request.use((req) => {
        this.setState({ error: false });
        return req;
      });
      axios.interceptors.response.use(
        (res) => res,
        (error) => this.setState({ error })
      );
    };

    handleConfirmError = () => {
      this.setState({ error: false });
    };

    render() {
      return (
        <Aux>
          <Modal
            ordered={this.state.error}
            cancleOrder={this.handleConfirmError}
          >
            {this.state.error.message}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default withErrorHandler;

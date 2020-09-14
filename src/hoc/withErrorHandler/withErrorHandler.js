import React, { Component } from "react";
import Modal from "../../components/UI/Modal/Modal";

import Aux from "../Aux/Aux";

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.reqInterceptors = axios.interceptors.request.use((req) => {
        this.setState({ error: false });
        return req;
      });
      this.resInterceptors = axios.interceptors.response.use(
        (res) => res,
        (error) => this.setState({ error })
      );
      console.log("[withErrorHandler.js] Constructor");
    }

    state = {
      error: false,
    };

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptors);
      axios.interceptors.response.eject(this.resInterceptors);
    }

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

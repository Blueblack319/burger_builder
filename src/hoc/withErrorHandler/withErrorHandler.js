import React, { useEffect, useState } from "react";
import Modal from "../../components/UI/Modal/Modal";

import Aux from "../Aux/Aux";

const withErrorHandler = (WrappedComponent, axios) => {
  return (props) => {
    let reqInterceptors = null;
    let resInterceptors = null;
    const [isError, setIsError] = useState(false);

    useEffect(() => {
      reqInterceptors = axios.interceptors.request.use(
        (req) => {
          setIsError(false);
          return req;
        },
        (err) => {
          setIsError(err);
          return Promise.reject(err);
        }
      );
      resInterceptors = axios.interceptors.response.use(
        (res) => {
          setIsError(false);
          return res;
        },
        (err) => {
          setIsError(err);
          return Promise.reject(err);
        }
      );
    }, [reqInterceptors, resInterceptors]);
    //   constructor(props) {
    //   super(props);
    //   this.state = {
    //     error: false,
    //   };
    //   this.reqInterceptors = axios.interceptors.request.use(
    //     (req) => {
    //       this.setState({ error: false });
    //       return req;
    //     },
    //     (error) => this.setState({ error })
    //   );
    //   this.resInterceptors = axios.interceptors.response.use(
    //     (res) => res,
    //     (error) => this.setState({ error })
    //   );
    // }

    useEffect(() => {
      return () => {
        axios.interceptors.request.eject(reqInterceptors);
        axios.interceptors.response.eject(resInterceptors);
      };
    });

    // componentWillUnmount() {
    //   axios.interceptors.request.eject(this.reqInterceptors);
    //   axios.interceptors.response.eject(this.resInterceptors);
    // }

    const handleConfirmError = () => {
      setIsError(false);
      // this.setState({ error: false });
    };

    return (
      <Aux>
        <Modal ordered={isError} cancleOrder={handleConfirmError}>
          {isError.message}
        </Modal>
        <WrappedComponent {...props} />
      </Aux>
    );
  };
};

export default withErrorHandler;

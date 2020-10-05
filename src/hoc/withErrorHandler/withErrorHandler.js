import React, { useEffect, useState } from "react";
import Modal from "../../components/UI/Modal/Modal";

import Aux from "../Aux/Aux";

const withErrorHandler = (WrappedComponent, axios) => {
  return (props) => {
    const [error, setError] = useState(null);

    const reqInterceptors = axios.interceptors.request.use(
      (req) => {
        setError(null);
        return req;
      },
      (err) => {
        setError(err.message);
        return Promise.reject(err);
      }
    );
    const resInterceptors = axios.interceptors.response.use(
      (res) => {
        setError(null);
        return res;
      },
      (err) => {
        setError(err.message);
        return Promise.reject(err);
      }
    );

    useEffect(() => {
      return () => {
        axios.interceptors.request.eject(reqInterceptors);
        axios.interceptors.response.eject(resInterceptors);
      };
    }, [reqInterceptors, resInterceptors]);

    const handleConfirmError = () => {
      setError(null);
    };
    return (
      <Aux>
        <Modal ordered={error} cancleOrder={handleConfirmError}>
          {error}
        </Modal>
        <WrappedComponent {...props} />
      </Aux>
    );
  };
};

export default withErrorHandler;

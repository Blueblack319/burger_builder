import React from "react";
import Modal from "../../components/UI/Modal/Modal";
import useHandleHttpError from "../../hooks/handle-http-error";
import Aux from "../Aux/Aux";

const withErrorHandler = (WrappedComponent, axios) => {
  return (props) => {
    const [error, handleErrorConfirmed] = useHandleHttpError(axios);
    return (
      <Aux>
        <Modal ordered={error} cancleOrder={handleErrorConfirmed}>
          {error}
        </Modal>
        <WrappedComponent {...props} />
      </Aux>
    );
  };
};

export default withErrorHandler;

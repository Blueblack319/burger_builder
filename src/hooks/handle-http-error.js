import { useState, useEffect } from "react";

export default (httpClient) => {
  const [error, setError] = useState(null);

  const reqInterceptors = httpClient.interceptors.request.use(
    (req) => {
      setError(null);
      return req;
    },
    (err) => {
      setError(err.message);
      return Promise.reject(err);
    }
  );
  const resInterceptors = httpClient.interceptors.response.use(
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
      httpClient.interceptors.request.eject(reqInterceptors);
      httpClient.interceptors.response.eject(resInterceptors);
    };
  }, [reqInterceptors, resInterceptors]);

  const handleErrorConfirmed = () => setError(null);
  return [error, handleErrorConfirmed];
};

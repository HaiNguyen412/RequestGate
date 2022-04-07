import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <Spinner
      animation="bolder"
      role="status"
      className="w-24 h-24 m-auto block"
    >
      <span className="sr-only">Loading...</span>
    </Spinner>
  );
};

export default Loader;

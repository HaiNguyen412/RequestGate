import React from "react";
import PropTypes from "prop-types";

function Button({ type, className, children, onClick }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${className} rounded-md py-2 px-5`}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;

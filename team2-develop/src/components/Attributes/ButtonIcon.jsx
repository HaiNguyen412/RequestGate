import PropTypes from "prop-types";
import React from "react";

function ButtonIcon({ handleClick, className, children }) {
  return (
    <div
      onClick={handleClick}
      className={`${className} cursor-pointer p-2 text-white text-2xl w-8 h-6 flex justify-center items-center rounded-md`}
    >
      {children}
    </div>
  );
}
ButtonIcon.propTypes = {
  handleClick: PropTypes.func,
  className: PropTypes.string,
};

export default ButtonIcon;

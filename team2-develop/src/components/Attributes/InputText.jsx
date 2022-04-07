import PropTypes from "prop-types";
import React from "react";

function InputText({
  title,
  type,
  value,
  handleChange,
  placeholder,
  className,
}) {
  return (
    <div className="space-y-2">
      <p>{title}</p>
      <input
        required
        onChange={handleChange}
        value={value}
        type={type}
        placeholder={placeholder}
        className={`${className} w-full border border-slate-900 focus-visible:outline-none focus-visible:pl-1 py-1 placeholder-shown:pl-1 pl-1`}
      />
    </div>
  );
}
InputText.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  handleChange: PropTypes.func,
  className: PropTypes.string,
};

export default InputText;

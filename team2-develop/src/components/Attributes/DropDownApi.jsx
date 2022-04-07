import React, { useEffect, useRef, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import PropTypes from "prop-types";

function DropDownApi({ arrayList, className, title, setDataItem, name}) {
  const [content, setContent] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, []);

  return (
    <div className={className}>
      <div
        ref={ref}
        onClick={() => {
          setOpen((open) => !open);
        }}
        className={`${open ? "rounded-b-none border-b-0" : ""
          } border relative border-slate-900 h-9 cursor-pointer`}
      >
        <div className="flex justify-between items-center h-full w-full">
          <p className="pl-3 text-base">{content === "" ? title : content}</p>
          <IoMdArrowDropdown className=" mr-3" />
        </div>
        <div
          className={`${open ? "visible" : "invisible"
            } absolute z-30 bg-white top-full outline-1 outline outline-slate-900 w-full`}
        >
          {arrayList.map((title, index) => (
            <div
              key={index}
              onClick={() => {
                setContent(title[name]);
                setDataItem(title.user_id);
              }}
              className="pl-3 py-1 hover:bg-slate-400"
            >
              {title.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

DropDownApi.propTypes = {
  text: PropTypes.string,
  arrayList: PropTypes.array,
  className: PropTypes.string,
  title: PropTypes.string,
};

export default DropDownApi;

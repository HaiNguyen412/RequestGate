import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

function DropDownCategory({
  arrayList,
  className,
  item,
  setItem,
  category,
  category_id,
  assignee,
  assignee_id,
}) {
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
        className={`${
          open ? "rounded-b-none border-b-0" : ""
        } border relative border-slate-900 h-9 cursor-pointer`}
      >
        <div className="flex justify-between items-center h-full w-full">
          <p className="pl-3 text-base">{item[category]}</p>
          <IoMdArrowDropdown className=" mr-3" />
        </div>
        <div
          className={`${
            open ? "visible" : "invisible"
          } absolute bg-white top-full overflow-auto h-36 outline-1 outline outline-slate-900 w-full`}
        >
          {arrayList &&
            arrayList.map((title, index) => (
              <div
                key={index}
                onClick={() => {
                  setItem((value) => {
                    const tmp = JSON.parse(JSON.stringify(value));
                    tmp[category_id] = title.id;
                    tmp[category] = title.name;
                    tmp[assignee_id] = title.id;
                    tmp[assignee] = title.email;
                    return { ...tmp };
                  });
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
DropDownCategory.propTypes = {
  item: PropTypes.object,
  arrayList: PropTypes.array,
  className: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  setItem: PropTypes.func,
};
export default DropDownCategory;

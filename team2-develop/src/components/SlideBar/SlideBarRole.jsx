import React from "react";
import { Link, useLocation } from "react-router-dom";
function SlideBarRole({ listSlideBar, isChange }) {
  const location = useLocation();
  return (
    <div>
      {listSlideBar.map((list, index) => (
        <Link
          to={`/${list.title.split(" ").join("")}`}
          className={`${
            list.title.split(" ").join("") ===
            location.pathname.slice(1, location.pathname.length)
              ? "bg-gray-light text-slide-bar"
              : "text-white"
          } text-sm pl-3 py-3 cursor-pointer flex items-center hover:bg-gray-light hover:text-slide-bar`}
          key={index}
        >
          <div>{list.icon}</div>
          {!isChange ? <p className="pl-3 capitalize">{list.title}</p> : ""}
        </Link>
      ))}
    </div>
  );
}

export default SlideBarRole;

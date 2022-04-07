import PropTypes from "prop-types";
import React from "react";
import { COLOR_STATUS, REQUEST_STATUS } from "../../constants/useConstant";
function Table({ listObject, listHeader, handleDetail }) {
  let countSTT = 1;
  return (
    <table className="border-collapse border table-auto w-full text-sm">
      <thead>
        <tr className="even:bg-slate-100">
          {listHeader.map((title, index) => (
            <th
              key={index}
              className="border-b font-medium p-4 text-black  text-left"
            >
              {title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white group">
        {listObject &&
          listObject.map((list) => (
            <tr
              key={list.id}
              onClick={() => handleDetail(list.id)}
              className="even:bg-slate-100 cursor-pointer text-black hover:text-red-500"
            >
              <td className="border-b border-slate-100 p-4  ">{countSTT++}</td>
              <td className="border-b border-slate-100 p-4  ">{list.title}</td>
              <td className="border-b border-slate-100 p-4">
                {list.description}
              </td>
              <td className="border-b border-slate-100 p-4  ">{list.author}</td>
              <td className="border-b border-slate-100 p-4  ">
                {new Date(Date.parse(list.created_at))
                  .toLocaleString("vi-VN")
                  .split(",")
                  .reverse()
                  .join(" ")}
              </td>
              <td className="border-b border-slate-100 p-4  ">
                {list.category}
              </td>
              <td className="border-b border-slate-100 p-4  ">
                {list.assignee}
              </td>
              <td className="border-b border-slate-100 p-4  ">
                <div
                  className={`bg-fit ${
                    COLOR_STATUS[list.status]
                   
                  }  w-20 text-center py-1 capitalize text-xs text-white`}
                >
                  {REQUEST_STATUS[list.status]}
                </div>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

Table.propTypes = {
  listObject: PropTypes.arrayOf(PropTypes.object),
  listHeader: PropTypes.array,
  handleDetail: PropTypes.func,
};

export default Table;

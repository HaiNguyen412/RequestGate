import PropTypes from "prop-types";
import React from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { APPROVE_MANAGER, REQUEST_STATUS } from "../../constants/useConstant";
import ButtonIcon from "./ButtonIcon";
function TableAdminRequest({ dataRequestList, titleHeader, handleEdit }) {
  return (
    <table className="border-collapse border table-auto w-full text-sm">
      <thead>
        <tr className="even:bg-slate-100">
          {titleHeader.map((title, index) => (
            <th
              key={index}
              className="border-b font-medium p-4 text-black  text-left"
            >
              {title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white">
        {dataRequestList.map((request, index) => (
          <tr key={index} className="even:bg-slate-100">
            <td className="border-b border-slate-100 p-4 text-black">
              {index + 1}
            </td>
            <td className="border-b border-slate-100 p-4 text-black">
              {request.title}
            </td>
            <td className="border-b border-slate-100 p-4 text-black">
              {request.description}
            </td>
            <td className="border-b border-slate-100 p-4 text-black">
              {request.author}
            </td>
            <td className="border-b border-slate-100 p-4 text-black">
              {request.category}
            </td>
            <td className="border-b border-slate-100 p-4 text-black">
            {new Date(Date.parse(request.created_at))
                  .toLocaleString("vi-VN")
                  .split(",")
                  .reverse()
                  .join(" ")}
            </td>
            <td className="border-b border-slate-100 p-4 text-black">
            {new Date(Date.parse(request.due_date))
                  .toLocaleString("vi-VN")
                  .split(",")
                  .reverse()
                  .join(" ")}
            </td>
            <td className="border-b border-slate-100 p-4 text-black">
              {APPROVE_MANAGER[request.approval]}
            </td>
            <td className="border-b border-slate-100 p-4 text-black">
              {REQUEST_STATUS[request.status]}
            </td>
            <td className="grid gap-1 grid-cols-2 p-4">
              <ButtonIcon
                handleClick={() => handleEdit(request)}
                className="bg-purple-500"
              >
                <AiOutlineEdit />
              </ButtonIcon>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

TableAdminRequest.propTypes = {
  arrayObject: PropTypes.arrayOf(PropTypes.object),
  arrayHeader: PropTypes.array,
  handleEdit: PropTypes.func,
  handleDelete: PropTypes.func,
};

export default TableAdminRequest;
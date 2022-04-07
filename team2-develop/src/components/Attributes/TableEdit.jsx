import PropTypes from "prop-types";
import React from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { INITIAL_ROLE, REQUEST_STATUS } from "../../constants/useConstant";
import ButtonIcon from "./ButtonIcon";
function TableEdit({
  listRequest,
  listKeyRequest,
  handleEdit,
  userInfo,
  handleDelete,
}) {
  let countSTT = 1;
  return (
    <table className="border-collapse bg-white border table-auto w-full text-sm">
      <thead>
        <tr className="even:bg-slate-100">
          {listKeyRequest.map((title, index) => (
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
        {listRequest &&
          listRequest.map((list) => (
            <tr key={list.id} className="even:bg-slate-100">
              <td className="border-b border-slate-100 p-4 text-black ">
                {countSTT++}
              </td>
              <td className="border-b border-slate-100 p-4 text-black ">
                {list.title}
              </td>
              <td className="border-b border-slate-100 p-4 text-black ">
                {list.description}
              </td>
              <td className="border-b border-slate-100 p-4 text-black ">
                {list.author}
              </td>
              <td className="border-b border-slate-100 p-4 text-black ">
                {new Date(Date.parse(list.created_at))
                  .toLocaleString("vi-VN")
                  .split(",")
                  .reverse()
                  .join(" ")}
              </td>
              <td className="border-b border-slate-100 p-4 text-black ">
                {list.category}
              </td>
              <td className="border-b border-slate-100 p-4 text-black ">
                {list.assignee}
              </td>
              <td className="border-b capitalize border-slate-100 p-4 text-black ">
                {REQUEST_STATUS[list.status]}
              </td>
              <td className="grid gap-3 grid-cols-2 p-4">
                <ButtonIcon
                  handleClick={() => handleEdit(list)}
                  className={`${
                    REQUEST_STATUS[list.status] !== "open" &&
                    userInfo.role_id === INITIAL_ROLE.staff
                      ? "pointer-events-none bg-slate-300"
                      : "bg-indigo-600 text-white"
                  }`}
                >
                  <MdEdit />
                </ButtonIcon>
                <ButtonIcon
                  handleClick={() => handleDelete(list)}
                  className={`${
                    REQUEST_STATUS[list.status] !== "open" &&
                    userInfo.role_id === INITIAL_ROLE.staff
                      ? "pointer-events-none bg-slate-300"
                      : "bg-red-500 text-white"
                  }`}
                >
                  <MdDelete />
                </ButtonIcon>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

TableEdit.propTypes = {
  listRequest: PropTypes.arrayOf(PropTypes.object),
  listHeader: PropTypes.array,
  handleEdit: PropTypes.func,
  handleDelete: PropTypes.func,
};

export default TableEdit;

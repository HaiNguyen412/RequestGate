import PropTypes from "prop-types";
import React from "react";
import { AiOutlineEdit } from "react-icons/ai";
import {
  USER_ROLE,
  USER_STATUS,
  USER_STATUS_ACTIVE,
  USER_STATUS_DEACTIVE,
} from "../../constants/useConstant";
import ButtonIcon from "./ButtonIcon";
function TableUser({ dataUserList, titleHeader, handleEdit }) {
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
        {dataUserList.map((user, index) => (
          <tr key={index} className="even:bg-slate-100">
            <td className="border-b border-slate-100 p-4 text-black">
              {index + 1}
            </td>
            <td className="border-b border-slate-100 p-4 text-black">
              {user.name}
            </td>
            <td className="border-b border-slate-100 p-4 text-black">
              {user.email.split("@")[0]}
            </td>
            <td className="border-b border-slate-100 p-4 text-black">
              {user.department}
            </td>
            <td className="border-b border-slate-100 p-4 text-black">
              {USER_ROLE[user.role]}
            </td>
            <td className="border-b border-slate-100 p-4 text-black ">
              <div
                className={`bg-fit ${
                  user.status === USER_STATUS_ACTIVE
                    ? "bg-green-400"
                    : user.status === USER_STATUS_DEACTIVE
                    ? "bg-red-400"
                    : "bg-blue-400"
                } rounded-2xl w-20 text-center py-1 text-xs text-white`}
              >
                {USER_STATUS[user.status]}
              </div>
            </td>
            <td className="grid gap-1 grid-cols-2 p-4">
              <ButtonIcon
                handleClick={() => handleEdit(user)}
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

TableUser.propTypes = {
  arrayObject: PropTypes.arrayOf(PropTypes.object),
  arrayHeader: PropTypes.array,
  handleEdit: PropTypes.func,
  handleDelete: PropTypes.func,
};

export default TableUser;

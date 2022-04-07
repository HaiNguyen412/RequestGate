import React from "react";
import { FcApprove, FcDisapprove } from "react-icons/fc";
import {
  INITIAL_APPROVE_MANAGER,
  INITIAL_ROLE,
  REQUEST_STATUS
} from "../../constants/useConstant";
import ButtonIcon from "./ButtonIcon";
function TableStaffRequest({
  listStaffRequest,
listKeyStaffRequest,
  handleApproval,
  handleReject,
  userInfo,
}) {
  let countSTT = 1;
  return (
    <table className="border-collapse bg-white border table-auto w-full text-sm">
      <thead>
        <tr className="even:bg-slate-100">
          {listKeyStaffRequest.map((title, index) => (
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
        {listStaffRequest &&
          listStaffRequest.map((list) => (
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
              <td className="border-b border-slate-100 p-4 text-black ">
                {REQUEST_STATUS[list.status]}
              </td>
              <td className="grid gap-1 space-x-2 grid-cols-2 p-4">
                <ButtonIcon
                  handleClick={() => handleApproval(list)}
                  className={` ${
                    (INITIAL_APPROVE_MANAGER[list.approval] !==
                      "pending" ||
                      REQUEST_STATUS[list.status] !== "open") &&
                    userInfo.role_id === INITIAL_ROLE.manager
                      ? "pointer-events-none bg-slate-300"
                      : "bg-purple-500"
                  }`}
                >
                  <FcApprove />
                </ButtonIcon>
                <ButtonIcon
                  handleClick={() => handleReject(list)}
                  className={`${
                    (INITIAL_APPROVE_MANAGER[list.approval].toLowerCase() !==
                      "pending" ||
                      REQUEST_STATUS[list.status].toLowerCase() !== "open") &&
                    userInfo.role_id === INITIAL_ROLE.manager
                      ? "pointer-events-none bg-slate-300"
                      : "bg-purple-500"
                  }`}
                >
                  <FcDisapprove />
                </ButtonIcon>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}



export default TableStaffRequest;

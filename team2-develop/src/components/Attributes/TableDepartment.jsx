import PropTypes from "prop-types";
import React from "react";
import { AiOutlineEdit } from "react-icons/ai";
import ButtonIcon from "./ButtonIcon";
function TableDepartment({ dataDepartmentList, titleHeader, handleEdit }) {
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
        {dataDepartmentList.map((department, index) => (
          <tr key={index} className="even:bg-slate-100">
            <td className="border-b border-slate-100 p-4 text-black">
              {index + 1}
            </td>
            <td className="border-b border-slate-100 p-4 text-black">
              {department.name}
            </td>

            <td className="grid gap-1 grid-cols-2 p-4">
              <ButtonIcon
                handleClick={() => handleEdit(department)}
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

TableDepartment.propTypes = {
  arrayObject: PropTypes.arrayOf(PropTypes.object),
  arrayHeader: PropTypes.array,
  handleEdit: PropTypes.func,
  handleDelete: PropTypes.func,
};

export default TableDepartment;

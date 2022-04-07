import PropTypes from "prop-types";
import React from "react";
import { AiOutlineEdit } from "react-icons/ai";
import {
  CATEGORY_STATUS_DISABLE,
  DISPLAY_STATUS,
} from "../../constants/useConstant";
import ButtonIcon from "./ButtonIcon";
function TableCategory({ dataCategoryList, titleHeader, handleEdit }) {
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
        {dataCategoryList.map((category, index) => (
          <tr key={index} className="even:bg-slate-100">
            <td className="border-b border-slate-100 p-4 text-black">
              {index + 1}
            </td>
            <td className="border-b border-slate-100 p-4 text-black">
              {category.name}
            </td>
            <td className="border-b border-slate-100 p-4 text-black">
              {category.email.split("@")[0]}
            </td>
            <td className="border-b border-slate-100 p-4 text-black">
              <div
                className={`bg-fit ${
                  category.status === CATEGORY_STATUS_DISABLE
                    ? "bg-red-400"
                    : "bg-green-400"
                } rounded-2xl w-20 text-center py-1 text-xs text-white`}
              >
                {DISPLAY_STATUS[category.status]}
              </div>
            </td>
            <td className="grid gap-1 grid-cols-2 p-4">
              <ButtonIcon
                handleClick={() => handleEdit(category)}
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

TableCategory.propTypes = {
  arrayObject: PropTypes.arrayOf(PropTypes.object),
  arrayHeader: PropTypes.array,
  handleEdit: PropTypes.func,
  handleDelete: PropTypes.func,
};

export default TableCategory;

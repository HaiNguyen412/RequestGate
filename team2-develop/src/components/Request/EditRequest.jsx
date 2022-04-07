import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { STATUS, USER_ROLE } from "../../constants/useConstant";
import { listCategory } from "../../store/actions/categoryAction";
import {
  editRequest,
  listMyRequests,
} from "../../store/actions/requestActions";
import Button from "../Attributes/Button";
import DropDown from "../Attributes/DropDown";
import DropDownAssignee from "../Attributes/DropDownAssignee";
import DropDownCategory from "../Attributes/DropDownCategory";
import InputText from "../Attributes/InputText";
function EditRequest({ isChange, handleChange, data }) {
  const [update, setUpdate] = useState({
    id: data.id,
    title: data.title,
    description: data.description,
    due_date: data.due_date,
    status: data.status,
    assignee: data.assignee,
    category: data.category,
  });
  const categoryList = useSelector((state) => state.categoryList);
  const { category } = categoryList;
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const submitEdit = () => {
    dispatch(editRequest(update.id, update));
    dispatch(listMyRequests());
    handleChange();
  };
  useEffect(() => {
    dispatch(listCategory());
  }, [dispatch]);
  useEffect(() => {
    if (!isChange) {
      setUpdate({
        ...update,
        title: "",
        description: "",
        due_date: "",
        status: "",
        assignee: "",
        category: "",
      });
    }
  }, [isChange, update]);
  return (
    <>
      {isChange && (
        <div className="relative">
          <div className="fixed inset-0">
            <div>
              <div className="bg-black z-10 opacity-40 absolute inset-0"></div>
            </div>
            <div className="absolute inset-0 z-30 flex justify-center items-center">
              <div className="w-10/12 h-5/6 bg-white">
                <div className="">
                  <AiOutlineClose
                    onClick={handleChange}
                    className="float-right my-2 mr-3 cursor-pointer"
                  />
                </div>
                <div className="w-4/5 mx-auto my-10">
                  <div className="">
                    <InputText
                      title="Edit Request"
                      placeholder="Title"
                      type="text"
                      value={update.title}
                      handleChange={(e) =>
                        setUpdate({ ...update, title: e.target.value })
                      }
                    />
                  </div>
                  <div className="border border-black my-10 w-full h-1/6">
                    <div className="w-11/12 mx-auto">
                      <textarea
                        value={update.description}
                        onChange={(e) =>
                          setUpdate({ ...update, description: e.target.value })
                        }
                        className="w-full border mt-3 border-slate-900 h-40 resize-none focus-visible:outline-none focus-visible:pl-1"
                      ></textarea>
                    </div>
                    <div className="grid gap-10 grid-cols-2 w-10/12 mx-auto my-5">
                      <div className="grid grid-cols-3">
                        <p className="text-center">Status</p>
                        {USER_ROLE[userInfo.role_id].toLowerCase() !==
                        "admin" ? (
                          <p className="col-span-2">Open</p>
                        ) : (
                          <DropDown
                            arrayList={STATUS}
                            className="col-span-2 z-10"
                            item={update}
                            setItem={setUpdate}
                            name="status"
                            userInfo={userInfo}
                          />
                        )}
                      </div>
                      <div className="grid grid-cols-3">
                        <p className="text-center">Assign</p>
                        <DropDownAssignee
                          arrayList={category}
                          item={update}
                          setItem={setUpdate}
                          category={update.category}
                          id="assignee_id"
                          name="assignee"
                          className="col-span-2"
                        />
                      </div>
                      <div className="grid grid-cols-3">
                        <p className="text-center">Category</p>
                        <DropDownCategory
                          arrayList={category}
                          item={update}
                          setItem={setUpdate}
                          category_id="category_id"
                          category="category"
                          assignee_id="assignee_id"
                          assignee="assignee"
                          className="col-span-2"
                        />
                      </div>

                      <div className="grid grid-cols-3">
                        <p className="text-center">Due date</p>
                        <input
                          type="date"
                          className="border col-span-2 border-slate-900 focus-visible:outline-none focus-visible:pl-1 py-1 placeholder-shown:pl-1 pl-1"
                          value={update.due_date}
                          onChange={(e) =>
                            setUpdate({
                              ...update,
                              due_date: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="flex justify-center my-5">
                      <Button
                        onClick={submitEdit}
                        children="Edit"
                        type="submit"
                        className="bg-indigo-700 text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

EditRequest.propTypes = {
  isChange: PropTypes.bool,
  handleChange: PropTypes.func,
};
export default EditRequest;

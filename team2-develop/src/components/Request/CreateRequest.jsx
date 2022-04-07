import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { INITIAL_STATUS, REQUEST_STATUS } from "../../constants/useConstant";
import { listCategory } from "../../store/actions/categoryAction";
import {
  createRequest,
  listMyRequests,
} from "../../store/actions/requestActions";
import Button from "../Attributes/Button";
import DropDownAssignee from "../Attributes/DropDownAssignee";
import DropDownCategory from "../Attributes/DropDownCategory";
import InputText from "../Attributes/InputText";

import "react-toastify/dist/ReactToastify.css";

function CreateRequest({ isChange, handleChange }) {
  const dispatch = useDispatch();
  const [addRequest, setAddRequest] = useState({
    title: "",
    description: "",
    status: INITIAL_STATUS.open,
    category: "",
    due_date: "",
  });
  const categoryList = useSelector((state) => state.categoryList);
  const { category } = categoryList;
  useEffect(() => {
    dispatch(listCategory());
  }, [dispatch]);
  const submitCreateRequest = () => {
    dispatch(createRequest(addRequest));
    dispatch(listMyRequests());
    handleChange();
  };

  return (
    <>
      {isChange ? (
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
                      title="Create Request"
                      placeholder="Title"
                      type="text"
                      value={addRequest.title}
                      handleChange={(e) =>
                        setAddRequest({
                          ...addRequest,
                          title: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="border border-black my-10 w-full h-1/6">
                    <div className="w-11/12 mx-auto">
                      <textarea
                        value={addRequest.description}
                        onChange={(e) =>
                          setAddRequest({
                            ...addRequest,
                            description: e.target.value,
                          })
                        }
                        required
                        className="w-full border mt-3 border-slate-900 h-40 resize-none focus-visible:outline-none focus-visible:pl-1"
                      ></textarea>
                    </div>
                    <div className="grid gap-10 grid-cols-2 w-10/12 mx-auto my-5">
                      <div className="grid grid-cols-3">
                        <p className="text-center">Status</p>
                        <p className="col-span-2 z-10">
                          {REQUEST_STATUS[addRequest.status]}
                        </p>
                      </div>
                      <div className="grid grid-cols-3">
                        <p className="text-center">Assign</p>
                        <DropDownAssignee
                          arrayList={category}
                          item={addRequest}
                          setItem={setAddRequest}
                          category={addRequest.category}
                          id="assignee_id"
                          name="assignee"
                          className="col-span-2"
                        />
                      </div>
                      <div className="grid grid-cols-3">
                        <p className="text-center">Category</p>
                        <DropDownCategory
                          arrayList={category}
                          item={addRequest}
                          setItem={setAddRequest}
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
                          className="w-full border col-span-2 border-slate-900 focus-visible:outline-none focus-visible:pl-1 py-1 placeholder-shown:pl-1 pl-1"
                          value={addRequest.due_date}
                          onChange={(e) =>
                            setAddRequest({
                              ...addRequest,
                              due_date: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="flex justify-center my-5">
                      <Button
                        children="Create"
                        onClick={submitCreateRequest}
                        className="bg-indigo-700 text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

CreateRequest.propTypes = {
  isChange: PropTypes.bool,
  handleChange: PropTypes.func,
};
export default CreateRequest;

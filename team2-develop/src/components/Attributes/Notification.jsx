import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  cleanRequest,
  listMyRequests,
} from "../../store/actions/requestActions";

function Notification({isChange, handleChange, data}) {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(data && cleanRequest(data.id));
    dispatch(listMyRequests());
    handleChange();
  };
  const handleCannel = () => {
    handleChange();
  };
  return (
    <>
      {isChange ? (
       
        <div className="absolute top-0 left-0  w-full h-full">
          <div
            onClick={()=>handleChange}
            className="relative bg-slate-100 opacity-60 w-full h-full"
          ></div>

          <div className="w-fit p-10 absolute top-1/2 z-30 left-1/2 translate-x-50 translate-y-50 bg-white border border-slate-300 flex flex-auto">
            <div className="w-fit my-5 space-y-3 mx-auto ">
              <h3>Do you want to delete the request?</h3>
              <div className="space-x-3">
                <Button
                  children="Submit"
                  onClick={handleDelete}
                  className="bg-red-500 rounded-md py-2 px-4 text-white"
                />
                <Button
                  children="Cannel"
                  onClick={handleCannel}
                  className="bg-white py-2 px-4 rounded-md text-black"
                />
              </div>
            </div>
          </div>
        </div>
      ): null}
    </>
  );
}

export default Notification;

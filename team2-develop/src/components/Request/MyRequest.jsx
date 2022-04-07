import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listMyRequests } from "../../store/actions/requestActions";
import Button from "../Attributes/Button";
import Notification from "../Attributes/Notification";
import TableEdit from "../Attributes/TableEdit";
import CreateRequest from "./CreateRequest";
import EditRequest from "./EditRequest";

function MyRequest() {
  const [isCreate, setIsCreate] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [detail, setDetail] = useState({});
  const titleHeader = [
    "STT",
    "Name request",
    "Content request",
    "Author create",
    "Date Create",
    "Category",
    "Assignee",
    "Status",
    "Actions",
  ];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listMyRequests());
  }, [dispatch]);
  const requestMyList = useSelector((state) => state.requestMyList);
  const { requests } = requestMyList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const clickEdit = (data) => {
    setDetail(data);
    setIsEdit(!isEdit);
  };
  const clickDelete = (data) => {
    setDetail(data);
    setIsDelete(!isDelete);
  };
  const clickCreate = () => {
    setIsCreate(!isCreate);
  };
  return (
    <div className="w-5/6 mx-auto flex flex-auto">
      <div className="py-5 space-y-3 w-full">
        <Button
          children="Create"
          onClick={clickCreate}
          type="submit"
          className="bg-red-300 hover:bg-red-500 duration-300 text-white"
        />
        <TableEdit
          handleEdit={clickEdit}
          listKeyRequest={titleHeader}
          listRequest={requests}
          userInfo={userInfo}
          handleDelete={clickDelete}
        />
      </div>
      {isCreate && (
        <CreateRequest
          isChange={isCreate}
          handleChange={() => setIsCreate(!isCreate)}
        />
      )}
      {isEdit && (
        <EditRequest
          data={detail}
          isChange={isEdit}
          handleChange={() => setIsEdit(!isEdit)}
        />
      )}
      {isDelete && (
        <Notification
          data={detail}
          isChange={isDelete}
          handleChange={() => setIsDelete(!isDelete)}
        />
      )}
    </div>
  );
}

export default MyRequest;

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllUserList, getDepartmentList, handleShowNotification } from "../../store/actions/userActions";
import Button from "../Attributes/Button";
import TableUser from "../Attributes/TableUser";
import Paginate from "../Paginate/Paginate";
import NewUserModal from "./NewUserModal/NewUserModal";
import InputText from "../Attributes/InputText";

function UserList() {
  const [valueSearch, setValueSearch] = useState("");
  const [myUserList, setMyUserList] = useState([]);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [departmentList, setDepartmentList] = useState([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    currentPage: "",
    perPage: "",
    total: "",
    prevPage: "",
    nextPage: "",
    lastPage: "",
  });
  const titleHeader = [
    "#",
    "Fullname",
    "Code Staff",
    "Department",
    "Role",
    "Status",
    "Actions"
  ];

  const handleOpen = (user) => {
    setOpen(true);
    setSelectedUser(user);
  }

  const handleClose = () => setOpen(false);
  const fetchDepartmentList = async () => {
    try {
      const { data } = await getDepartmentList();
      setDepartmentList(data);
    } catch (error) {
      handleShowNotification(error?.message, "error", dispatch);
    }
  };
  useEffect(() => {
    fetchDepartmentList();
    // eslint-disable-next-line
  }, [])

  const fetchUserData = async (page, valueSearch) => {
    try {
      const { data } = await getAllUserList(page, valueSearch);
      setMyUserList(data.data);
      setPagination({
        currentPage: data.current_page,
        perPage: data.per_page,
        total: data.total,
        prevPage: data.prev_page_url,
        nextPage: data.next_page_url,
        lastPage: data.last_page
      })
    } catch (error) {
      handleShowNotification(error?.message, "error", dispatch);
    }
  };

  useEffect(() => {
    fetchUserData(page, valueSearch);
    // eslint-disable-next-line
  }, [page, valueSearch])

  const handleBtnSearchClick = async () => {
    setPage(1)
    fetchUserData(page, valueSearch.toLowerCase())
  };

  const handleBtnAddClick = () => {
    handleOpen(null);
  }
  return (
    <div className="w-5/6 mx-auto flex flex-auto">
      <div className="my-5 space-y-3 w-full">
        <h1 className="text-center text-3xl">List Users</h1>
        <div className="grid grid-cols-4 gap-3">
          <div className="col-span-3">
            <InputText className="w-full border border-slate-900 focus-visible:outline-none focus-visible:pl-1 py-2 placeholder-shown:pl-1 pl-1"
              type="text"
              placeholder="Search..."
              handleChange={(e) => {
                setValueSearch(e.target.value)
                setPage(1)
              }}
              value={valueSearch}
            />
          </div>
          <div className="space-x-3 flex flex-row justify-end">
            <Button
              children="Search"
              onClick={handleBtnSearchClick}
              type="submit"
              className="bg-red-300 hover:bg-red-500 duration-300 text-white"
            />
            <Button
              children="Add"
              onClick={handleBtnAddClick}
              type="submit"
              className="bg-red-300 hover:bg-red-500 duration-300 text-white"
            />
          </div>
        </div>
        <TableUser
          titleHeader={titleHeader}
          dataUserList={myUserList}
          handleEdit={handleOpen} />
        <NewUserModal className="mt-50"
          open={open}
          handleClose={handleClose}
          selectedUser={selectedUser}
          title={selectedUser ? "Update User" : "Create New User"}
          departmentList={departmentList}
          fetchUserData={fetchUserData}
          setPage={setPage}
          page={page}
          valueSearch={valueSearch}
          pagination={pagination}
        />
        <Paginate
          page={page}
          setPage={setPage}
          currentPage={pagination?.currentPage}
          perPage={pagination?.perPage}
          total={pagination?.total}
          prevPage={pagination?.prev_page_url}
          nextPage={pagination?.next_page_url}
          lastPage={pagination?.last_page}
        />
      </div>
    </div>
  );
}

export default UserList;

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getDepartmentList, handleShowNotification } from "../../store/actions/userActions";
import Button from "../Attributes/Button";
import TableDepartment from "../Attributes/TableDepartment";
import NewDepartmentModal from "./NewDepartmentModal/NewDepartmentModal";

function DepartmentList() {
  const [myDepartmentList, setMyDepartmentList] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const dispatch = useDispatch();
  const titleHeader = [
    "#",
    "Name",
    "Actions"
  ];
  const fetchDepartmentData = async () => {
    try {
      const { data } = await getDepartmentList();
      setMyDepartmentList(data);
    } catch (error) {
      handleShowNotification(error?.message, "error", dispatch);
    }
  }
  useEffect(() => {
    fetchDepartmentData();
  // eslint-disable-next-line
  }, [])

  const handleOpen = (department) => {
    setOpen(true);
    setSelectedDepartment(department);
  }

  const handleClose = () => setOpen(false);



  const handleBtnAddClick = () => {
    handleOpen(null);
  };
  return (
    <div className="w-5/6 mx-auto flex flex-auto">
      <div className="my-5 space-y-3 w-full">
        <h1 className="text-center text-3xl">List Department</h1>  
        <Button
          children="Add"
          onClick={handleBtnAddClick}
          type="submit"
          className="bg-red-300 hover:bg-red-500 duration-300 text-white"
        />
        <TableDepartment
          titleHeader={titleHeader}
          dataDepartmentList={myDepartmentList}
          handleEdit={handleOpen}
        />
        <NewDepartmentModal
          open={open}
          handleClose={handleClose}
          selectedDepartment={selectedDepartment}
          title={selectedDepartment ? "Update Department" : "Create New Department"}
          fetchDepartmentData={fetchDepartmentData}
        />

      </div>
    </div>
  );
}

export default DepartmentList;

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  CATEGORY_STATUS,
  DISPLAY_STATUS,
} from "../../../constants/useConstant";
import {
  createCategoryRequest,
  editCategoryRequest,
  handleShowNotification,
} from "../../../store/actions/userActions";
import Button from "../../Attributes/Button";
import DropDownApi from "../../Attributes/DropDownApi";
import DropDownStatus from "../../Attributes/DropDownStatus";
import InputText from "../../Attributes/InputText";

const style = {
  position: 'absolute',
  top: '45%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '1px solid #ccc',
  boxShadow: 24,
  p: 4,
};

const NewCategoryModal = ({
  open,
  handleClose,
  selectedCategory,
  assigneeList,
  title,
  fetchCategoryData, 
  setPage,
  pagination,
  page,
  valueSearch
}) => {
  const [name, setName] = useState("");
  const [assignee, setAssignee] = useState("");
  const [assigneeId, setAssigneeId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [status, setStatus] = useState("");
  const [statusRequest, setStatusRequest] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedCategory) {
      setCategoryId(selectedCategory.id);
      setName(selectedCategory.name);
      setAssignee(selectedCategory.email.split("@")[0]);
      setAssigneeId(selectedCategory.role_id);
      setStatus(DISPLAY_STATUS[selectedCategory.status]);
      setStatusRequest(selectedCategory.status);
    } else {
      resetForm();
    }
  }, [selectedCategory]);
const resetForm =()=>{
  setCategoryId("");
      setName("");
      setAssignee("");
      setStatus("");
}
  const handleBtnSubmitClick = async () => {
    if (selectedCategory) {
      const dataSubmit = {
        user_id: assigneeId,
        name: name,
        status: statusRequest,
      };
      try {
        const { data } = await editCategoryRequest(dataSubmit, categoryId);
        handleClose();
        handleShowNotification(data?.message, "success", dispatch);
        setPage(pagination.currentPage)
        fetchCategoryData(page, valueSearch);
      } catch (error) {
        if (error?.data?.message) {
          handleShowNotification("Update Failed!", "error", dispatch);
        }
      }
    } else {
      const dataSubmit = {
        user_id: assigneeId,
        name: name,
        status: statusRequest,
      };
      if (!dataSubmit.name.trim()) {
        return;
      }
      try {
        const { data } = await createCategoryRequest(dataSubmit);
        resetForm();
        handleClose();
        handleShowNotification(data?.message, "success", dispatch);
        setPage( (pagination.total % pagination.perPage)
        ? pagination.lastPage
        : (pagination.lastPage + 1))
        fetchCategoryData(page, valueSearch);
      } catch (error) {
        resetForm();
        handleShowNotification("Create Failed!", "error", dispatch);
        handleClose();
      }
    }
  };

  const handleBtnCancelClick = () => {
    handleClose();
  };
  return (
    <div>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <p className="text-center text-xl">{title}</p>
        <InputText
          title="Name"
          type="text"
          placeholder="Category Name"
          handleChange={(e) => setName(e.target.value)}
          value={name}
        />
        <div className="space-y-2">
          <p>Assignee</p>
          <DropDownApi
            arrayList={assigneeList}
            title={assignee}
            setDataItem={setAssigneeId}
            name="name"
            className="w-full border-slate-900"
          />
        </div>
        <div className="space-y-2">
          <p>Status</p>
          <DropDownStatus
            arrayList={CATEGORY_STATUS}
            title={status}
            setDataItem={setStatusRequest}
            className="w-full border-slate-900"
          />
        </div>
        <div className="space-x-2 mt-5 ">
          <Button
            children="Submit"
            onClick={handleBtnSubmitClick}
            type="submit"
            className="bg-red-500 hover:bg-red-300 duration-300 text-white"
          />
          <Button
            children="Cancel"
            onClick={handleBtnCancelClick}
            type="submit"
            className="bg-red-500 hover:bg-red-300 duration-300 text-white"
          />
        </div>
      </Box>
    </Modal>
  </div>
  );
};

export default NewCategoryModal;

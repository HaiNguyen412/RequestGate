import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { ADMIN_STATUS_REQUEST, CONVERT_REQUEST_STATUS } from "../../constants/useConstant";
import { editStatusRequest, handleShowNotification } from "../../store/actions/userActions";
import DropDownStatus from "../Attributes/DropDownStatus";

const style = {
  position: "absolute",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "1px solid #ccc",
  boxShadow: 24,
  p: 4,
};

const AdminRequestModal = ({
  open,
  handleClose,
  selectedRequest,
  title,
  fetchAdminRequestData,
}) => {
  const [status, setStatus] = useState("");
  const [statusRequest, setStatusRequest] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedRequest) {
      setStatus(CONVERT_REQUEST_STATUS[selectedRequest.status]);
      setStatusRequest(selectedRequest.status);
    }
  }, [selectedRequest]);

  const handleBtnSubmitClick = async () => {
    const dataSubmit = {
      id: selectedRequest.id,
      status: statusRequest
    }
    try {
      const { data } = await editStatusRequest(dataSubmit)
      handleClose();
      handleShowNotification(data?.message, "success", dispatch);
      fetchAdminRequestData();
    } catch (error) {
      handleClose();
      handleShowNotification(error?.message, "error", dispatch);
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
          <p className="text-center text-xl" >{title}</p>
          <div className="space-y-2">
            <p>Status</p>
            <DropDownStatus
              arrayList={ADMIN_STATUS_REQUEST}
              title={status}
              setDataItem={setStatusRequest}
              className="w-full border-slate-900"
            />
          </div>
          <Button
            children="Submit"
            onClick={handleBtnSubmitClick}
            type="submit"
            className="bg-red-300 hover:bg-red-500 duration-300 text-white rounded-md py-2 px-5"
          />
          <Button
            children="Cancel"
            onClick={handleBtnCancelClick}
            type="submit"
            className="bg-red-300 hover:bg-red-500 duration-300 text-white rounded-md py-2 px-5"
          />
        </Box>
      </Modal>
    </div>
  );
};

export default AdminRequestModal;
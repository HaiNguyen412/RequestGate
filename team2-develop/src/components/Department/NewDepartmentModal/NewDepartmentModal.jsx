import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createDepartmentRequest, editDepartmentRequest, handleShowNotification } from '../../../store/actions/userActions';
import Button from '../../Attributes/Button';
import InputText from '../../Attributes/InputText';

const style = {
  position: 'absolute',
  top: '30%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '1px solid #ccc',
  boxShadow: 24,
  p: 4,
};
const NewDepartmentModal = ({
  open,
  handleClose,
  selectedDepartment,
  title,
  fetchDepartmentData
}) => {
  const [name, setName] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedDepartment) {
      setDepartmentId(selectedDepartment.id);
      setName(selectedDepartment.name);

    } else {
      setDepartmentId("");
      setName("");
    }
  }, [selectedDepartment])

  const handleBtnSubmitClick = async () => {
    if (selectedDepartment) {
      const dataSubmit = {
        department_id: departmentId,
        name: name,
      }
      try {
        const { data } = await editDepartmentRequest(dataSubmit, departmentId);
        handleClose();
        handleShowNotification(data?.message, "success", dispatch);
        fetchDepartmentData();
      } catch (error) {
        if (error?.data?.message) {
          handleShowNotification("Update Failed!", "error", dispatch);
        }
      }
    } else {
      const dataSubmit = {
        name: name,
      }
      if (!dataSubmit.name.trim()) {
        return;
      }
      try {
        const { data } = await createDepartmentRequest(dataSubmit);
        handleClose();
        handleShowNotification(data?.message, "success", dispatch);
        fetchDepartmentData();
      } catch (error) {
        handleShowNotification("Create Failed!", "error", dispatch);
        handleClose();
      }
    }
  }

  const handleBtnCancelClick = () => {
    handleClose();
  }
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
            placeholder="Department Name"
            handleChange={(e) => setName(e.target.value)}
            value={name}
          />
          <div className="space-x-2 mt-5 ">
            <Button
              children="Submit"
              onClick={handleBtnSubmitClick}
              type="submit"
              className="bg-red-300 hover:bg-red-500 duration-300 text-white"
            />
            <Button
              children="Cancel"
              onClick={handleBtnCancelClick}
              type="submit"
              className="bg-red-300 hover:bg-red-500 duration-300 text-white"
            />
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default NewDepartmentModal;

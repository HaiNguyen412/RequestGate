import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { DISPLAY_USER_ROLE, PASSWORD_DEFAULT, USER_ROLE_REQUEST, USER_STATUS, USER_STATUS_PENDING, USER_STATUS_REQUEST } from '../../../constants/useConstant';
import { createUserRequest, editUserRequest, handleShowNotification } from '../../../store/actions/userActions';
import Button from '../../Attributes/Button';
import DropDownDepartment from '../../Attributes/DropDownDepartment';
import DropDownStatus from '../../Attributes/DropDownStatus';
import InputText from '../../Attributes/InputText';
const style = {
  position: 'absolute',
  top: '45%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
};

const NewUserModal = ({
  open,
  handleClose,
  selectedUser,
  title,
  departmentList,
  fetchUserData,
  setPage,
  pagination,
  page,
  valueSearch
}) => {
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [employeeCode, setEmployeeCode] = useState("");
  const [department, setDepartment] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [userRole, setUserRole] = useState("");
  const [roleId, setRoleId] = useState("");
  const [status, setStatus] = useState("");
  const [statusRequest, setStatusRequest] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedUser) {
      setUserId(selectedUser.user_id);
      setUserName(selectedUser.name);
      setEmployeeCode(selectedUser.email.split("@")[0]);
      setDepartment(selectedUser.department);
      setDepartmentId(selectedUser.department_id);
      setUserRole(DISPLAY_USER_ROLE[selectedUser.role]);
      setRoleId(selectedUser.role);
      setStatus(USER_STATUS[selectedUser.status]);
      setStatusRequest(selectedUser.status);
    } else {
      resetForm();
    }
  }, [selectedUser])
  const resetForm = () => {
    setUserId("");
    setUserName("");
    setEmployeeCode("");
    setDepartment("");
    setUserRole("");
  }
  const handleBtnSubmitClick = async () => {
    if (selectedUser) {
      const dataSubmit = {
        id: userId,
        name: userName,
        email: `${employeeCode}@hblab.vn`,
        department_id: departmentId,
        role_id: roleId,
        status: statusRequest,
      }
      try {
        const { data } = await editUserRequest(dataSubmit);
        handleClose();
        handleShowNotification(data?.message, "success", dispatch);
        setPage(pagination.currentPage)
        fetchUserData(page, valueSearch);
      } catch (error) {
        handleClose();
        handleShowNotification(error?.message, "error", dispatch);
      }
    } else {
      const dataSubmit = {
        name: userName,
        email: `${employeeCode}@hblab.vn`,
        department_id: departmentId,
        role_id: roleId,
        status: USER_STATUS_PENDING,
        password: PASSWORD_DEFAULT,
      }
      if (!dataSubmit.name.trim()) {
        return;
      }
      try {
        const { data } = await createUserRequest(dataSubmit);
        resetForm();
        handleClose();
        handleShowNotification(data?.message, "success", dispatch);
        setPage((pagination.total % pagination.perPage)
          ? pagination.lastPage
          : (pagination.lastPage + 1))
        fetchUserData(page, valueSearch);
      } catch (error) {
        resetForm();
        handleClose();
        handleShowNotification(error?.message, "error", dispatch);
      }
    }
  }

  const handleBtnCancelClick = () => {
    handleClose();
  }
  return (
    <div className="mx-28">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
          <p className="text-center text-xl">{title}</p>
          <div className="space-y-3">
            <InputText
              title="Fullname"
              type="text"
              placeholder=""
              handleChange={(e) => setUserName(e.target.value)}
              value={userName}
            />
            <InputText
              title="Code Staff"
              type="text"
              placeholder=""
              handleChange={(e) => setEmployeeCode(e.target.value)}
              value={employeeCode}
            />
            <div className="space-y-2">
              <p>Department</p>
              <DropDownDepartment
                arrayList={departmentList}
                title={department}
                setDataItem={setDepartmentId}
                name="name"
                className="w-full border-slate-900"
              />
            </div>
            <div className="space-y-2">
              <p>Role</p>
              <DropDownStatus
                arrayList={USER_ROLE_REQUEST}
                title={userRole}
                setDataItem={setRoleId}
                className="w-full border-slate-900"
              />
            </div>
            {selectedUser ?
              <div className="space-y-2">
                <p>Status</p>
                <DropDownStatus
                  arrayList={USER_STATUS_REQUEST}
                  title={status}
                  setDataItem={setStatusRequest}
                  className="w-full border-slate-900"
                />
              </div> : null}
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
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default NewUserModal;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/Attributes/Button";
import InputText from "../components/Attributes/InputText";
import { changePassword } from "../store/actions/userActions.js";
import avatar from "../assets/images/male.png"
function ChangePassword() {
  const [editPassword, setEditPassword] = useState({
    password: "",
    password_new: "",
    confirm_password: "",
  });
  const [error,setError] = useState("");
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const submitPassword = () => {
    if (userInfo) {
      if (editPassword.password_new !== editPassword.confirm_password) {
        setError("Password incorrect");
      } else {
        dispatch(changePassword(editPassword));
      }
    }
  };

  return (
    <div className="border bg-white border-slate-300 rounded-md w-2/5 mx-auto mt-20">
      <div className="w-3/4 mx-auto space-y-3 py-10">
        <div className="flex justify-center"><img src={avatar} className="rounded-full w-13 h-13" alt="" /></div>
        <h3 className="text-center text-2xl">Change Password</h3>
        <InputText
          value={editPassword.password}
          title="Password"
          type="password"
          placeholder="Password"
          handleChange={(e) =>
            setEditPassword({ ...editPassword, password: e.target.value })
          }
        />
        <InputText
          value={editPassword.password_new}
          title="New Password"
          type="password"
          placeholder="New Password"
          handleChange={(e) =>
            setEditPassword({
              ...editPassword,
              password_new: e.target.value,
            })
          }
        />
        <InputText
          value={editPassword.confirm_password}
          title="Confirm Password"
          type="password"
          placeholder="Confirm Password"
          handleChange={(e) =>
            setEditPassword({
              ...editPassword,
              confirm_password: e.target.value,
            })
          }
        />
        {error && <div className="text-red-500" >{error}</div>}
        <div className="flex justify-center w-full">
          <Button
            type="submit"
            onClick={submitPassword}
            className="bg-purple-600 text-white"
            children="Submit"
          />
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;

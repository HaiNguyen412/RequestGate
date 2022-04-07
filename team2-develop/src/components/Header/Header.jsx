import React, { useState } from "react";
import { AiOutlinePoweroff } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/HBLab.png";
import avatar from "../../assets/images/male.png";
import { USER_ROLE } from "../../constants/useConstant";
import { logout } from "../../store/actions/userActions";
function Header() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const history = useNavigate();
  const dispatch = useDispatch();
  const [openedMenu, setOpenedMenu] = useState(false);
  const handleLogOut = () => {
    dispatch(logout());
    history("/");
  };

  return (
    <>
      <div className="bg-slate-100 h-12 border-slate-300 border-b">
        <div className="2xl:container h-full 2xl:mx-auto flex justify-between">
          <Link to="/home" className="ml-3">
            <img src={logo} className="w-2/3 mt-1 block" alt="" />
          </Link>
          {userInfo && (
            <div
              onClick={() => setOpenedMenu(!openedMenu)}
              className="py-2 h-full cursor-pointer relative pr-5 group"
            >
              <div className="flex pb-1 items-center">
                <div className="mr-5 text-right">
                  <h6 className="text-sm font-medium">
                    {userInfo.email.split("@")[0]}
                  </h6>
                  <p className="text-xs">{USER_ROLE[userInfo.role_id]}</p>
                </div>
                <div>
                  <img
                    className=" w-7 h-7 rounded-full my-1"
                    src={avatar}
                    alt=""
                  />
                </div>
              </div>
              {openedMenu && (
                <div className="absolute right-5 z-30 bg-white rounded-md shadow-lg w-44 text-xs duration-300">
                  <Link
                    to="/profile"
                    className="hover:bg-itemMenu hover:text-white flex items-center cursor-pointer rounded-t-md  py-3 px-5 text-center"
                  >
                    <FaRegUser />
                    <p className="pl-3">Profile</p>
                  </Link>
                  <Link
                    to="change-password"
                    className="hover:bg-itemMenu hover:text-white flex items-center cursor-pointer py-3 px-5 text-center"
                  >
                    <RiLockPasswordLine />
                    <p className="pl-3">Change Password</p>
                  </Link>
                  <div
                    onClick={handleLogOut}
                    className="hover:bg-itemMenu hover:text-white flex items-center cursor-pointer rounded-b-md py-3 px-5 text-center"
                  >
                    <AiOutlinePoweroff />
                    <p className="pl-3">Logout</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Header;

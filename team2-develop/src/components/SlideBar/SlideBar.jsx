import React, { useState } from "react";
import { AiFillHome, AiOutlineMenu } from "react-icons/ai";
import { BiCategoryAlt } from "react-icons/bi";
import { BsListStars } from "react-icons/bs";
import { FaClipboardList } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { HiOutlineUserGroup } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { USER_ROLE } from "../../constants/useConstant";
import { changeSildebar } from "../../store/actions/uiAction";
import SlideBarRole from "./SlideBarRole";
const listSlideBarStaff = [
  {
    icon: <AiFillHome className="w-5 h-5" />,
    title: "home",
  },
  {
    icon: <FaClipboardList className="w-5 h-5" />,
    title: "my requests",
  },
];
const listSlideBarAdmin = [
  {
    icon: <AiFillHome className="w-5 h-5" />,
    title: "home",
  },
  {
    icon: <FiUsers className="w-5 h-5" />,
    title: "users",
  },
  {
    icon: <BiCategoryAlt className="w-5 h-5" />,
    title: "categories",
  },
  {
    icon: <HiOutlineUserGroup className="w-5 h-5" />,
    title: "departments",
  },
  {
    icon: <FaClipboardList className="w-5 h-5" />,
    title: "my requests",
  },
];
const listSlideBarManager = [
  {
    icon: <AiFillHome className="w-5 h-5" />,
    title: "home",
  },
  {
    icon: <BsListStars className="w-5 h-5" />,
    title: "staff requests",
  },
  {
    icon: <FaClipboardList className="w-5 h-5" />,
    title: "my requests",
  },
];

function SlideBar() {
  const userLogin = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();
  const { openSlideBar } = useSelector((state) => state.handleNotification);
  const [change, setChange] = useState(openSlideBar);
  const { userInfo } = userLogin;
  const handleScope = () => {
    dispatch(changeSildebar(change));
    setChange(!change);
  };
  const roles = {
    staff: <SlideBarRole listSlideBar={listSlideBarStaff} isChange={change} />,
    admin: <SlideBarRole listSlideBar={listSlideBarAdmin} isChange={change} />,
    manager: (
      <SlideBarRole listSlideBar={listSlideBarManager} isChange={change} />
    ),
  };

  return (
    <div
      className={` h-screen  float-left bg-slide-bar duration-150 sticky top-0 ${
        !change ? "w-1/8" : "w-12"
      }`}
    >
      <div
        onClick={handleScope}
        className={`text-base ml-3 my-3 text-white cursor-pointer duration-1000 ${
          !change ? "flex justify-end mr-3" : ""
        }`}
      >
        <AiOutlineMenu className="w-5 h-5" />
      </div>
      {userInfo && roles[USER_ROLE[userInfo.role_id]]}
    </div>
  );
}
export default SlideBar;

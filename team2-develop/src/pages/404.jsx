import React, { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../App.css";
import notFound from "../assets/images/404.png";

const NotFound = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  const [link, setLink] = useState("/");

  useEffect(() => {
    switch (userInfo.role) {
      case "admin":
        setLink("/admin")
        break;
      case "manager":
        setLink("/manager")
        break;
      case "staff":
        setLink("/staff")
        break;
      default:
        return;
    }
  }, [userInfo]);

  return (
    <div className="not-found">
      <img src={notFound} alt="" />
      <Link to={link}>
        <AiOutlineArrowLeft /> Quay lại trang chủ
      </Link>
    </div>
  );
};

export default NotFound;

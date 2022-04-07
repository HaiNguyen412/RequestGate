import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { INITIAL_ROLE } from "../constants/useConstant";
function DeniedRoute() {
  const history = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  useEffect(() => {
    (userInfo.role_id === INITIAL_ROLE.manager ||userInfo.role_id === INITIAL_ROLE.staff) && history("/home");
  }, [userInfo, history]);
  return <Outlet />;
}

export default DeniedRoute;

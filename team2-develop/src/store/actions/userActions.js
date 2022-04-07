import { apiActions } from "../../configs/Api";
import { getRequest, postRequest, putRequest } from "../../helpers/axiosQuery";
import { ADD_NOTI, REMOVE_NOTI } from "../constants";
import {
  USER_CHANGE_PASSWORD_FAIL,
  USER_CHANGE_PASSWORD_REQUEST,
  USER_CHANGE_PASSWORD_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_GOOGLE_FAIL,
  USER_LOGIN_GOOGLE_REQUEST,
  USER_LOGIN_GOOGLE_SUCCESS,
  USER_LOGIN_LOGOUT,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_PROFILE_FAIL,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_UPDATE_FAIL,
  USER_PROFILE_UPDATE_REQUEST,
  USER_PROFILE_UPDATE_SUCCESS,
} from "../constants/userActionTypes";

export const login = (email, password, remember_me) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });
    const { data } = await postRequest("api/v1/auth/login", {
      email,
      password,
      remember_me,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    localStorage.removeItem("userInfo");
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const handleShowNotification = (msg, type, dispatch) => {
  const notiId = Math.random().toString();
  const noti = {
    id: notiId,
    notiType: type,
    msg: msg,
  };
  try {
    dispatch({
      type: ADD_NOTI,
      payload: noti,
    });
    setTimeout(() => {
      dispatch({
        type: REMOVE_NOTI,
        payload: noti,
      });
    }, 3000);
  } catch (error) {}
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({
    type: USER_LOGIN_LOGOUT,
  });
};
export const verifyEmailRequest = async (email) => {
  return await postRequest("api/v1/auth/password/email", { email });
};

export const resetPasswordRequest = async (data) => {
  return await postRequest("api/v1/auth/password/reset", data);
};

export const getCategoryList = async (page, valueSearch) => {
  return await getRequest(`api/v1/category?params=${valueSearch}&page=${page}`);
};

export const getAllUserList = async (page, valueSearch) => {
  return await getRequest(`api/v1/users?params=${valueSearch}&page=${page}`);
};

export const postLoginGoogle = (profileObj, remember_me) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_GOOGLE_REQUEST,
    });
    const { data } = await postRequest(`api/v1/auth/google`, {
      profileObj,
      remember_me,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
    dispatch({
      type: USER_LOGIN_GOOGLE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    localStorage.removeItem("userInfo");
    dispatch({
      type: USER_LOGIN_GOOGLE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const changePassword =
  ({ changePassword }) =>
  async (dispatch) => {
    apiActions(
      dispatch,
      USER_CHANGE_PASSWORD_REQUEST,
      putRequest(`api/v1/auth/change-password`, changePassword),
      USER_CHANGE_PASSWORD_SUCCESS,
      USER_CHANGE_PASSWORD_FAIL
    );
  };
export const userProfileAction = () => async (dispatch) => {
  apiActions(
    dispatch,
    USER_PROFILE_REQUEST,
    getRequest(`api/v1/auth/user-info`),
    USER_PROFILE_SUCCESS,
    USER_PROFILE_FAIL
  );
};
export const userProfileUpdateAction = (id, user) => async (dispatch) => {
  apiActions(
    dispatch,
    USER_PROFILE_UPDATE_REQUEST,
    putRequest(`api/v1/users/${id}`, user),
    USER_PROFILE_UPDATE_SUCCESS,
    USER_PROFILE_UPDATE_FAIL
  );
};

export const getAssigneeList = async () => {
  return await getRequest("api/v1/users/list-assignee");
};

export const getDepartmentList = async () => {
  return await getRequest("api/v1/departments");
};

export const editCategoryRequest = async (dataUpdate, categoryId) => {
  return await putRequest(`api/v1/category/${categoryId}`, dataUpdate);
};

export const createCategoryRequest = async (category) => {
  return await postRequest("api/v1/category", category);
};

export const createUserRequest = async (user) => {
  return await postRequest("api/v1/users", user);
};

export const editUserRequest = async (user) => {
  return await putRequest(`api/v1/users/${user.id}`, user);
};

export const searchDepartmentByQuery = async (query) => {
  return await getRequest(`api/v1/departments?params=${query}`);
};

export const editDepartmentRequest = async (department, departmentId) => {
  return await putRequest(`api/v1/departments/${departmentId}`, department);
};

export const createDepartmentRequest = async (department) => {
  return await postRequest("api/v1/departments", department);
};

export const verifyAccountRequest = async (data) =>{
  return await postRequest(`api/v1/auth/email/verify/id=${data.id}/hash=${data.hash}`);
}

export const getAdminRequestList = async (page)=>{
  return await getRequest(`api/v1/admin/manage-requests?page=${page}`);
}

export const editStatusRequest = async (data) => {
  return await putRequest(`api/v1/requests/${data.id}`, data);
};

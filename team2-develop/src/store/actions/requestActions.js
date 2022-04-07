import { apiActions } from "../../configs/Api";
import {
  deleteRequest, getRequest,
  postRequest, putRequest
} from "../../helpers/axiosQuery";
import {
  REQUEST_APPROVAL_FAIL, REQUEST_APPROVAL_REQUEST,
  REQUEST_APPROVAL_SUCCESS, REQUEST_COMMENT_FAIL, REQUEST_COMMENT_REQUEST,
  REQUEST_COMMENT_SUCCESS, REQUEST_CREATE_FAIL,
  REQUEST_CREATE_REQUEST,
  REQUEST_CREATE_SUCCESS, REQUEST_DELETE_FAIL, REQUEST_DELETE_REQUEST,
  REQUEST_DELETE_SUCCESS, REQUEST_DETAIL_FAIL, REQUEST_DETAIL_REQUEST,
  REQUEST_DETAIL_SUCCESS, REQUEST_HISTORY_LIST_FAIL,
  REQUEST_HISTORY_LIST_REQUEST,
  REQUEST_HISTORY_LIST_SUCCESS, REQUEST_LIST_FAIL,
  REQUEST_LIST_REQUEST,
  REQUEST_LIST_SUCCESS, REQUEST_MY_LIST_FAIL,
  REQUEST_MY_LIST_REQUEST,
  REQUEST_MY_LIST_SUCCESS, REQUEST_REJECT_FAIL, REQUEST_REJECT_REQUEST,
  REQUEST_REJECT_SUCCESS, REQUEST_STAFF_FAIL, REQUEST_STAFF_REQUEST,
  REQUEST_STAFF_SUCCESS, REQUEST_UPDATE_FAIL,
  REQUEST_UPDATE_REQUEST,
  REQUEST_UPDATE_SUCCESS
} from "../constants/requestActionTypes.js";

export const listRequests =
  (page = "", filter = {}) =>
  async (dispatch) => {
    const {
      content = "",
      date = "",
      status = "",
      author = "",
      assign = "",
      category = "",
      request = "",
    } = filter;
    apiActions(
      dispatch,
      REQUEST_LIST_REQUEST,
      getRequest(
        `api/v1/requests?page=${page}&content=${content}&date=${date}&status=${status}&author=${author}&assign=${assign}&category=${category}&request=${request}`,
        filter
      ),
      REQUEST_LIST_SUCCESS,
      REQUEST_LIST_FAIL
    );
  };

export const listMyRequests = () => async (dispatch) => {
  apiActions(
    dispatch,
    REQUEST_MY_LIST_REQUEST,
    getRequest(`api/v1/requests/me`),
    REQUEST_MY_LIST_SUCCESS,
    REQUEST_MY_LIST_FAIL
  );
};

export const editRequest = (id, request) => async (dispatch) => {
  apiActions(
    dispatch,
    REQUEST_UPDATE_REQUEST,
    putRequest(`api/v1/requests/${id}/author`, request, id),
    REQUEST_UPDATE_SUCCESS,
    REQUEST_UPDATE_FAIL
  );
};
export const createRequest = (request) => async (dispatch) => {
  apiActions(
    dispatch,
    REQUEST_CREATE_REQUEST,
    postRequest(`api/v1/requests`, request),
    REQUEST_CREATE_SUCCESS,
    REQUEST_CREATE_FAIL
  );
};
export const cleanRequest = (id) => async (dispatch) => {
  apiActions(
    dispatch,
    REQUEST_DELETE_REQUEST,
    deleteRequest(`api/v1/requests/${id}`),
    REQUEST_DELETE_SUCCESS,
    REQUEST_DELETE_FAIL
  );
};

export const detailRequest = (id) => async (dispatch) => {
  apiActions(
    dispatch,
    REQUEST_DETAIL_REQUEST,
    getRequest(`api/v1/requests/${id}`),
    REQUEST_DETAIL_SUCCESS,
    REQUEST_DETAIL_FAIL
  );
};
export const historyRequest = (page) => async (dispatch) => {
  apiActions(
    dispatch,
    REQUEST_HISTORY_LIST_REQUEST,
    getRequest(`api/v1/requests/history?page=${page}`),
    REQUEST_HISTORY_LIST_SUCCESS,
    REQUEST_HISTORY_LIST_FAIL
  );
};
export const commentDetailRequest = (id, content) => async (dispatch) => {
  apiActions(
    dispatch,
    REQUEST_COMMENT_REQUEST,
    postRequest(`api/v1/requests/${id}/comment`, { content }),
    REQUEST_COMMENT_SUCCESS,
    REQUEST_COMMENT_FAIL
  );
};
export const requestStaffRequest = (page) => async (dispatch) => {
  apiActions(
    dispatch,
    REQUEST_STAFF_REQUEST,
    getRequest(`api/v1/requests/staff?page=${page}`),
    REQUEST_STAFF_SUCCESS,
    REQUEST_STAFF_FAIL
  );
};
export const requestApprovalRequest = (id) => async (dispatch) => {
  apiActions(
    dispatch,
    REQUEST_APPROVAL_REQUEST,
    postRequest(`api/v1/requests/${id}/approve`),
    REQUEST_APPROVAL_SUCCESS,
    REQUEST_APPROVAL_FAIL
  );
};

export const requestRejectRequest = (id) => async (dispatch) => {
  apiActions(
    dispatch,
    REQUEST_REJECT_REQUEST,
    postRequest(`api/v1/requests/${id}/reject`),
    REQUEST_REJECT_SUCCESS,
    REQUEST_REJECT_FAIL
  );
};

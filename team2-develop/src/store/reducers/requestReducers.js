import {
  REQUEST_LIST_REQUEST,
  REQUEST_LIST_SUCCESS,
  REQUEST_LIST_FAIL,
  REQUEST_MY_LIST_REQUEST,
  REQUEST_MY_LIST_SUCCESS,
  REQUEST_MY_LIST_FAIL,
  REQUEST_HISTORY_LIST_REQUEST,
  REQUEST_HISTORY_LIST_SUCCESS,
  REQUEST_HISTORY_LIST_FAIL,
  REQUEST_UPDATE_REQUEST,
  REQUEST_UPDATE_SUCCESS,
  REQUEST_UPDATE_FAIL,
  REQUEST_DELETE_REQUEST,
  REQUEST_DELETE_SUCCESS,
  REQUEST_DELETE_FAIL,
  REQUEST_CREATE_REQUEST,
  REQUEST_CREATE_SUCCESS,
  REQUEST_CREATE_FAIL,
  REQUEST_CREATE_RESET,
  REQUEST_UPDATE_RESET,
  REQUEST_DETAIL_REQUEST,
  REQUEST_DETAIL_SUCCESS,
  REQUEST_DETAIL_FAIL,
  REQUEST_STAFF_REQUEST,
  REQUEST_STAFF_SUCCESS,
  REQUEST_STAFF_FAIL,
} from "../constants/requestActionTypes.js";
const initialState = {
  isLoading: false,
  success: false,
  requests: null,
  comment: null,
  pages: null,
  page: null,
  error: null,
};
export const requestListReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_LIST_REQUEST:
      return { ...state, isLoading: true };
    case REQUEST_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        requests: action.payload,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case REQUEST_LIST_FAIL:
      return {
        ...state,
        isLoading: false,
        requests: null,
        pages: null,
        page: null,
        error: action.payload,
      };
    default:
      return state;
  }
};
export const requestHistoryListReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_HISTORY_LIST_REQUEST:
      return { ...state, isLoading: true };
    case REQUEST_HISTORY_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        requests: action.payload,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case REQUEST_HISTORY_LIST_FAIL:
      return {
        ...state,
        isLoading: false,
        requests: null,
        pages: null,
        page: null,
        error: action.payload,
      };
    default:
      return state;
  }
};
export const requestMyListReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_MY_LIST_REQUEST:
      return { ...state, isLoading: true };
    case REQUEST_MY_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        requests: action.payload.data,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case REQUEST_MY_LIST_FAIL:
      return {
        ...state,
        isLoading: false,
        requests: null,
        pages: null,
        page: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const requestUpdateReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_UPDATE_REQUEST:
      return { ...state, isLoading: true };
    case REQUEST_UPDATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        requests: action.payload,
      };
    case REQUEST_UPDATE_FAIL:
      return {
        ...state,
        isLoading: false,
        requests: null,
        error: action.payload,
      };
    case REQUEST_UPDATE_RESET:
      return { ...state, request: {} };
    default:
      return state;
  }
};
export const requestDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_DELETE_REQUEST:
      return { ...state, isLoading: true };
    case REQUEST_DELETE_SUCCESS:
      return { ...state, isLoading: false, success: true };
    case REQUEST_DELETE_FAIL:
      return {
        ...state,
        isLoading: false,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export const requestCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_CREATE_REQUEST:
      return { ...state, isLoading: true };
    case REQUEST_CREATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        requests: action.payload,
      };
    case REQUEST_CREATE_FAIL:
      return {
        ...state,
        isLoading: false,
        success: false,
        requests: null,
        error: action.payload,
      };
    case REQUEST_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
export const requestDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_DETAIL_REQUEST:
      return { ...state, isLoading: true };
    case REQUEST_DETAIL_SUCCESS:
      return { ...state, isLoading: false, requests: action.payload };
    case REQUEST_DETAIL_FAIL:
      return {
        ...state,
        isLoading: false,
        requests: null,
        error: action.payload,
      };

    default:
      return state;
  }
};
export const requestCommentReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_CREATE_REQUEST:
      return { ...state, isLoading: true };
    case REQUEST_CREATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        comment: action.payload,
      };
    case REQUEST_CREATE_FAIL:
      return {
        ...state,
        isLoading: false,
        success: false,
        comment: null,
        error: action.payload,
      };
    default:
      return state;
  }
};
export const requestStaffReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_STAFF_REQUEST:
      return { ...state, isLoading: true };
    case REQUEST_STAFF_SUCCESS:
      return {
        ...state,
        isLoading: false,
        requests: action.payload.data,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case REQUEST_STAFF_FAIL:
      return {
        ...state,
        isLoading: false,
        requests: null,
        pages: null,
        page: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

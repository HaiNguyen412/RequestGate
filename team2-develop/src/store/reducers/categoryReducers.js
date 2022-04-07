import {
  CATEGORY_LIST_FAIL,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
} from "../constants/categoryActionType";

const initialState = {
  isLoading: false,
  success: false,
  category: null,
  pages: null,
  page: null,
  error: null,
};
export const categoryListReducer = (state = initialState, action) => {
  switch (action.type) {
    case CATEGORY_LIST_REQUEST:
      return { ...state, isLoading: true };
    case CATEGORY_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        category: action.payload,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case CATEGORY_LIST_FAIL:
      return {
        ...state,
        isLoading: false,
        category: null,
        pages: null,
        page: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

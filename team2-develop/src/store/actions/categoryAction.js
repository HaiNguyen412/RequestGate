import { apiActions } from "../../configs/Api";
import { getRequest } from "../../helpers/axiosQuery";
import {
  CATEGORY_LIST_FAIL,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
} from "../constants/categoryActionType";
export const listCategory = () => async (dispatch) => {
  apiActions(
    dispatch,
    CATEGORY_LIST_REQUEST,
    getRequest(`api/v1/category/list`),
    CATEGORY_LIST_SUCCESS,
    CATEGORY_LIST_FAIL
  );
};

import { OPEN_SLIDEBAR } from "../constants";

export const changeSildebar = (isChange) => (dispatch) => {
  dispatch({
    type: OPEN_SLIDEBAR,
    payload: isChange,
  });
};

import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { categoryListReducer } from "./reducers/categoryReducers";
import {
  requestCommentReducer,
  requestCreateReducer,
  requestDeleteReducer,
  requestDetailReducer,
  requestHistoryListReducer,
  requestListReducer,
  requestMyListReducer,
  requestStaffReducer,
  requestUpdateReducer
} from "./reducers/requestReducers";
import { handleNotificationReducer } from "./reducers/uiReducers";
import {
  userChangePasswordReducer,
  userLoginReducer,
  userProfileReducer
} from "./reducers/userReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userChangePassword: userChangePasswordReducer,
  userProfile: userProfileReducer,
  handleNotification: handleNotificationReducer,
  requestList: requestListReducer,
  requestMyList: requestMyListReducer,
  requestHistoryList: requestHistoryListReducer,
  requestUpdate: requestUpdateReducer,
  requestDelete: requestDeleteReducer,
  requestCreate: requestCreateReducer,
  requestDetail: requestDetailReducer,
  requestComment: requestCommentReducer,
  requestStaff: requestStaffReducer,
  categoryList: categoryListReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  handleNotification: { notifications: [] },
};

const middleWare = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWare))
);
export default store;

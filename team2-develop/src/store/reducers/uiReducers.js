import { ADD_NOTI, REMOVE_NOTI, OPEN_SLIDEBAR } from "../constants";

export const handleNotificationReducer = (state = {}, action) => {
  switch (action.type) {
    case OPEN_SLIDEBAR:
      const openSlideBar = !action.payload;
      return {
        ...state,
        openSlideBar,
      };
    case ADD_NOTI:
      const newNoti = action.payload;
      const newNotificationList = [...state.notifications, newNoti];
      return {
        ...state,
        notifications: newNotificationList,
      };
    case REMOVE_NOTI:
      const notiIdRemove = action.payload.id;
      const newNotifications = [...state.notifications].filter(
        (item) => item.id !== notiIdRemove
      );
      return {
        ...state,
        notifications: newNotifications,
      };
    default:
      return state;
  }
};

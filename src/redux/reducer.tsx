import { combineReducers } from "redux";
import {
  MARK_TO_DELETE,
  RESET_CONFIRMATION,
  SET_ALLOW_DELETE,
  SET_CHECKING,
  SET_CONFIRMATION,
  SET_SHOW_UNDO_WINDOW,
  SET_TIMER_ID,
  SET_USERS,
  UNDO_DETETE,
} from "./actions";
import userType from "./../types/user";
import actionType from "./../types/action";

type AppState = {
  users: userType[];
  allowDelete: Boolean;
  reRenderUserList: Boolean;
  setCheckAll: Boolean;
  showConfirmation: Boolean;
  showUndoWindow: Boolean;
  timerID: string;
};

const initState: AppState = {
  users: [],
  allowDelete: false,
  reRenderUserList: false,
  setCheckAll: false,
  showConfirmation: false,
  showUndoWindow: false,
  timerID: "",
};

const userReducer = (
  state: AppState = initState,
  { type, payload }: actionType
): AppState => {
  switch (type) {
    case MARK_TO_DELETE:
      const markToDelete: userType[] = state.users;
      const { reRenderUserList } = state;
      markToDelete.forEach((element) => {
        if (element.isChecked) {
          element.isShowing = false;
          element.isDeleting = true;
        }
      });
      return {
        ...state,
        users: markToDelete,
        reRenderUserList: !reRenderUserList,
      };

    case RESET_CONFIRMATION:
      return { ...state, showConfirmation: false };

    case SET_ALLOW_DELETE:
      return { ...state, allowDelete: payload };

    case SET_CHECKING:
      const checkedUsers: userType[] = state.users;
      checkedUsers.forEach((element: userType) => {
        if (element.id === payload.id) {
          element.isChecked = payload.state;
        }
      });
      return { ...state, users: checkedUsers };

    case SET_CONFIRMATION:
      return { ...state, showConfirmation: true };

    case SET_SHOW_UNDO_WINDOW:
      return { ...state, showUndoWindow: payload };

    case SET_TIMER_ID:
      return { ...state, timerID: payload };

    case SET_USERS:
      const users: userType[] = [];
      payload.forEach((element: userType) => {
        element = {
          ...element,
          isChecked: false,
          isDeleting: false,
          isShowing: true,
        };
        users.push(element);
      });
      return { ...state, users };

    case UNDO_DETETE:
      const deletedUsers: userType[] = state.users;
      deletedUsers.forEach((element: userType) => {
        if (element.isDeleting) {
          element.isShowing = true;
          element.isDeleting = false;
          element.isChecked = false;
        }
      });
      return { ...state, users: deletedUsers };

    default:
      return state;
  }
};

export default combineReducers({
  userReducer,
});

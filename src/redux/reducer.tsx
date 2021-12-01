import { combineReducers } from "redux";
import {
  MARK_TO_DELETE,
  RESET_CONFIRMATION,
  RESET_SHOW_UNDO_WINDOW,
  SET_ALLOW_DELETE,
  SET_CHECKING,
  SET_CONFIRMATION,
  SET_SHOW_UNDO_WINDOW,
  SET_TIMER_ID,
  SET_USERS,
} from "./actions";
import userType from "./../types/user";
import actionType from "./../types/action";

type AppState = {
  users: userType[];
  showConfirmation: Boolean;
  reRenderUserList: Boolean;
  timerID: string;
  showUndoWindow: Boolean;
  allowDelete: Boolean;
};

const initState: AppState = {
  users: [],
  showConfirmation: false,
  reRenderUserList: false,
  timerID: "",
  showUndoWindow: false,
  allowDelete: false,
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
        }
      });
      return {
        ...state,
        users: markToDelete,
        reRenderUserList: !reRenderUserList,
      };

    case RESET_CONFIRMATION:
      return { ...state, showConfirmation: false };

    case RESET_SHOW_UNDO_WINDOW:
      return { ...state, showUndoWindow: false };

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
      return { ...state, showUndoWindow: true };

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

    default:
      return state;
  }
};

export default combineReducers({
  userReducer,
});

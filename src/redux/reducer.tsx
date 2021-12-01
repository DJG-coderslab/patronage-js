import { combineReducers } from "redux";
import {
  MARK_TO_DELETE,
  RESET_CONFIRMATION,
  SET_CHECKING,
  SET_CONFIRMATION,
  SET_USERS,
} from "./actions";
import userType from "./../types/user";
import actionType from "./../types/action";

type AppState = {
  users: userType[];
  showConfirmation: Boolean;
  reRenderUserList: Boolean;
};

const initState: AppState = {
  users: [],
  showConfirmation: false,
  reRenderUserList: false,
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

import { combineReducers } from "redux";
import { SET_CHECKING, SET_USERS } from "./actions";
import userType from "./../types/user";
import actionType from "./../types/action";

type AppState = {
  users: userType[];
};

const initState: AppState = {
  users: [],
};

const userReducer = (
  state: AppState = initState,
  { type, payload }: actionType
): AppState => {

  switch (type) {
    case SET_CHECKING:
      const checkedUsers: userType[] = state.users;
      checkedUsers.forEach((element: userType) => {
        if (element.id === payload.id) {
          element.isChecked = payload.state;
        }
      });
      return { ...state, users: checkedUsers };

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

import { combineReducers } from "redux";
import * as R from "ramda";
import {
  CHANGE_USER,
  CHECK_ALL,
  FILTER,
  MARK_TO_DELETE,
  RESET_CONFIRMATION,
  SET_ALLOW_DELETE,
  SET_CHECKING,
  SET_CONFIRMATION,
  SET_HOBBIES,
  SET_SHOW_EDIT_USER_WINDOW,
  SET_SHOW_UNDO_WINDOW,
  SET_TIMER_ID,
  SET_USERS,
  SET_USER_TO_EDIT,
  SHOW_ALL_USERS,
  UNDO_DETETE,
} from "./actions";
import actionType from "./../types/action";
import hobbyType from "../types/hobbies";
import userType from "./../types/user";

type AppState = {
  users: userType[];
  hobbies: hobbyType[];
  allowDelete: Boolean;
  reRenderUserList: Boolean;
  showConfirmation: Boolean;
  showEditUserWindow: Boolean;
  showUndoWindow: Boolean;
  timerID: string;
  userToEdit: userType;
};

const initState: AppState = {
  users: [],
  hobbies: [],
  allowDelete: false,
  reRenderUserList: false,
  showConfirmation: false,
  showEditUserWindow: false,
  showUndoWindow: false,
  timerID: "",
  userToEdit: {
    id: "-1",
    name: "John",
    lastName: "Doe",
    email: "",
    age: -1,
    gender: "",
    phoneNumber: "",
    address: "",
    dateOfBirth: "",
    hobbies: [""],
  },
};

const userReducer = (
  state: AppState = initState,
  { type, payload }: actionType
): AppState => {
  switch (type) {
    case CHANGE_USER:
      const changedUsers = R.map((user: userType) => {
        if (user.id === payload.id) {
          user = R.mergeRight(user, payload);
        }
        return user;
      }, state.users);
      return { ...state, users: changedUsers };

    case CHECK_ALL:
      const checkedAllUsers: userType[] = state.users;
      const reRenderCheckedAllUsers = state.reRenderUserList;
      checkedAllUsers.forEach((element: userType) => {
        if (element.isShowing) {
          element.isChecked = payload;
        }
      });
      return {
        ...state,
        users: checkedAllUsers,
        reRenderUserList: !reRenderCheckedAllUsers,
      };

    case FILTER:
      const filteredUsers = R.filter((user: userType) => {
        if (!R.toUpper(user[payload.col]).includes(R.toUpper(payload.value))) {
          user.isShowing = false;
        }
        // TODO for "" shoud be showing all item for selected column
        return user;
      }, state.users);
      return { ...state, users: filteredUsers };

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
      const checkedUsers = R.map((user) => {
        if (user.id === payload.id) {
          user.isChecked = payload.state;
        }
        return user;
      }, state.users);
      return { ...state, users: checkedUsers };

    case SET_CONFIRMATION:
      return { ...state, showConfirmation: true };

    case SET_SHOW_EDIT_USER_WINDOW:
      return { ...state, showEditUserWindow: payload };

    case SET_SHOW_UNDO_WINDOW:
      return { ...state, showUndoWindow: payload };

    case SET_TIMER_ID:
      return { ...state, timerID: payload };

    case SET_USERS:
      const users = R.map((element: userType) => ({
        ...element,
        isChecked: false,
        isDeleting: false,
        isShowing: true,
      }))(payload);
      return { ...state, users };

    case SET_HOBBIES:
      return { ...state, hobbies: payload };

    case SET_USER_TO_EDIT:
      return { ...state, userToEdit: payload };

    case SHOW_ALL_USERS:
      const allUsers = R.map((user) => {
        user.isShowing = true;
        return user;
      }, state.users);
      return { ...state, users: allUsers };

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

const rootReducer = combineReducers({
  userReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;

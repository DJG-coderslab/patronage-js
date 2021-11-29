import { combineReducers } from "redux";
import { SET_USERS } from "./actions";

type AppState = {
  // usersForDeleting: Array,
  dwa: string;
  users: [];
};
type Action = { type: string; payload: any };

const initState: AppState = {
  // usersForDeleting: [],
  users: [],
  dwa: "",
};

const User = (state: AppState = initState, action: Action): AppState => {
  switch (action.type) {
    case SET_USERS:
      return { ...state, users: action.payload };

    default:
      return state;
  }
};

export default combineReducers({
  User,
});

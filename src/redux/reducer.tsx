import { combineReducers } from "redux";
import { SET_USERS } from "./actions";
import user_type from "./../types/user";

type AppState = {
  dwa: string;
  users: user_type[];
};
type Action = { type: string; payload: any };

const initState: AppState = {
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

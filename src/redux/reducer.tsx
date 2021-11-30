import { combineReducers } from "redux";
import { SET_USERS } from "./actions";
import userType from "./../types/user";

type AppState = {
  users: userType[];
};
type Action = { type: string; payload: any };

const initState: AppState = {
  users: [],
};

const userReducer = (state: AppState = initState, action: Action): AppState => {
  switch (action.type) {
    case SET_USERS:
      return { ...state, users: action.payload };

    default:
      return state;
  }
};

export default combineReducers({
  userReducer,
});

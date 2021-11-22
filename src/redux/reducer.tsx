import { combineReducers } from "redux";

type AppState = {
    raz: string,
    dwa: string,
};
type Action = { type: "TEST"; payload: string };

const initState: AppState = {
  raz: "",
  dwa: "",
};

const User = (state: AppState = initState, action: Action): AppState => {
  switch (action.type) {
    default:
      return state;
  }
};

export default combineReducers({
  User,
});

import { URLDB } from "./../configApp";
import actionType from "../types/action";

const SET_CHECKING: string = "SET_CHECKING";
const SET_USERS: string = "SET_USERS";

const setUsers: any = (value: []): actionType => ({
  type: SET_USERS,
  payload: value,
});

const setChecked: any = (value: Boolean): actionType => ({
  type: SET_CHECKING,
  payload: value,
});

const getUsersList = () => (dispatch: any) => {
  const getAllUsers = async () => {
    try {
      const resp = await fetch(`${URLDB}/users`);
      const data = await resp.json();
      dispatch(setUsers(data));
    } catch (err) {
      console.error("Something was wrong with getting the usersList ", err);
    }
  };
  getAllUsers();
};

export { SET_CHECKING, SET_USERS, getUsersList, setChecked, setUsers };

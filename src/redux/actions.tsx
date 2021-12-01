import { URLDB } from "./../configApp";
import actionType from "../types/action";

const MARK_TO_DELETE: string = "MARK_TO_DELETE";
const RESET_CONFIRMATION: string = "RESET_CONFIRMATION";
const SET_CHECKING: string = "SET_CHECKING";
const SET_CONFIRMATION: string = "SET_CONFIRMATION";
const SET_USERS: string = "SET_USERS";

const markToDelete: any = (): actionType => ({
  type: MARK_TO_DELETE,
  payload: null,
});

const resetConfirmation: any = (): actionType => ({
  type: RESET_CONFIRMATION,
  payload: false,
});

const setConfirmation: any = (): actionType => ({
  type: SET_CONFIRMATION,
  payload: true,
});

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

export {
  MARK_TO_DELETE,
  SET_CHECKING,
  SET_CONFIRMATION,
  SET_USERS,
  RESET_CONFIRMATION,
  getUsersList,
  markToDelete,
  resetConfirmation,
  setChecked,
  setConfirmation,
  setUsers,
};

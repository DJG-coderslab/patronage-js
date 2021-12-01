import { URLDB } from "./../configApp";
import actionType from "../types/action";

const MARK_TO_DELETE: string = "MARK_TO_DELETE";
const RESET_CONFIRMATION: string = "RESET_CONFIRMATION";
const RESET_SHOW_UNDO_WINDOW: string = "RESET_SHOW_UNDO_WINDOW";
const SET_ALLOW_DELETE: string = "SET_ALLOW_DELETE";
const SET_CHECKING: string = "SET_CHECKING";
const SET_CONFIRMATION: string = "SET_CONFIRMATION";
const SET_SHOW_UNDO_WINDOW: string = "SET_SHOW_UNDO_WINDOW";
const SET_USERS: string = "SET_USERS";
const SET_TIMER_ID: string = "SET_TIMER_ID";

const markToDelete: any = (): actionType => ({
  type: MARK_TO_DELETE,
  payload: null,
});

const setChecked: any = (value: Boolean): actionType => ({
  type: SET_CHECKING,
  payload: value,
});

const resetConfirmation: any = (): actionType => ({
  type: RESET_CONFIRMATION,
  payload: false,
});

const resetShowUndoWindow: any = (): actionType => ({
  type: RESET_SHOW_UNDO_WINDOW,
  payload: false,
});

const setAllowDelete: any = (value: Boolean): actionType => ({
  type: SET_ALLOW_DELETE,
  payload: value,
});

const setConfirmation: any = (): actionType => ({
  type: SET_CONFIRMATION,
  payload: true,
});

const setShowUndoWindow: any = (): actionType => ({
  type: SET_SHOW_UNDO_WINDOW,
  payload: true,
});

const setTimerID: any = (value: string): actionType => ({
  type: SET_TIMER_ID,
  payload: value,
});

const setUsers: any = (value: []): actionType => ({
  type: SET_USERS,
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

const undoDeleteTimer = () => (dispatch: any, getState: any) => {
  const timerID = setTimeout(() => {
    console.log("Timer is done");
    const { allowDelete } = getState().userReducer;
    if (allowDelete) {
      console.log("At now is deleting items....");
    }
  }, 3500);
  dispatch(setTimerID(timerID));
};

const stopUndoTimer = () => (dispatch: any) => {
  dispatch(setAllowDelete(false));
};

export {
  MARK_TO_DELETE,
  SET_ALLOW_DELETE,
  SET_CHECKING,
  SET_CONFIRMATION,
  SET_SHOW_UNDO_WINDOW,
  SET_TIMER_ID,
  SET_USERS,
  RESET_CONFIRMATION,
  RESET_SHOW_UNDO_WINDOW,
  getUsersList,
  markToDelete,
  resetConfirmation,
  resetShowUndoWindow,
  setAllowDelete,
  setChecked,
  setConfirmation,
  setShowUndoWindow,
  setUsers,
  stopUndoTimer,
  undoDeleteTimer,
};

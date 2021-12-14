import { URLDB } from "./../configApp";
import actionType from "../types/action";
import { userRecordDB, userRecordType, userType } from "./../types/user";
import hobbyType from "../types/hobbies";
import * as R from "ramda";

const CHANGE_USER: string = "CHANGE_USER";
const CHECK_ALL: string = "CHECK_ALL";
const FILTER: string = "FILTER";
const MARK_TO_DELETE: string = "MARK_TO_DELETE";
const RESET_CONFIRMATION: string = "RESET_CONFIRMATION";
const SHOW_ALL_USERS: string = "SHOW_ALL_USERS";
const SET_ALLOW_DELETE: string = "SET_ALLOW_DELETE";
const SET_CHECKING: string = "SET_CHECKING";
const SET_CONFIRMATION: string = "SET_CONFIRMATION";
const SET_HOBBIES: string = "SET_HOBBIES";
const SET_SHOW_EDIT_USER_WINDOW: string = "SHOW_EDIT_USER_WINDOW";
const SET_SHOW_UNDO_WINDOW: string = "SET_SHOW_UNDO_WINDOW";
const SET_SORTING: string = "SET_SORTING";
const SET_USERS: string = "SET_USERS";
const SET_USER_TO_EDIT: string = "SET_USER_TO_EDIT";
const SET_TIMER_ID: string = "SET_TIMER_ID";
const UNDO_DETETE: string = "UNDO_DELETE";

const changeUser: any = (value: userType): actionType => ({
  type: CHANGE_USER,
  payload: value,
});

const checkAll: any = (value: Boolean): actionType => ({
  type: CHECK_ALL,
  payload: value,
});

const filter: any = (value: { col: string; value: string }): actionType => ({
  type: FILTER,
  payload: value,
});

const markToDelete: any = (): actionType => ({
  type: MARK_TO_DELETE,
  payload: null,
});

const resetConfirmation: any = (): actionType => ({
  type: RESET_CONFIRMATION,
  payload: false,
});

const setAllowDelete: any = (value: Boolean): actionType => ({
  type: SET_ALLOW_DELETE,
  payload: value,
});

const setChecked: any = (value: Boolean): actionType => ({
  type: SET_CHECKING,
  payload: value,
});

const setConfirmation: any = (): actionType => ({
  type: SET_CONFIRMATION,
  payload: true,
});

const setHobbies: any = (value: hobbyType): actionType => ({
  type: SET_HOBBIES,
  payload: value,
});

const setShowEditUserWindow: any = (value: Boolean): actionType => ({
  type: SET_SHOW_EDIT_USER_WINDOW,
  payload: value,
});

const setShowUndoWindow: any = (value: Boolean): actionType => ({
  type: SET_SHOW_UNDO_WINDOW,
  payload: value,
});

const setSorting: any = (value: userType[]): actionType => ({
  type: SET_SORTING,
  payload: value,
});

const setTimerID: any = (value: string): actionType => ({
  type: SET_TIMER_ID,
  payload: value,
});

const setUsers: any = (value: []): actionType => ({
  type: SET_USERS,
  payload: value,
});

const setUserToEdit: any = (value: userType): actionType => ({
  type: SET_USER_TO_EDIT,
  payload: value,
});

const showAllUsers: any = (): actionType => ({
  type: SHOW_ALL_USERS,
  payload: null,
});

const undoDelete: any = (): actionType => ({
  type: UNDO_DETETE,
  payload: null,
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

const getHobbies = () => (dispatch: any) => {
  const fetchHobbies = async () => {
    try {
      const resp = await fetch(`${URLDB}/hobbies`);
      const data = await resp.json();
      dispatch(setHobbies(data));
    } catch (err) {
      console.error("Something was wrong with getting the hobbies ", err);
    }
  };
  fetchHobbies();
};

const modifyUser = (user: userType, setting: any) => (dispatch: any) => {
  const putUser = async (userRecord: userRecordType) => {
    try {
      const id = userRecord.id;
      const userRecordDB: userRecordDB = {
        name: userRecord.name,
        lastName: userRecord.lastName,
        email: userRecord.email,
        gender: userRecord.gender,
        phoneNumber: userRecord.phoneNumber,
        address: userRecord.address,
        dateOfBirth: userRecord.dateOfBirth,
        hobbies: userRecord.hobbies,
        age: userRecord.age,
      };
      const resp = await fetch(`${URLDB}/users/${id}`, {
        method: "PUT",
        body: JSON.stringify(userRecordDB),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await resp.json();
      const changedUser = R.merge(data, setting);
      dispatch(changeUser(changedUser));
    } catch (err) {
      console.error("Modyfication failed: ", err);
    }
  };
  putUser(user);
};

const sortByColumn =
  (column: string, direction: string) => (dispatch: any, getState: any) => {
    const compareValues = (key: string, order: string = "asc") => {
      return (a: any, b: any) => {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
          return 0;
        }
        const varA = typeof a[key] === "string" ? R.toUpper(a[key]) : a[key];
        const varB = typeof b[key] === "string" ? R.toUpper(b[key]) : b[key];
        let comparison = 0;
        if (varA > varB) {
          comparison = 1;
        } else if (varA < varB) {
          comparison = -1;
        }
        return order === "desc" ? comparison * -1 : comparison;
      };
    };
    dispatch(
      setSorting(
        R.sort(compareValues(column, direction), getState().userReducer.users)
      )
    );
  };

const undoDeleteTimer = () => (dispatch: any, getState: any) => {
  const timerID = setTimeout(() => {
    console.log("Timer is done");
    const { allowDelete } = getState().userReducer;
    if (allowDelete) {
      console.log("At now is deleting items....");
      dispatch(setShowUndoWindow(false));
    }
  }, 3500);
  dispatch(setTimerID(timerID));
};

export {
  CHANGE_USER,
  CHECK_ALL,
  FILTER,
  MARK_TO_DELETE,
  SET_ALLOW_DELETE,
  SET_CHECKING,
  SET_CONFIRMATION,
  SET_HOBBIES,
  SET_SHOW_EDIT_USER_WINDOW,
  SET_SHOW_UNDO_WINDOW,
  SET_SORTING,
  SET_TIMER_ID,
  SET_USERS,
  SET_USER_TO_EDIT,
  SHOW_ALL_USERS,
  RESET_CONFIRMATION,
  UNDO_DETETE,
  changeUser,
  checkAll,
  filter,
  getHobbies,
  getUsersList,
  markToDelete,
  modifyUser,
  resetConfirmation,
  setAllowDelete,
  setChecked,
  setConfirmation,
  setShowEditUserWindow,
  setShowUndoWindow,
  setUsers,
  setUserToEdit,
  showAllUsers,
  sortByColumn,
  undoDelete,
  undoDeleteTimer,
};

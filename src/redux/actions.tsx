import { URLDB } from "../configApp";

const SET_USERS: string = "SET_USERS";

const setUsers: any = (value: []) => ({ type: SET_USERS, payload: value });

const getUsersList = () => (dispatch: any) => {
  const getAllUsers = async () => {
    try {
      const resp = await fetch(`${URLDB}/users`);
      const data = await resp.json();
      dispatch(setUsers(data));
    } catch (err) {
      console.error("Something wraong with getting the usersList ", err);
    }
  };
  getAllUsers();
};

export { SET_USERS, getUsersList, setUsers };

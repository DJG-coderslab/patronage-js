import { URLDB } from "./../configApp";
import userType from "./../types/user";

const SET_USERS: string = "SET_USERS";

const setUsers: any = (value: []) => ({ type: SET_USERS, payload: value });

const getUsersList = () => (dispatch: any) => {
  const users: userType[] = [];
  const getAllUsers = async () => {
    try {
      const resp = await fetch(`${URLDB}/users`);
      const data = await resp.json();
      data.forEach((element: userType) => {
        element = { ...element, isDeleting: false, isShowing: true };
        users.push(element);
      });
      dispatch(setUsers(users));
    } catch (err) {
      console.error("Something was wrong with getting the usersList ", err);
    }
  };
  getAllUsers();
};

export { SET_USERS, getUsersList, setUsers };

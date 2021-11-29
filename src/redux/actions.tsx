import { URLDB } from "./../configApp";
import user_type from "./../types/user";

const SET_USERS: string = "SET_USERS";

const setUsers: any = (value: []) => ({ type: SET_USERS, payload: value });

const getUsersList = () => (dispatch: any) => {
  const users: user_type[] = [];
  const getAllUsers = async () => {
    try {
      const resp = await fetch(`${URLDB}/users`);
      const data = await resp.json();
      data.forEach((element: user_type) => {
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

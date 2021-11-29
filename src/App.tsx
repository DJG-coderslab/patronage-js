import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Provider } from "react-redux";
import "./App.css";
import store from "./redux/store";
import OneUser from "./components/OneUser";
import UsersList from "./components/UsersList";
import { getUsersList } from "./redux/actions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersList());
  }, [dispatch]);

  return (
    // <Provider store={store}>
    <UsersList />
    // </Provider>
  );
}

export default App;

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUsersList, getHobbies } from "./redux/actions";
import "./App.css";
import UsersList from "./components/UsersList";
import Footer from "./components/Footer";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersList());
    dispatch(getHobbies());
  }, [dispatch]);

  return (
    <>
      <UsersList />
      <Footer />
    </>
  );
}

export default App;

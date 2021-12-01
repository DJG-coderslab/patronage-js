import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUsersList } from "./redux/actions";
import "./App.css";
import UsersList from "./components/UsersList";
import Footer from "./components/Footer";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersList());
  }, [dispatch]);

  return (
    <>
      <UsersList />
      <Footer />
    </>
  );
}

export default App;

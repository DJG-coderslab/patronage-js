import { Provider } from "react-redux";
import './App.css';
import store from "./redux/store";
import OneUser from "./components/OneUser";

function App() {

  return (
    <Provider store={store}>
      <OneUser />
    </Provider>
  );
}

export default App;

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as R from "ramda";
import { MDBBtn, MDBContainer, MDBIcon, MDBNavbar } from "mdb-react-ui-kit";
import useInput from "../../hooks/useInput";
import { filter, showAllUsers } from "../../redux/actions";
import { userColumns } from "../../configApp";

export default function NavBar() {
  const dispatch = useDispatch();
  const [col, connectCol, setCol] = useInput("");
  const [value, connectValue, setValue] = useInput("");
  const columns = R.pipe(
    R.head,
    R.keys,
    R.drop(1),
    R.dropLast(3)
  )(useSelector((state) => state.userReducer.users));

  const handlingSearch = (e) => {
    e.preventDefault();
    dispatch(filter({ col, value }));
  };

  const cancelSearch = () => {
    dispatch(showAllUsers());
  };

  return (
    <MDBNavbar expand="lg" light bgColor="light">
      <MDBContainer fluid>
        <form className="d-flex input-group w-auto">
          <select {...connectCol}>
            {/* <option>All</option> */}
            // TODO to implement in future
            {R.map(
              (column) => (
                <option key={column} value={column}>
                  {column}
                </option>
              ),
              columns
            )}
          </select>
          <input
            type="search"
            className="form-control"
            placeholder="Type query"
            aria-label="Search"
            {...connectValue}
          />
          <MDBBtn onClick={handlingSearch} color="primary" size="sm">
            Search
          </MDBBtn>
        </form>
        <div onClick={cancelSearch}>
          <MDBIcon fas icon="ban" />
        </div>
      </MDBContainer>
    </MDBNavbar>
  );
}

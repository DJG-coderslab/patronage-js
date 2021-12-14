import { BaseSyntheticEvent, useState } from "react";
import { useDispatch } from "react-redux";
import * as R from "ramda";
import { MDBBtn, MDBContainer, MDBIcon, MDBNavbar } from "mdb-react-ui-kit";
import useInput from "../../hooks/useInput";
import { filter, showAllUsers, sortByColumn } from "../../redux/actions";

export default function NavBar() {
  const dispatch = useDispatch();
  const [sortCol, setSortCol] = useState("");
  const [col, connectCol] = useInput("");
  const [value, connectValue] = useInput("");
  const columns = [
    "name",
    "lastName",
    "email",
    "gender",
    "phoneNumber",
    "address",
    "dateOfBirth",
    "hobbies",
  ];

  const handlingSearch = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    dispatch(filter({ col, value }));
  };

  const cancelSearch = () => {
    dispatch(showAllUsers());
  };

  const sort = (direction: string) => {
    dispatch(sortByColumn(sortCol, direction));
  };

  return (
    <MDBNavbar expand="lg" light bgColor="light">
      <MDBContainer fluid>
        <form className="d-flex input-group w-auto">
          <select {...connectCol}>
            <option>Select column</option>
            {/* <option>All</option> */}
            {/* TODO to implement in future */}
            {R.map(
              (column: string) => (
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
        <select onChange={(e) => setSortCol(e.target.value)}>
          <option>Sort by</option>
          {R.map(
            (column) => (
              <option key={column} value={column}>
                {column}
              </option>
            ),
            columns
          )}
        </select>
        <div onClick={() => sort("asc")}>
          <MDBIcon fas icon="sort-amount-down-alt" />
        </div>
        <div onClick={() => sort("desc")}>
          <MDBIcon fas icon="sort-amount-down" />
        </div>
      </MDBContainer>
    </MDBNavbar>
  );
}

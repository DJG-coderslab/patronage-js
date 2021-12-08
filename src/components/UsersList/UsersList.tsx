import { useEffect } from "react";
import { useSelector } from "react-redux";
import { MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import * as R from "ramda";
import ConfirmDelete from "../ConfirmDelete";
import OneUser from "../OneUser";
import TableFooter from "../TableFooter";
import Undo from "./../Undo";
import userType from "../../types/user";
import EditUser from "../EditUser";
import NavBar from "../NavBar";
import TableHeader from "../TableHeader";

export default function UsersList() {
  const { users, reRenderUserList } = useSelector((state) => state.userReducer);

  useEffect(() => {}, [reRenderUserList]);

  return (
    <>
      <ConfirmDelete />
      <Undo />
      <EditUser />
      <MDBContainer>
        <MDBRow>
          <MDBCol>
            <NavBar />
          </MDBCol>
        </MDBRow>
        <TableHeader />
      </MDBContainer>
      <MDBContainer>
        {R.pipe(
          R.filter((user) => user.isShowing),
          R.map((user) => <OneUser key={user.id} user={user} />)
        )(users)}
        <TableFooter />
      </MDBContainer>
    </>
  );
}

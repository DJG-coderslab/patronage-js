import { useEffect } from "react";
import { useSelector } from "react-redux";
import { MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import ConfirmDelete from "../ConfirmDelete";
import OneUser from "../OneUser";
import TableFooter from "../TableFooter";
import userType from "../../types/user";

export default function UsersList() {
  const { users, reRenderUserList } = useSelector((state) => state.userReducer);

  useEffect(() => {
    console.log("UserLisr rerender");
  }, [reRenderUserList]);

  return (
    <>
      <ConfirmDelete />
      <MDBContainer>
        <MDBRow>
          <MDBCol>nazwa z szukajką</MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol>Nagłówki</MDBCol>
        </MDBRow>
      </MDBContainer>
      <MDBContainer>
        {users
          .filter((item: userType) => {
            if (item.isShowing) {
              return true;
            }
            return false;
          })
          .map((item: userType) => {
            return <OneUser key={item.id} user={item} />;
          })}
        <TableFooter />
      </MDBContainer>
    </>
  );
}

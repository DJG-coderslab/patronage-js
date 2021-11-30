import { useSelector } from "react-redux";
import { MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import OneUser from "../OneUser";
import userType from "../../types/user";

export default function UsersList() {
  const users = useSelector((state) => state.userReducer.users);

  return (
    <>
      <MDBContainer>
        <MDBRow>
          <MDBCol>nazwa z szukajką</MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol>Nagłówki</MDBCol>
        </MDBRow>
      </MDBContainer>
      <MDBContainer>
        {users.map((item: userType) => (
          <OneUser key={item.id} user={item} />
        ))}
      </MDBContainer>
    </>
  );
}

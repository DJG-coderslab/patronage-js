import { MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import OneUser from "../OneUser";

import users from "./../../testData/users";


export default function UsersList() {
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
        {users.map((item, idx) => (
          <OneUser key={idx} user={item} />
        ))}
      </MDBContainer>
    </>
  );
}

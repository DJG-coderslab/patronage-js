import { useState } from "react";
import { MDBCol, MDBContainer, MDBIcon, MDBRow } from "mdb-react-ui-kit";

type Props = {
  user: {
    name: string;
    lastName: string;
    email: string;
    address: string;
    dateOfBirth: string;
  };
};

const OneUser: React.FC<Props> = ({ user }): React.ReactElement => {
  const [isExpand, setIsExpand] = useState<Boolean>(false);

  const age = (dateOfBirth: string) => {
    const now = new Date().getTime();
    const dob = new Date(dateOfBirth).getTime();
    const age_dt = new Date(now - dob);
    return Math.abs(age_dt.getUTCFullYear() - 1970);
  };

  const toggleExpand = () => setIsExpand(!isExpand);

  return (
    <MDBContainer className="border-bottom py-2">
      <MDBRow onClick={toggleExpand}>
        <MDBCol md="1">
          {isExpand ? (
            <MDBIcon fas icon="chevron-down" />
          ) : (
            <MDBIcon fas icon="chevron-right" />
          )}
        </MDBCol>
        <MDBCol md="10">
          <MDBRow>
            <MDBCol md="3">
              <h5>
                {user.name} {user.lastName}
              </h5>
            </MDBCol>
            <MDBCol md="6">
              <h6>{user.email}</h6>
            </MDBCol>
          </MDBRow>
          {isExpand && (
            <MDBRow>
              <MDBCol md="7">
                <div className="card">
                  <div className="card-header">Address</div>
                  <div className="card-text text-center py-2">
                    {user.address}
                  </div>
                </div>
              </MDBCol>
              <MDBCol md="3">
                <div className="card">
                  <div className="card-header">Birthday</div>
                  <div className="card-text text-center py-2">
                    {user.dateOfBirth}
                  </div>
                </div>
              </MDBCol>
              <MDBCol md="2">
                <div className="card">
                  <div className="card-header">Age</div>
                  <div className="card-text text-center py-2">
                    {age(user.dateOfBirth)}
                  </div>
                </div>
              </MDBCol>
            </MDBRow>
          )}
        </MDBCol>
        <MDBCol md="1">A</MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default OneUser;

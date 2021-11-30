import { useState } from "react";
import { useDispatch } from "react-redux";
import { MDBCol, MDBContainer, MDBIcon, MDBRow } from "mdb-react-ui-kit";
import { setChecked } from "./../../redux/actions";

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
  const dispatch = useDispatch();
  const [isExpand, setIsExpand] = useState<Boolean>(false);

  const age = (dateOfBirth: string) => {
    const now = new Date().getTime();
    const dob = new Date(dateOfBirth).getTime();
    const age_dt = new Date(now - dob);
    return Math.abs(age_dt.getUTCFullYear() - 1970);
  };

  const toggleExpand = () => setIsExpand(!isExpand);

  const setCheckedItem = (
    e: MouseEventHandler<HTMLInputElement>,
    id: string
  ) => {
    dispatch(setChecked({ state: e.target.checked, id }));
  };

  return (
    <MDBContainer className="border-bottom py-2">
      <MDBRow>
        <MDBCol md="1" onClick={toggleExpand}>
          {isExpand ? (
            <MDBIcon fas icon="chevron-down" />
          ) : (
            <MDBIcon fas icon="chevron-right" />
          )}
        </MDBCol>
        <MDBCol md="10" onClick={toggleExpand}>
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
        <MDBCol md="1">
          <div>
            <input
              onClick={(e) => setCheckedItem(e, user.id)}
              className="form-check-input"
              type="checkbox"
              value=""
            />
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default OneUser;

import { MDBCol, MDBContainer, MDBIcon, MDBRow } from "mdb-react-ui-kit";

import * as users from "./../../testData/users.json";

type Props = {
    user: {
        name: string,
        lastName: string,
        email: string,
        address: string,
        dateOfBirth: string
    },
};

type u = {
        name: string,
        lastName: string,
        email: string,
        address: string,
        dateOfBirth: string

}

const OneUser: React.FC<Props> = ({ user }): React.ReactElement => {
    // const u = user;
    console.log("user: ", user);

    const age = (dateOfBirth: string) => {
        const now = new Date().getTime();
        const dob = new Date(dateOfBirth).getTime();
        const age_dt = new Date(now - dob);
        return Math.abs(age_dt.getUTCFullYear() - 1970);
    };

    return (
        <MDBContainer className="border-bottom py-2">
            <MDBRow>
                <MDBCol md="1">
                    <MDBIcon fas icon="chevron-right" />
                </MDBCol>
                <MDBCol md="10">
                    <MDBRow>
                        <MDBCol md="3">
                            {user.name} {user.lastName}
                        </MDBCol>
                        <MDBCol md="6">{user.email}</MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md="8">{user.address}</MDBCol>
                        <MDBCol md="1">{age(user.dateOfBirth)}</MDBCol>
                        <MDBCol md="3">{user.dateOfBirth}</MDBCol>
                    </MDBRow>
                </MDBCol>
                <MDBCol md="1">A</MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};

export default OneUser;

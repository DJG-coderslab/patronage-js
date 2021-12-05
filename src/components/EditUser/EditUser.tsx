import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MDBBtn,
  MDBModal,
  MDBModalFooter,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBModalHeader,
  MDBModalTitle,
  MDBInput,
} from "mdb-react-ui-kit";
import { setShowEditUserWindow, setUserToEdit } from "../../redux/actions";
import useInput from "./../../hooks/useInput";
import userType from "../../types/user";
import { Form } from "react-bootstrap";

export default function EditUser() {
  const dispatch = useDispatch();
  const { showEditUserWindow } = useSelector((state) => state.userReducer);
  const u = useSelector((state) => state.userReducer.userToEdit);
  const [name, connectName, setName] = useInput(u.name);
  const [lastName, connectLastName, setLastName] = useInput(u.lastName);
  const [email, connectEmail, setEmail] = useInput(u.email);
  const [address, connectAddress, setAddress] = useInput(u.address);
  const [birthday, connectBirthday, setBirthday] = useInput(u.dateOfBirth);
  const [phone, connectPhone, setPhone] = useInput(u.phoneNumber);
  const [gender, connectGender, setGender] = useInput(u.gender);
  const [hobbies, connectHobbies, setHobbies] = useInput("");
  const closeWindow = () => {
    dispatch(setShowEditUserWindow(false));
    // dispatch(setUserToEdit(""));
  };

  useEffect(() => {
    console.log("U was changed ");
    setName(u.name);
    setLastName(u.lastName);
    setEmail(u.email);
    setAddress(u.address);
    setBirthday(u.dateOfBirth);
    setPhone(u.phoneNumber);
    setGender(u.gender);
  }, [u]);

  return (
    <MDBModal show={showEditUserWindow} staticBackdrop tabIndex="-1">
      <MDBModalDialog>
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle>Edit user</MDBModalTitle>
            <MDBBtn className="btn-close" color="none" onClick={closeWindow} />
          </MDBModalHeader>
          <MDBModalBody></MDBModalBody>
          <Form>
            <Form.Group className="mb-3 px-3" controlId="formEditUser">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                {...connectName}
                value={name}
              />
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your last name"
                {...connectLastName}
                value={lastName}
              />
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your email"
                {...connectEmail}
                value={email}
              />
              <Form.Label>Gender</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your gender"
                {...connectGender}
                value={gender}
              />
              <Form.Label>Phone number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your phone number"
                {...connectPhone}
                value={phone}
              />
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your address"
                {...connectAddress}
                value={address}
              />
              <Form.Label>Date of birdth</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your date of birth"
                {...connectBirthday}
                value={birthday}
              />
              <Form.Label>Hobbies</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your hobbies"
                {...connectHobbies}
                value={hobbies}
              />
            </Form.Group>
          </Form>
          <MDBModalFooter>
            <MDBBtn color="secondary" onClick={closeWindow}>
              Cancel
            </MDBBtn>
            <MDBBtn color="success">Send it</MDBBtn>
          </MDBModalFooter>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
    // TODO needed the agree to leave unsave Form
  );
}

import { useEffect } from "react";
import { useDispatch, useSelector, useReducer } from "react-redux";
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
          <MDBModalBody>
            <form>
              <div className="grey-text">
                <MDBInput
                  label="Type your name"
                  group
                  type="text"
                  validate
                  error="wrong"
                  success="right"
                  className="py-2 my-3"
                  {...connectName}
                />
                <MDBInput
                  label="Type your last name"
                  icon="lock"
                  group
                  type="text"
                  validate
                  className="py-2 my-3"
                  {...connectLastName}
                />
                <MDBInput
                  label="Type your email"
                  icon="lock"
                  group
                  type="email"
                  validate
                  className="py-2 my-3"
                  {...connectEmail}
                />
                <MDBInput
                  label="Type your address"
                  icon="lock"
                  group
                  type="text"
                  validate
                  className="py-2 my-3"
                  {...connectAddress}
                />
                <MDBInput
                  label="Type your birthday"
                  icon="lock"
                  group
                  type="text"
                  validate
                  className="py-2 my-3"
                  {...connectBirthday}
                />
                <MDBInput
                  label="Type your phone number"
                  icon="lock"
                  group
                  type="text"
                  validate
                  className="py-2 my-3"
                  {...connectPhone}
                />
                <MDBInput
                  label="Type your gender"
                  icon="lock"
                  group
                  type="text"
                  validate
                  className="py-2 my-3"
                  {...connectGender}
                />
                <MDBInput
                  label="Select your hobbies"
                  icon="lock"
                  group
                  type="text"
                  validate
                  className="py-2 my-3"
                  {...connectGender}
                />
              </div>
            </form>
          </MDBModalBody>
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

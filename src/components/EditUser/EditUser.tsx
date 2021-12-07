import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  MDBBtn,
  MDBModal,
  MDBModalFooter,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBModalHeader,
  MDBModalTitle,
} from "mdb-react-ui-kit";
import {
  modifyUser,
  setShowEditUserWindow,
  setUserToEdit,
} from "../../redux/actions";
import { Form } from "react-bootstrap";
import * as R from "ramda";
import userType from "../../../.history/src/types/user_20211130162346";

export default function EditUser() {
  const dispatch = useDispatch();
  const { hobbies, showEditUserWindow } = useSelector(
    (state) => state.userReducer
  );
  const u: userType = useSelector((state) => state.userReducer.userToEdit);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const closeWindow = () => {
    console.log("Window was clodsed");
    dispatch(setShowEditUserWindow(false));
    dispatch(setUserToEdit(""));
  };

  useEffect(() => {
    setValue("name", u.name);
    setValue("lastName", u.lastName);
    setValue("email", u.email);
    setValue("address", u.address);
    setValue("phoneNumber", u.phoneNumber);
    setValue("dateOfBirth", u.dateOfBirth);
    setValue("gender", u.gender);
    setValue("hobbies", u.hobbies);
  }, [u]);

  const onSubmit = (data, e) => {
    e.preventDefault();
    // console.log("Data: ", data, e);
    data["id"] = u.id;
    data["age"] = -1;
    dispatch(modifyUser(data));
    dispatch(setShowEditUserWindow(false));
  };
  console.log("Errors: ", errors);

  return (
    <MDBModal show={showEditUserWindow} staticBackdrop tabIndex="-1">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Edit user</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={closeWindow}
              />
            </MDBModalHeader>
            <MDBModalBody></MDBModalBody>
            <Form.Group className="mb-3 px-3" controlId="formEditUser">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                {...register("name", { required: true })}
              />
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your last name"
                {...register("lastName")}
              />
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your email"
                {...register("email")}
              />
              <Form.Label>Gender</Form.Label>
              <Form.Group>
                <Form.Check
                  id="maleID"
                  inline
                  label="male"
                  type="radio"
                  value="male"
                  {...register("gender")}
                />
                <Form.Check
                  id="femaleID"
                  {...register("gender")}
                  value="female"
                  inline
                  label="female"
                  type="radio"
                />
                <Form.Check
                  id="nothingID"
                  {...register("gender")}
                  value="doesn'tMatter"
                  inline
                  label="doesn't matter"
                  type="radio"
                />
              </Form.Group>
              <Form.Label>Phone number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your phone number"
                {...register("phoneNumber")}
              />
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your address"
                {...register("address")}
              />
              <Form.Label>Date of birdth</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your date of birth"
                {...register("dateOfBirth")}
              />
              <Form.Label>Hobbies</Form.Label>
              <Form.Select
                placeholder="Enter your hobbies"
                multiple
                {...register("hobbies")}
              >
                {R.map((hobby) => (
                  <option key={hobby.id} value={hobby.id}>
                    {hobby.name}
                  </option>
                ))(hobbies)}
              </Form.Select>
            </Form.Group>
            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={closeWindow}>
                Cancel
              </MDBBtn>
              <MDBBtn type="submit" color="success">
                Send it
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </Form>
    </MDBModal>
    // TODO needed the agree to leave unsave Form
  );
}

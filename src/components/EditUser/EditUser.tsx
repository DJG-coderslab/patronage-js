import { BaseSyntheticEvent, useEffect, SyntheticEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SubmitHandler, useForm } from "react-hook-form";
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
import { RootState } from "../../redux/reducer";
import { ModifiedUserDataType, userType } from "../../types/user";
import hobbyType from "../../types/hobbies";

export default function EditUser() {
  const dispatch = useDispatch();
  const { hobbies, showEditUserWindow } = useSelector(
    (state: RootState) => state.userReducer
  );
  const user: userType = useSelector(
    (state: RootState) => state.userReducer.userToEdit
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const closeWindow = () => {
    dispatch(setShowEditUserWindow(false));
    dispatch(setUserToEdit(""));
  };

  useEffect(() => {
    setValue("name", user.name);
    setValue("lastName", user.lastName);
    setValue("email", user.email);
    setValue("address", user.address);
    setValue("phoneNumber", user.phoneNumber);
    setValue("dateOfBirth", user.dateOfBirth);
    setValue("gender", user.gender);
    setValue("hobbies", user.hobbies);
  }, [user]);

  const onSubmit = (
    data: ModifiedUserDataType,
    e: BaseSyntheticEvent | undefined
  ): void => {
    // TODO it's not a pure function yet :-(
    e?.preventDefault();
    const localSetting = {
      isShowing: user.isShowing,
      isDeleling: user.isDeleting,
      isChecked: user.isChecked,
    };
    const modifiedUser: userType = { ...data, id: user.id, age: -1 };
    dispatch(modifyUser(modifiedUser, localSetting));
    dispatch(setShowEditUserWindow(false));
  };
  // console.error("Errors: ", errors);

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
                {...register("name", { required: "Please enter the name" })}
              />
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your last name"
                {...register("lastName", {
                  required: "Please enter the last name",
                })}
              />
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your email"
                {...register("email", { required: "please enter the email" })}
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
                {...register("dateOfBirth", {
                  required: "Please enter date of birth",
                })}
              />
              <Form.Label>Hobbies</Form.Label>
              <Form.Select
                placeholder="Enter your hobbies"
                multiple
                {...register("hobbies", {
                  required: "Please select at least one hobby",
                })}
              >
                {R.map((hobby: hobbyType) => (
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

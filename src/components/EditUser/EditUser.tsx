import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
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
import * as R from "ramda";

export default function EditUser() {
  const dispatch = useDispatch();
  const { hobbies, showEditUserWindow } = useSelector(
    (state) => state.userReducer
  );
  const u = useSelector((state) => state.userReducer.userToEdit);
  // const [name, connectName, setName] = useInput(u.name);
  // const [lastName, connectLastName, setLastName] = useInput(u.lastName);
  // const [email, connectEmail, setEmail] = useInput(u.email);
  // const [address, connectAddress, setAddress] = useInput(u.address);
  // const [birthday, connectBirthday, setBirthday] = useInput(u.dateOfBirth);
  // const [phone, connectPhone, setPhone] = useInput(u.phoneNumber);
  // const [gender, connectGender, setGender] = useInput(u.gender);
  // const [hobbies, connectHobbies, setHobbies] = useInput("");

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const closeWindow = () => {
    dispatch(setShowEditUserWindow(false));
    // dispatch(setUserToEdit(""));
  };

  useEffect(() => {
    console.log("U was changed ");
    // setName(u.name);
    // setLastName(u.lastName);
    // setEmail(u.email);
    // setAddress(u.address);
    // setBirthday(u.dateOfBirth);
    // setPhone(u.phoneNumber);
    // setGender(u.gender);
    setValue("name", u.name);
    setValue("lastName", u.lastName);
    setValue("email", u.email);
    setValue("address", u.address);
    setValue("phone", u.phoneNumber);
    setValue("dateOfBirth", u.dateOfBirth);
    setValue("gender", u.gender);
    setValue("hobbies", u.hobbies);
  }, [u]);

  const onSubmit = (data) => console.log("Data: ", data);
  console.log("Errors: ", errors);

  const selecty = (w2Hobbies, usrHobbies) => {};

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

            {/* <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Form.Control
                  type="text"
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="firstName"
            /> */}

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
                  // name="gender"
                  inline
                  label="male"
                  type="radio"
                  value="male"
                  {...register("gender")}
                  // checked={gender === "male" ? true : false}
                />
                <Form.Check
                  id="femaleID"
                  // name="gender"
                  {...register("gender")}
                  value="female"
                  inline
                  label="female"
                  type="radio"
                  // checked={gender === "female" ? true : false}
                />
                <Form.Check
                  id="nothingID"
                  // name="gender"
                  {...register("gender")}
                  value="doesn'tMatter"
                  inline
                  label="doesn't matter"
                  type="radio"
                  // checked={gender === "doesentmatter" ? true : false}
                />
              </Form.Group>
              <Form.Label>Phone number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your phone number"
                {...register("phone")}
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
                {R.pipe(
                  R.innerJoin((hobby, userHobby) => hobby.id === userHobby),
                  R.map((hobby) => (
                    <option key={hobby.id} value={hobby.name}>
                      {hobby.name}
                    </option>
                  ))
                )(hobbies, u.hobbies)}
              </Form.Select>
            </Form.Group>
            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={closeWindow}>
                Cancel
              </MDBBtn>
              <MDBBtn color="success">Send it</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </Form>
    </MDBModal>
    // TODO needed the agree to leave unsave Form
  );
}

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
} from "mdb-react-ui-kit";
import { setShowEditUserWindow, setUserIDToEdit } from "../../redux/actions";

export default function EditUser() {
  const dispatch = useDispatch();
  const { showEditUserWindow } = useSelector((state) => state.userReducer);
  const closeWindow = () => {
    dispatch(setShowEditUserWindow(false));
    dispatch(setUserIDToEdit(""));
  };
  return (
    <MDBModal show={showEditUserWindow} staticBackdrop tabIndex="-1">
      <MDBModalDialog>
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle>Edit user</MDBModalTitle>
            <MDBBtn className="btn-close" color="none" onClick={closeWindow} />
          </MDBModalHeader>
          <MDBModalBody>Formularz</MDBModalBody>
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

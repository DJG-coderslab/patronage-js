import {
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBModalFooter,
  MDBModalHeader,
  MDBModalTitle,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { resetConfirmation } from "../../redux/actions";

export default function ConfirmDelete() {
  const dispatch = useDispatch();
  const { showConfirmation } = useSelector((state) => state.userReducer);
  //   const [showConfirmation, setShowConfirmation] = useState(false);
  //   const toggleShow = () => setShowConfirmation(!showConfirmation);
  const closeWindow = () => {
    dispatch(resetConfirmation());
  };
  return (
    <MDBModal
      show={showConfirmation}
      staticBackdrop
      tabIndex="-1"
    >
      <MDBModalDialog>
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle>Delete items</MDBModalTitle>
            <MDBBtn className="btn-close" color="none" onClick={closeWindow} />
          </MDBModalHeader>
          <MDBModalBody>Confirm deleting items?</MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="secondary" onClick={closeWindow}>
              Close
            </MDBBtn>
            <MDBBtn>Save</MDBBtn>
          </MDBModalFooter>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
}

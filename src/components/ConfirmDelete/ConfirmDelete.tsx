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
import {
  markToDelete,
  resetConfirmation,
  undoDeleteTimer,
  setShowUndoWindow,
  setAllowDelete,
} from "../../redux/actions";

export default function ConfirmDelete() {
  const dispatch = useDispatch();
  const { showConfirmation } = useSelector((state) => state.userReducer);
  const closeWindow = () => {
    dispatch(resetConfirmation());
  };
  const deleteItems = () => {
    dispatch(markToDelete());
    dispatch(undoDeleteTimer());
    dispatch(resetConfirmation());
    dispatch(setAllowDelete(true));
    dispatch(setShowUndoWindow(true));
  };
  return (
    <MDBModal show={showConfirmation} staticBackdrop tabIndex="-1">
      <MDBModalDialog>
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle>Delete items</MDBModalTitle>
            <MDBBtn className="btn-close" color="none" onClick={closeWindow} />
          </MDBModalHeader>
          <MDBModalBody>Confirm deleting items?</MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="secondary" onClick={closeWindow}>
              Cancel
            </MDBBtn>
            <MDBBtn color="danger" onClick={deleteItems}>
              Delete it!
            </MDBBtn>
          </MDBModalFooter>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
}

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
  setAllowDelete,
  setShowUndoWindow,
  undoDelete,
} from "../../redux/actions";

export default function Undo() {
  const dispatch = useDispatch();
  const { showUndoWindow } = useSelector((state) => state.userReducer);
  const closeWindow = () => {
    dispatch(setShowUndoWindow(false));
    // TODO call removing from DB
  };
  const handlingUndo = () => {
    dispatch(setAllowDelete(false));
    dispatch(undoDelete());
    dispatch(setShowUndoWindow(false));
  };
  return (
    <MDBModal show={showUndoWindow} staticBackdrop tabIndex="-1">
      <MDBModalDialog>
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle>Unod deleting</MDBModalTitle>
            <MDBBtn className="btn-close" color="none" onClick={closeWindow} />
          </MDBModalHeader>
          <MDBModalBody>Undo deleting items?</MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="secondary" onClick={closeWindow}>
              Close
            </MDBBtn>
            <MDBBtn color="warning" onClick={handlingUndo}>
              Undo
            </MDBBtn>
          </MDBModalFooter>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
}

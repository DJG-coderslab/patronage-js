import { useDispatch, useSelector } from "react-redux";
import { MDBCol, MDBRow } from "mdb-react-ui-kit";
import { setConfirmation } from "../../redux/actions";

export default function TableFooter() {
  const dispatch = useDispatch();
  const { showConfirmation } = useSelector((state) => state.userReducer);

  const handleDelete = () => {
    dispatch(setConfirmation());
  };

  return (
    <MDBRow className="py-3">
      <MDBCol md="1"></MDBCol>
      <MDBCol md="10"></MDBCol>
      <MDBCol md="1">
        <i onClick={handleDelete} className="far fa-trash-alt" />
      </MDBCol>
    </MDBRow>
  );
}

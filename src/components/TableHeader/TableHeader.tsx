import { useState } from "react";
import { useDispatch } from "react-redux";
import { MDBCol, MDBRow } from "mdb-react-ui-kit";
import { checkAll } from "../../redux/actions";

export default function TableHeader() {
  const dispatch = useDispatch();
  const [checkedAll, setCheckedAll] = useState(false);

  const toggleCheckAll = () => setCheckedAll(!checkedAll);
  //TODO how to uncheck it after deleting?

  const handleCheckBox = (e: any) => {
    dispatch(checkAll(e.target.checked));
  };

  return (
    <MDBRow className="py-3 border-bottom">
      <MDBCol md="1"></MDBCol>
      <MDBCol md="10">
        <MDBRow>
          <MDBCol md="3" className="text-center">
            Name
          </MDBCol>
          <MDBCol md="5" className="text-center">
            email
          </MDBCol>
          <MDBCol md="4" className="text-center">
            phone
          </MDBCol>
        </MDBRow>
      </MDBCol>
      <MDBCol md="1">
        <div>
          <input
            onChange={toggleCheckAll}
            onClick={handleCheckBox}
            className="form-check-input"
            type="checkbox"
            value=""
            checked={checkedAll}
          />
        </div>
      </MDBCol>
    </MDBRow>
  );
}

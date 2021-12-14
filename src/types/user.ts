export interface ModifiedUserDataType {
  name: string;
  lastName: string;
  email: string;
  gender: string;
  phoneNumber: string;
  address: string;
  dateOfBirth: string;
  hobbies: [string];
}

export interface userRecordDB extends ModifiedUserDataType {
  age: number;
}

export interface userRecordType extends userRecordDB {
  id: string;
}

export interface userType extends userRecordType {
  isDeleting?: Boolean;
  isShowing?: Boolean;
  isChecked?: Boolean;
};


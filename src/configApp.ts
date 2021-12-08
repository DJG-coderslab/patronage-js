const URLDB: string = "http://localhost:3000";

type userColumnsType = {
  name: string;
  lastName: string;
  email: string;
  gender: string;
  address: string;
  dateOfBirth: string;
  hobbies: string;
  age: string;
};

const userColumns = [
  { name: "Name" },
  { lastName: "Last name" },
  { email: "Email" },
  { gender: "Gender" },
  { address: "Address" },
  { dateOfBirth: "Date of birth" },
  { hobbies: "Hobbies" },
  { age: "Age" },
];

export { URLDB, userColumns };

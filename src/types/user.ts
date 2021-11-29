export default interface user_type {
  id: string;
  name: string;
  lastName: string;
  email: string;
  age: number;
  gender: string;
  phoneNumber: string;
  address: string;
  dateOfBirth: string;
  hobbies: [string];
  isDeleting?: Boolean;
  isShowing?: Boolean;
}

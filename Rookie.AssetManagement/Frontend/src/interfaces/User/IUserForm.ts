import Gender from "src/constants/gender";

export default interface IUserForm {
  id?: number;
  firstName: string;
  lastName: string;
  dateOfBirth?: Date;
  gender: Gender;
  joinedDate?: Date;
  type: string;
}

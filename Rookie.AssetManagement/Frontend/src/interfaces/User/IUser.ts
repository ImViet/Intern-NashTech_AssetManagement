import Gender from "src/constants/gender";

export default interface IUser {
  id: number;
  userName: string;
  staffCode: string;
  roleType: string;
  firstName: string;
  lastName: string;
  fullName: string;
  dateOfBirth: Date;
  location: string;
  gender: Gender;
  joinedDate: Date;
}

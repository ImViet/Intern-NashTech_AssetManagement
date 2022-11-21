export default interface IAccount {
  id: number;
  token?: string;
  userName: string;
  type: string;
  fullName: string;
  staffCode: string;
  location: string;
  isConfirmed?: boolean;
  isNewUser?: boolean;
}

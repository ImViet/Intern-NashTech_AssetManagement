export default interface IAssignmentForm {
  id?: number;
  user: string;
  userName: string;
  asset: string;
  assetName: string;
  note: string;
  assignedDate?: Date;
  state: number;
}

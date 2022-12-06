export default interface IAssignment {
  id: number;
  no: number;
  assetCode: string;
  assetName: string;
  assignedTo: string;
  assignedBy: string;
  assgnedDate: Date;
  note: string;
  state: string;
}

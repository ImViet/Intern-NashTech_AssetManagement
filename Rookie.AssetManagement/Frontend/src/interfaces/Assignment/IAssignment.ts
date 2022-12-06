export default interface IAssignment {
  id: number;
  no: number;
  assetCode: string;
  assetName: string;
  specification: string;
  assignedTo: string;
  assignedBy: string;
  assgnedDate: Date;
  note: string;
  state: string;
}

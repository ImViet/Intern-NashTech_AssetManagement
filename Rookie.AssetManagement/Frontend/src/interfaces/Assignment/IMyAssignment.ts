export default interface IMyAssignment {
  id: number;
  assetCode: string;
  assetName: string;
  category: string;
  specification: string;
  assignedTo: string;
  assignedBy: string;
  assignedDate: Date;
  note: string;
  state: string;
}

export default interface IAssignment {
    id: number;
    assetCode: string;
    assetName: string;
    assignedTo: string;
    assignedBy: string;
    assgnedDate: Date;
    note: string;
    state: string;
  }
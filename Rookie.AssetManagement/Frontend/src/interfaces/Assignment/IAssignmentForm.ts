export default interface IAssignmentForm {
    id?: number;
    user: string;
    asset: string;
    note: string;
    assignedDate?: Date;
  }
export default interface IQueryReturningModel {
    page: number;
    limit: number;
    assignedDate: Date |null;
    states:string[];
    search: string;
    sortOrder: string;
    sortColumn: string;
  }
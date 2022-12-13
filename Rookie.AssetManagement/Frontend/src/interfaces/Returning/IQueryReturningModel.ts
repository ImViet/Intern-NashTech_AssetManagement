export default interface IQueryReturningModel {
    page: number;
    limit: number;
    returnedDate: Date |null;
    states:string[];
    search: string;
    sortOrder: string;
    sortColumn: string;
  }
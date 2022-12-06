export default interface IQueryAssignmentModel {
    page: number;
    limit: number;
    assignDate: Date |null;
    states:string[];
    search: string;
    sortOrder: string;
    sortColumn: string;
  }
  
export default interface IQueryUserModel {
  page: number;
  limit: number;
  types: string[];
  search: string;
  sortOrder: string;
  sortColumn: string;
}

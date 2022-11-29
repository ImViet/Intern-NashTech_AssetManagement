export default interface IQueryAssetModel {
    page: number;
    limit: number;
    categories: string[];
    states:string[];
    search: string;
    sortOrder: string;
    sortColumn: string;
  }
  
export default interface IQueryAssetModel {
    page: number;
    limit: number;
    types: string[];
    search: string;
    sortOrder: string;
    sortColumn: string;
  }
  
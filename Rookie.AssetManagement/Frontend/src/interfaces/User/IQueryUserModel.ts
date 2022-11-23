export default interface IQueryUserModel {
    page: number;
    types: string[];
    search: string;
    orderBy: string;
    orderByColumn: string;
}
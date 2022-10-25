export default interface IAccount {
    id: number;
    token?: string;
    userName: string;
    role: string;
    fullName: string;
    staffCode: string;
    location: string;
    isConfirmed?: boolean;
}
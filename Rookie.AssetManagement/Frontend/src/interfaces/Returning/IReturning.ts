export default interface IReturning {
    id: number;
    no: number;
    assetCode: string;
    assetName: string;
    requestedBy: string  
    assignedDate: Date;
    acceptedBy: string;
    returnedDate: Date;
    state: string;
  }
  
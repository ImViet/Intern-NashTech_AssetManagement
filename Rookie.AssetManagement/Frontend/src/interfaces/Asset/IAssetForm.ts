import Gender from "src/constants/gender";

export default interface IAssetForm {
  id?: number;
  Name: string;
  Category: string
  Specification: string;
  InstalledData?: Date;
  State: string;  
}

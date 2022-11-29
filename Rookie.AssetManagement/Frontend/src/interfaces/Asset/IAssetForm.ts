import Gender from "src/constants/gender";

export default interface IAssetForm {
  id?: number;
  Name: string;
  Category: string
  Specification: string;
  InstalledDate?: Date;
  State: number;  
}

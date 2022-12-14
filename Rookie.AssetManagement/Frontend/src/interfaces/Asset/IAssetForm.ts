import Gender from "src/constants/gender";

export default interface IAssetForm {
  id?: number;
  assetName: string;
  category: string;
  specification: string;
  installedDate?: Date;
  state: number;
  isEditable: boolean;
}

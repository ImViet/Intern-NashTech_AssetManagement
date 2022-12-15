export default interface IAsset {
  id: number;
  assetCode: string;
  assetName: string;
  category: string;
  specification: string;
  installedDate: Date;
  state: string;
  location: string;
  isEditable: boolean;
  isHaveAsssignment: boolean;
}

import { SortType } from "src/components/Table";
import IPagedModel from "./IPagedModel";
import IUser from "./User/IUser";

export default interface ILookupTable {
  onSelect: (label: string, value: any) => void;
  requestData: Function;
  closeModal: Function;
}

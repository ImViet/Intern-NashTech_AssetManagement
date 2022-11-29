import ISelectOption from "src/interfaces/ISelectOption";
import Gender from "./gender";
import state from "./state";

export const UserTypeOptions: ISelectOption[] = [
  { id: 1, label: "Admin", value: "ADMIN" },
  { id: 2, label: "Staff", value: "STAFF" },
];

export const CategoryTypeOptions: ISelectOption[] = [
  { id: 1, label: "Category1", value: "Category1" },
  { id: 2, label: "Category2", value: "Category2" },
];

export const FilterUserTypeOptions: ISelectOption[] = [
  { id: 1, label: "All", value: "ALL" },
  { id: 2, label: "Admin", value: "ADMIN" },
  { id: 3, label: "Staff", value: "STAFF" },
];

export const GenderOptions: ISelectOption[] = [
  { id: 1, label: "Female", value: Gender.Female },
  { id: 2, label: "Male", value: Gender.Male },
];

export const StateOptions: ISelectOption[] = [
  { id: 1, label: "Available", value: state.Available },
  { id: 2, label: "Not available", value: state.NotAvailable },
];

export const FilterAssetStateOptions: ISelectOption[] = [
  
];

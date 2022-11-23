import ISelectOption from "src/interfaces/ISelectOption";
import Gender from "./gender";

export const UserTypeOptions: ISelectOption[] = [
  { id: 1, label: "Admin", value: "ADMIN" },
  { id: 2, label: "Staff", value: "STAFF" },
];

export const FilterUserTypeOptions: ISelectOption[] = [
  { id: 1, label: "All", value: "all" },
  { id: 2, label: "Admin", value: "ADMIN" },
  { id: 3, label: "Staff", value: "STAFF" },
];

export const GenderOptions: ISelectOption[] = [
  { id: 1, label: "Female", value: Gender.Female },
  { id: 2, label: "Male", value: Gender.Male },
];

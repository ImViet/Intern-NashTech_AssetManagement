import ISelectOption from "src/interfaces/ISelectOption";

export const UserTypeOptions: ISelectOption[] = [
  { id: 1, label: "Admin", value: "admin" },
  { id: 2, label: "Staff", value: "staff" },
];

export const FilterUserTypeOptions: ISelectOption[] = [
  { id: 1, label: "All", value: "all" },
  { id: 2, label: "Admin", value: "admin" },
  { id: 3, label: "Staff", value: "staff" },
];

export const GenderOptions: ISelectOption[] = [
  { id: 1, label: "Female", value: "Female" },
  { id: 2, label: "Male", value: "Male" },
];

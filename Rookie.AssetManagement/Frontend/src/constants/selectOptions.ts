import ISelectOption from "src/interfaces/ISelectOption";
import Gender from "./gender";

export const UserTypeOptions: ISelectOption[] = [
  { id: 1, label: "Admin", value: "ADMIN" },
  { id: 2, label: "Staff", value: "STAFF" },
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

export const FilterAssetStateOptions: ISelectOption[] = [
  { id: 1, label: "All", value: "ALL" },
  { id: 2, label: "Assigned", value: "ASSIGNED" },
  { id: 3, label: "Available", value: "AVAILABLE" },
  { id: 4, label: "Not available", value: "NOTAVAILABLE" },
  { id: 5, label: "Waiting for recycling", value: "WAITINGRECYCLING" },
  { id: 6, label: "Recycled", value: "RECYCLED" },
];

export const FilterCategoryOptions: ISelectOption[] = [
  { id: 1, label: "All", value: "ALL" },
  { id: 2, label: "Bluetooth Mouse", value: "BLUETOOTH" },
  { id: 3, label: "Headset", value: "HEADSET" },
  { id: 4, label: "Ipad", value: "IPAD" },
  { id: 5, label: "Iphone", value: "IPHONE" },
  { id: 5, label: "Personal Computer", value: "PERSONALCOMPUTER" },
];
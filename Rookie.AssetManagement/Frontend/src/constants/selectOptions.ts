import ISelectOption from "src/interfaces/ISelectOption";

export const UserTypeOptions: ISelectOption[] = [
    { id: 1, label: 'All', value: 'All' },
    { id: 2, label: 'Admin', value: 'ADMIN' },
    { id: 3, label: 'Staff', value: 'STAFF' },
];

export const GenderOptions: ISelectOption[] = [
    { id: 1, label: "Female", value: "Female"},
    { id: 2, label: "Male", value: "Male"},
];

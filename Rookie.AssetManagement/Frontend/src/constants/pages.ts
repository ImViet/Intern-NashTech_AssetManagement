export const LOGIN = "/login";

export const HOME = "/";

export const USER = "user/*";
export const USER_LIST = "*";
export const CREATE_USER = "create";
export const EDIT_USER = "edit/:id";
export const EDIT_USER_ID = (id: string | number) => `edit/${id}`;
export const USER_LIST_LINK = "/user";
export const USER_PARENT_ROOT = "..";

export const ASSET = "asset/*";
export const ASSET_LIST = "*";
export const CREATE_ASSET = "create";
export const EDIT_ASSET = "edit/:id";
export const EDIT_ASSET_ID = (id: string | number) => `edit/${id}`;
export const ASSET_LIST_LINK = "/asset";
export const ASSET_PARENT_ROOT = "..";

export const ASSIGNMENT = "assignment/*";
export const ASSIGNMENT_LIST = "*";
export const CREATE_ASSIGNMENT = "create";
export const EDIT_ASSIGNMENT = "edit/:id";
export const EDIT_ASSIGNMENT_ID = (id: string | number) => `edit/${id}`;
export const ASSIGNMENT_LIST_LINK = "/assignment";
export const ASSIGNMENT_PARENT_ROOT = "..";


export const RETURNING = "returning/*";
export const RETURNING_LIST = "*";
export const RETURNING_LIST_LINK = "/returning";

export const REPORT = "report/*";
export const REPORT_LIST_LINK = "/report";

export const NOTFOUND = "/notfound";

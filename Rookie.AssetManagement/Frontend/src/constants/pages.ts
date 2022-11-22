export const LOGIN = "/login";

export const HOME = "/";

export const USER = "user/*";
export const USER_LIST = "*";
export const CREATE_USER = "create";
export const EDIT_USER = "edit/:id";
export const EDIT_USER_ID = (id: string | number) => `edit/${id}`;
export const USER_LIST_LINK = "/user";
export const USER_PARENT_ROOT = "..";

export const NOTFOUND = "/notfound";

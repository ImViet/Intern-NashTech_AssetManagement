import { FormikHelpers } from "formik";

export default interface ISubmitAction<T> {
    values: T;
    formikActions: FormikHelpers<T>;
}
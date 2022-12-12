import AssetSagas from "src/containers/Asset/sagas";
import AssignmentSagas from "src/containers/Assignment/sagas";
import AuthorizeSagas from "src/containers/Authorize/sagas";
import MyAssignmentSagas from "src/containers/Home/sagas";
import UserSagas from "src/containers/User/sagas";

export default [
  AuthorizeSagas,
  UserSagas,
  AssetSagas,
  AssignmentSagas,
  MyAssignmentSagas,
];

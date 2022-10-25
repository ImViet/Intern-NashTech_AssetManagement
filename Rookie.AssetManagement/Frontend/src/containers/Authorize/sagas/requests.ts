import { AxiosResponse } from "axios";

import RequestService from 'src/services/request';
import EndPoints from 'src/constants/endpoints';
import ILoginModel from "src/interfaces/ILoginModel";
import IAccount from "src/interfaces/IAccount";
import IChangePassword from "src/interfaces/IChangePassword";

export function loginRequest(login: ILoginModel): Promise<AxiosResponse<IAccount>> {
    return RequestService.axios.post(EndPoints.authorize, login);
}

export function getMeRequest(): Promise<AxiosResponse<IAccount>> {
    return RequestService.axios.get(EndPoints.me);
}

export function putChangePassword(changePasswordModel: IChangePassword): Promise<AxiosResponse<IAccount>> {
    return RequestService.axios.put(EndPoints.authorize, changePasswordModel);
}

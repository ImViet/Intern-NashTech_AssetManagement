import { takeLatest } from 'redux-saga/effects';

import { changePassword, login, me } from 'src/containers/Authorize/reducer';
import { handleLogin, handleGetMe, handleChangePassword } from 'src/containers/Authorize/sagas/handles';

export default function* authorizeSagas() {
    yield takeLatest(login.type, handleLogin),
    yield takeLatest(me.type, handleGetMe),
    yield takeLatest(changePassword.type, handleChangePassword)
}

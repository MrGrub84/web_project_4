export default class UserInfo {
    constructor({ name, job }) {
        this._user = {};
        this._user.name = name;
        this._user.job = job;
    }

    getUserInfo() {
        return this._user;
    }

    setUserInfo(data) {
        this._user = data;
    }
}
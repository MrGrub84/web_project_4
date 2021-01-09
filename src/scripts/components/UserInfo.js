import {
    profileName,
    profileAbout
} from "../utils/constants.js";

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
        profileName.textContent = data.name;
        profileAbout.textContent = data.job;
    }
}
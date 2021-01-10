export default class UserInfo {
    constructor({ name, job }) {
        this._name = name;
        this._job = job;
    }

    getUserInfo() {
        return {
            name: this._name.textContent,
            job: this._job.textContent
        }
    }

    setUserInfo(data) {
        this._name.textContent = data.name;
        this._job.textContent = data.job;
    }
}
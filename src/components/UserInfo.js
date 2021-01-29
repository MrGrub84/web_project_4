export default class UserInfo {
    constructor({ name, job, photo }) {
        this._name = name;
        this._job = job;
        this._photo = photo;
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
        this._photo.src = data.photo;
        this._photo.alt = data.name;
    }
}
import {
    inputName,
    inputJob
} from './constants.js';
export class UserInfo {
    constructor(nameSelector, jobSelector) {
        this._name = nameSelector;
        this._job = jobSelector;
    }
    getUserInfo() {
        inputName.value = this._name.textContent;
        inputJob.value = this._job.textContent;

    }
    setUserInfo(name, job) {
        this._name.textContent = name;
        this._job.textContent = job;
    }
}


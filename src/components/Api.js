import { name } from "file-loader";
import { Promise } from "core-js";

export class Api {
    constructor({ url, headers }) {
        this._url = url;
        this._headers = headers;
    }
    getItems() {
        return fetch(this._url, {
            method: "GET",
            headers: this._headers
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`)
        });
    }

    getUserInfo() {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-15/users/me', {
            method: "GET",
            headers: this._headers
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`)
        })
    }
    patchUserInfo(data) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-15/users/me', {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`)
        })

    }
    editAvatar(link) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-15/users/me/avatar', {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: link.avatar
            })
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`)
        })
    }
    addnewCard(data) {
        return fetch(this._url, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`)
        })
    }
    removeCard(id) {
        return fetch(`${this._url}/${id}`, {
            method: "DELETE",
            headers: this._headers,
        }).then((res) => {

            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`)
        });
    }
    addLikes(id) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-15/cards/likes/${id}`, {
            method: "PUT",
            headers: this._headers,
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`)
        });
    }
    deleteLikes(id) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-15/cards/likes/${id}`, {
            method: "DELETE",
            headers: this._headers,
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`)
        });
    }
}

import * as auth from './auth';

class Api {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _getResponse(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            credentials: 'include',
            headers: this.requestHeaders(),
        })
        .then((res) => this._getResponse(res))
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'GET',
            credentials: 'include',
            headers: this.requestHeaders(),
        })
        .then((res) => this._getResponse(res));
    }

    changeUserInfo(newName, newJob) {
        return fetch(`${this._baseUrl}/users/me`, {
          method: 'PATCH',
          credentials: 'include',
          headers: this.requestHeaders(),
          body: JSON.stringify({ name: newName, about: newJob }),
        })
          .then((res) => this._getResponse(res));
    }

    postNewCard(name, link) {
        return fetch(`${this._baseUrl}/cards`, {
          method: 'POST',
          credentials: 'include',
          headers: this.requestHeaders(),
          body: JSON.stringify({ name: name, link: link }),
        })
          .then((res) => this._getResponse(res));
    }

    changeLikeCardStatus(cardId, isLiked) {
        return isLiked ? this.like(cardId) : this.dislike(cardId);
    }

    like(cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
          method: 'PUT',
          credentials: 'include',
          headers: this.requestHeaders(),
        })
          .then((res) => this._getResponse(res));
    }
    
    dislike(cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: this.requestHeaders(),
        })
          .then((res) => this._getResponse(res))
    }

    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
          method: 'DELETE',
          credentials: 'include',
          headers: this.requestHeaders(),
        })
          .then((res) => this._getResponse(res));
    }

    updateAvatar(link) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            credentials: 'include',
            headers: this.requestHeaders(),
            body: JSON.stringify({ avatar: link}),
        })
          .then((res) => this._getResponse(res))
    }

    requestHeaders() {
        this._headers.Authorization = "Bearer " + localStorage.getItem('jwt')
        return this._headers
    }
}

const api = new Api({
    baseUrl: auth.BASE_URL,
    headers: {
        'content-type': 'application/json',
    }
});

export default api;
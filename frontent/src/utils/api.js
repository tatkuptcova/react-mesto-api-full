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
            headers: this._headers,
        })
        .then((res) => this._getResponse(res))
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'GET',
            headers: this._headers,
        })
        .then((res) => this._getResponse(res));
    }

    changeUserInfo(newName, newJob) {
        return fetch(`${this._baseUrl}/users/me`, {
          method: 'PATCH',
          headers: this._headers,
          body: JSON.stringify({ name: newName, about: newJob }),
        })
          .then((res) => this._getResponse(res));
    }

    postNewCard(name, link) {
        return fetch(`${this._baseUrl}/cards`, {
          method: 'POST',
          headers: this._headers,
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
          headers: this._headers,
        })
          .then((res) => this._getResponse(res));
    }
    
    dislike(cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: this._headers,
        })
          .then((res) => this._getResponse(res))
    }

    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
          method: 'DELETE',
          headers: this._headers,
        })
          .then((res) => this._getResponse(res));
    }

    updateAvatar(link) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({ avatar: link}),
        })
          .then((res) => this._getResponse(res))
    }
}

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-25',
    headers: {
        'authorization': 'f5fd2afd-988c-4392-86f3-d04957b3b6e7',
        'content-type': 'application/json',
    }
});


export default api;
class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _request(endpoint, options = {}) {
    return fetch(`${this._baseUrl}${endpoint}`, {
      method: options.method || "GET",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${this.token || localStorage.getItem("jwt")}`,
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
    }).then(this._handleResponse);
  }

  _handleResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Erro: ${res.status}`);
    }
    return res.json().catch(() => ({}));
  }

  setToken(token) {
    this.token = token;
  }

  // API

  getInitialCards() {
    return this._request("/cards");
  }

  getUserInfo() {
    return this._request("/users/me");
  }

  setUserInfo(userData) {
    return this._request("/users/me", {
      method: "PATCH",
      body: {
        name: userData.name,
        about: userData.about,
      },
    });
  }

  addCard(cardData) {
    return this._request("/cards", {
      method: "POST",
      body: {
        name: cardData.name,
        link: cardData.link,
      },
    });
  }

  likeCard(cardId) {
    return this._request(`/cards/${cardId}/likes`, {
      method: "PUT",
    });
  }

  unlikeCard(cardId) {
    return this._request(`/cards/${cardId}/likes`, {
      method: "DELETE",
    });
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this.likeCard(cardId);
    } else {
      return this.unlikeCard(cardId);
    }
  }

  deleteCard(cardId) {
    return this._request(`/cards/${cardId}`, {
      method: "DELETE",
    });
  }

  updateUserAvatar(avatarData) {
    return this._request("/users/me/avatar", {
      method: "PATCH",
      body: avatarData,
    });
  }

  getUserAndCards() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()])
      .then(([userData, cardsData]) => ({ userData, cardsData }))
      .catch((err) => Promise.reject(`Erro: ${err}`));
  }
}

const api = new Api({
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

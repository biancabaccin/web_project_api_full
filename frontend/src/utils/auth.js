class ApiAuth {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _request(endpoint, options = {}) {
    return fetch(`${this._baseUrl}${endpoint}`, {
      method: options.method || "GET",
      headers: {
        ...this._headers,
        ...options.headers,
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
    }).then(this._handleResponse);
  }

  _handleResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Erro: ${res.status}`);
    }

    const contentType = res.headers.get("Content-Type");

    if (contentType && contentType.includes("application/json")) {
      return res.json().catch(() => {
        throw new Error("Resposta inválida do servidor");
      });
    }

    return res.text();
  }

  register(email, password) {
    return this._request("/signup", {
      method: "POST",
      body: { email, password },
    });
  }

  login(email, password) {
    return this._request("/signin", {
      method: "POST",
      body: { email, password },
    });
  }

  checkToken(token) {
    return this._request("/users/me", {
      method: "GET",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  }
}

const apiAuth = new ApiAuth({
  baseUrl: "api.webs.vc.chickenkiller.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiAuth;

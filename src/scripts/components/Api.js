export default class Api {
    constructor({ token }) {
        this._baseUrl = "https://around.nomoreparties.co/v1/group-8";
        this._token = token;
    }

    _request({ category, parameter, headers }, method, body) {
        const request = { 
                method: (method ? method : "GET"),
                headers: {
                    authorization: this._token,
                    ...headers
                }
            }
        if (body) request.body = body;
        console.log(request);
        return fetch(`${this._baseUrl}/${category}/${parameter}`, request)
            .then((res) => {
                return res.json();
            })
            .then((res) => { return res; });
    }

    getMe({ resHandler }) {
        return this._request({ category: "users", parameter: "me", headers: {} })
            .then((res) => { 
                resHandler(res) 
            });
    }

    getCards() {
        return this._request({ category: "cards", parameter: "", headers: {} })
        .then((res) => {
            return res;
        });
    }

    updateProfileData({ name, job }) {
        return this._request({category: "users", parameter: "me", headers: { "Content-type": "application/json"}}, "PATCH", JSON.stringify({
            name,
            about: job
        }))
            .then((res) => {
                return res;
            });
    }
}
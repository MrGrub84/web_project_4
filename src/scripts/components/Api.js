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
        return fetch(`${this._baseUrl}/${category}/${parameter}`, request)
            .then((res) => {
                return res.json();
            })
            .then((res) => { return res; });
    }

    getMe() {
        return this._request({ category: "users", parameter: "me", headers: {} })
            .then((res) => { 
               return res;
            });
    }

    getCards() {
        return this._request({ category: "cards", parameter: "", headers: {} })
        .then((res) => {
            return res;
        });
    }

    addCard({ name, link}) {
        return this._request({category: "cards", parameter: "", headers: { "Content-type": "application/json"}}, "POST", JSON.stringify({
            name,
            link
        }))
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

    deleteCard({ id }) {
        return this._request({category: "cards", parameter: id, headers: { } }, "DELETE")
            .then((res) => {
                return res;
            });
    }

    likeCard({ id }) {
        return this._request({category: "cards", parameter: `likes/${id}`, headers: { } }, "PUT")
            .then((res) => {
                return res;
            });
    }

    unlikeCard({ id }) {
        return this._request({category: "cards", parameter: `likes/${id}`, headers: { } }, "DELETE")
            .then((res) => {
                return res;
            });
    }

    updatePhoto({ link }) {
        // https://i.ibb.co/RQmN4dx/OBX-headstand.jpg
        return this._request({category: "users", parameter: "me/avatar", headers: { "Content-type": "application/json"}}, "PATCH", JSON.stringify({
            avatar: link
        }))
            .then((res) => {
                return res;
            });
    }
}
import { openPopup, popupPhoto } from "./index.js";

export class Card {
    constructor(data) {
        this._text = data.text;
        this._url = data.url;
        this._template = document.querySelector(data.cardSelector).content;;

        this._element = this._createCard(this._text, this._url);
    }

    _createCard(title = "", url = "") {
        const template = this._template.cloneNode(true);
        let elementPhoto = template.querySelector(".places__photo");
        elementPhoto.src = url;
        elementPhoto.alt = title;
        template.querySelector(".places__text").textContent = title;
        template.querySelector(".places__favorite").addEventListener("click", this._like);
        template.querySelector(".places__delete").addEventListener("click", this._deletePlace);
        elementPhoto = this._addPopupEventListener(elementPhoto)
        return template;
    }

    get() {
        return this._element;
    }

    _like(evt) {
        evt.target.classList.toggle("places__favorite_active");
    }

    _deletePlace(evt) {
        evt.target.closest(".places__place").remove();
    }

    _addPopupEventListener(element) {
        element.addEventListener("click", (evt) => { 
            const place = evt.target.parentElement;
            const src = evt.target.src;
            const title = place.querySelector(".places__text").textContent;
            this._showPlace(src, title);
            openPopup(popupPhoto); 
        });
        return element;
    }

    _showPlace(src, title) {
        const photo = document.querySelector(".popup__photo");
        photo.src = "";
        photo.src = src;
        photo.alt = title;
        document.querySelector(".popup__photo-title").textContent = title;
    }
}
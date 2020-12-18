import { openPopup, popupPhoto } from "./index.js";

export class Card {
    constructor(data, templateElement) {
        this._text = data.text;
        this._url = data.url;
        this._template = templateElement;

        this._card = this._createCard(this._text, this._url);
    }

    _createCard(title = "", url = "") {
        const template = this._template.cloneNode(true);
        let elementPhoto = template.querySelector(".places__photo");
        elementPhoto.src = url;
        elementPhoto.alt = title;
        template.querySelector(".places__text").textContent = title;
        template.querySelector(".places__favorite").addEventListener("click", this._like);
        template.querySelector(".places__delete").addEventListener("click", this._deletePlace);
        elementPhoto = this._addPopupEventListener(elementPhoto, this._showPlace)
        return template;
    }

    get() {
        return this._card;
    }

    _like(evt) {
        evt.target.classList.toggle("places__favorite_active");
    }

    _deletePlace(evt) {
        evt.target.closest(".places__place").remove();
    }

    _addPopupEventListener(element, showPlaceFunction) {
        element.addEventListener("click", function(evt) { 
            const place = evt.target.parentElement;
            const src = evt.target.src;
            const title = place.querySelector(".places__text").textContent;
            showPlaceFunction(src, title);
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
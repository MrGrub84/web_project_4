import PopupWithImage from "./components/PopupWithImage.js";

export class Card {
    constructor({ data, handleCardClick }) {
        console.log(data)
        this._text = data.text;
        this._url = data.url;
        this._template = document.querySelector(data.cardSelector).content;;
        this._handleCardClick = handleCardClick;
        this._element = this._createCard();
    }

    _createCard() {
        const template = this._template.cloneNode(true);
        const elementPhoto = template.querySelector(".places__photo");
        elementPhoto.src = this._url;
        elementPhoto.alt = this._text;
        template.querySelector(".places__text").textContent = this._text;
        template.querySelector(".places__favorite").addEventListener("click", this._like);
        template.querySelector(".places__delete").addEventListener("click", this._deletePlace);
        this._addPopupEventListener(elementPhoto);
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
            this._handleCardClick();
        });
    }
}
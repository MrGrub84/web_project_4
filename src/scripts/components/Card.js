export default class Card {
    constructor({ data, handleCardClick, handleDeleteClick }) {
        this._text = data.card.name;
        this._url = data.card.link;
        this._likes = (data.card.likes ? data.card.likes : [] );
        this._id = data.card._id;
        this._template = document.querySelector(data.cardSelector).content;;
        this._handleCardClick = handleCardClick;
        this._deletePlace = handleDeleteClick;
        this._element = this._createCard();
    }

    _createCard() {
        const template = this._template.cloneNode(true);
        const elementPhoto = template.querySelector(".places__photo");
        const trash = template.querySelector(".places__delete");
        elementPhoto.src = this._url;
        elementPhoto.alt = this._text;
        template.querySelector(".places__text").textContent = this._text;
        template.querySelector(".places__like-count").textContent = this._likes.length;
        template.querySelector(".places__favorite").addEventListener("click", this._like);
        trash.addEventListener("click", this._deletePlace);
        trash.id = this._id;
        this._addPopupEventListener(elementPhoto);
        return template;
    }

    get() {
        return this._element;
    }

    _like(evt) {
        evt.target.classList.toggle("places__favorite_active");
    }

    _addPopupEventListener(element) {
        element.addEventListener("click", (evt) => { 
            this._handleCardClick();
        });
    }
}